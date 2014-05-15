(function(){
  'use strict';

  $(document).ready(init);


  function init(){
    $('#login').click(login);
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username});
  }

  function ajax(url, type, data={}, success= r => console.log(r), dataType='html'){
    $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
  }



})();
