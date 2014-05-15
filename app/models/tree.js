/* jshint unused:false */

'use strict';

var users = global.nss.db.collection('users');
var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var _ = require('lodash');
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');


class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  save(fn){
    trees.save(this, (err, count)=>fn());
  }

  grow(){
    this.height += _.random(0,2);
    this.isHealthy = _.random(0,200) !== 71;
  }

  chop(){
    this.chopped=true;
    this.isHealthy=false;
    this.height=0;
  }

  getClass(){
    var classes = [];
    if(this.height === 0){
      classes.push('seed');
    }
    else if(this.height < 24){
      classes.push('sapling');
    }
    else if(this.height < 48){
      classes.push('treenager');
    }
    else{
      classes.push('adult');
    }


    if(!this.isHealthy){
      classes.push('dead');
    }


    if(this.isChopped){
      classes.push('chopped');
    }



    return classes.join(' ');
  }

  static findByTreeId(treeId, fn){
    treeId= Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (err, tree)=>{
      tree = _.create(Tree.prototype, tree);
      fn(tree);
    });
  }

  static findAllByUserId(userId, fn){
    userId= Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((err,treeObjects)=>{
      var forest = treeObjects.map(t=>_.create(Tree.prototype, t));
      fn(forest);
    });
  }

  static plant(userId, fn){
    userId=Mongo.ObjectID(userId);
    var tree = new Tree(userId);
    trees.save(tree, ()=>{
      fn(tree);
    });
  }
}

module.exports = Tree;
