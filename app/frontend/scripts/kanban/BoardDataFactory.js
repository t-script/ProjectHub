/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('phApp').service('BoardDataFactory', function () {

  return {
    kanban: {
      "name": "Kanban Board",
      //"numberOfColumns": 5,
      "columns": [
        {"name": "Very Ready", "cards": [
          {"title": "Come up with a POC for new Project"},
          {"title": "Design new framework for reporting module"}
        ]},
        {"name": "In Progress", "cards": [
          {"title": "Explore new IDE for Development",
            "details": "Testing Card Details"},
          {"title": "Get new resource for new Project",
            "details": "Testing Card Details"}
        ]},
        {"name": "Testing", "cards": [
          {"title": "Develop ui for tracker module",
            "details": "Testing Card Details"},
          {"title": "Develop backend for plan module",
            "details": "Testing Card Details"}
        ]},
        {"name": "Done", "cards": [
          {"title": "Test user module",
            "details": "Testing Card Details"},
          {"title": "End to End Testing for user group module",
            "details": "Testing Card Details"},
          {"title": "CI for user module",
            "details": "Testing Card Details"}
        ]}
      ]
    }
  };
});


