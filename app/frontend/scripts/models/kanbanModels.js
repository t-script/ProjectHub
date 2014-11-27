/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';
function Board(id) {
  return {
    _id: id,
    projectid: 1,
    columns: []
  };
}

function Column(id, name, limit) {
  return {
    _id: id,
    name: name,
    limit: limit,
    cards: []
  };
}

function Card(title, column, type, category, description) {
  this.title = title;
  this.column = column;
  this.type = type;
  this.category = category;
  this.description = description;
  return this;
}
