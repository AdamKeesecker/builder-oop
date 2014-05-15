(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('body').on('click', '#plant', plant);
    $('body').on('click', '#getforest', forest);
    $('body').on('click', '.grow', grow);
    $('body').on('click', '.chop', chop);
    $('#sell').click(sellWood);
  }
  function sellWood() {
    var userId = $('#user').attr('data-id');
    var amount = $('#woodAmt').val();
    ajax(("/users/" + userId + "/sellwood"), 'put', {amount: amount}, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function chop() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/chop"), 'put', {}, (function(response) {
      console.log(response.html);
      tree.replaceWith(response.html);
      $('#wood').text(("wood: " + response.user.wood));
    }), 'json');
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', {}, (function(t) {
      tree.replaceWith(t);
    }));
  }
  function forest() {
    var userId = $('#user').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', {}, (function(response) {
      $('#forest').empty().append(response);
    }));
  }
  function plant() {
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
      return $('#forest').append(h);
    }));
  }
  function login() {
    var username = $('#username').val();
    $('#username').empty();
    ajax('/login', 'post', {username: username}, (function(html) {
      $('#dashboard').replaceWith(html);
    }));
  }
  function ajax(url, type) {
    var data = arguments[2] !== (void 0) ? arguments[2] : {};
    var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
      return console.log(r);
    });
    var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
    $.ajax({
      url: url,
      type: type,
      dataType: dataType,
      data: data,
      success: success
    });
  }
})();

//# sourceMappingURL=game.map
