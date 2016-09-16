'use strict';

/**
 * @ngdoc overview
 * @name armsAngularApp
 * @description
 * # armsAngularApp
 *
 * Main module of the application.
 */
angular
        .module('armsAngularApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.bootstrap',
            'datatables',
            'datatables.bootstrap'
        ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

                $routeProvider
                        .when('/', {
                            templateUrl: 'views/main.html',
                            controller: 'MainCtrl',
                            controllerAs: 'main'
                        })
                        .when('/login', {
                            templateUrl: 'views/login.html',
                            controller: 'LoginCtrl',
                            controllerAs: 'login',
                            activeTab: 'login'
                        })
                        .when('/manage-users/create-u-role', {
                            templateUrl: 'views/role/usertype.html',
                            controller: 'UsertypeCtrl',
                            controllerAs: 'usertype',
                        })
                        .when('/faculty/main', {
                            templateUrl: 'views/faculty/main.html',
                            controller: 'FacultyMainCtrl',
                            controllerAs: 'facultyController',
                        })
                        .when('/about', {
                            templateUrl: 'views/about.html',
                            controller: 'AboutCtrl',
                            controllerAs: 'about'
                        })
                        .otherwise({
                            redirectTo: '/'
                        });
            }]).run(function ($rootScope) {

    $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
        switch (currentRoute.templateUrl) {
            case 'views/login.html':
                $rootScope.bodyClass = 'login-page';
                break;
            default:
                $rootScope.bodyClass = 'skin-blue sidebar-mini';
                break;
        }
    });
}).constant('CONFIG', {
    'APP_NAME': 'Acadamic Resource Management',
    'APP_VERSION': '0.0.1',
    'GOOGLE_ANALYTICS_ID': '',
    'BASE_URL': 'http://localhost:8002/',
    'SYSTEM_LANGUAGE': ''
});
