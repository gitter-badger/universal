/// <reference path="../../../server/typings/tsd.d.ts" />

var express = require('express');
var serveStatic = require('serve-static');
var historyApiFallback = require('connect-history-api-fallback');

module.exports = function(ROOT) {
  var router = express.Router();

  var universalPath = ROOT + '/dist/examples/app/universal';
  var App     = require(universalPath + '/app/App').App;
  var TodoApp = require(universalPath + '/todo/index').TodoApp;

  var httpInjectables = require(ROOT + '/dist/server/server').httpInjectables;

  router.
    route('/').
    get(function ngApp(req, res) {
      res.render('app/universal/app/index', {
        // clientOnly: true,
        Component: App,
        bindings: [
          httpInjectables
        ]

      });
    });

  router.
    route('/examples/todo').
    get(function(req, res) {
      res.render('app/universal/todo/index', {
        // clientOnly: true,
        Component: TodoApp,
        bindings: [
          httpInjectables
        ]

      });

    });


  router.use('/src', function(req, res, next) {
    serveStatic(ROOT + '/src')(req, res, next);
  });

  router.use('/node_modules', function(req, res, next) {
    serveStatic(ROOT + '/node_modules')(req, res, next);
  });

  router.use('/angular2/dist', function(req, res, next) {
    serveStatic(ROOT + '/angular/dist/bundle')(req, res, next);
  });

  router.use('/preboot', function(req, res, next) {
    serveStatic(ROOT + '/modules/examples/preboot_basic')(req, res, next);
  });

  router.use('/web_modules', function(req, res, next) {
    serveStatic(ROOT + '/web_modules')(req, res, next);
  });

  router.use('/bower_components', function(req, res, next) {
    serveStatic(ROOT + '/bower_components')(req, res, next);
  });

  router.use(historyApiFallback({
    // verbose: true
  }));


  return router;
};
