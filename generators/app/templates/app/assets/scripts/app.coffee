angular.module '<%= _.slugify(appname) %>', [ 'ngRoute','<%= _.slugify(appname) %>-main' ]

.config ($routeProvider) ->

  $routeProvider
  .otherwise
      redirectTo: '/'