/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('phApp').service('BoardDataFactory', function () {

  return {
    kanban: {
      "name": "Kanban Board",
      "columns": [
        {
          "title": "Ready",
          "cards":
            [
              {"title": "Come up with a POC for new Project"},
              {"title": "Design new framework for reporting module"}
            ],
          "limit": 5,
        },

        {
          "title": "In Progress",
          "cards":
            [
              {"title": "Explore new IDE for Development",
                "description": "Testing Card Details"},
              {"title": "Get new resource for new Project",
                "description": "Testing Card Details"}
            ],
          "limit": 5,
        },

        {
          "title": "Testing",
          "cards":
            [
              {"title": "Develop ui for tracker module",
                "description": "Testing Card Details"},
              {"title": "Develop backend for plan module",
                "description": "Testing Card Details"}
            ],
          "limit": 5,
        },

        {
          "title": "Done",
          "cards":
            [
              {"title": "Test user module",
                "description": "Testing Card Details"},
              {"title": "End to End Testing for user group module",
                "description": "Testing Card Details"},
              {"title": "CI for user module",
                "description": "Testing Card Details"}
            ],
          "limit": 5
        }
      ]
    }
  };
});


