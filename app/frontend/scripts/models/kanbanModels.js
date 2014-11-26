/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';
function Board(name) {
  return {
    name: name,
    columns: [],
    backlogs: []
  };
}

function Column(title, description, limit) {
  return {
    title: title,
    description: description,
    limit: limit,
    cards: []
  };
}

function Backlog(name) {
  return {
    name: name,
    phases: []
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
