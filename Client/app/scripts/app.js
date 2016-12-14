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
    'datatables',
    'datatables.bootstrap',
    'ui.select2',
    'mgcrea.ngStrap'
  ])
  .config(['$routeProvider', '$locationProvider','$httpProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    /*******************************/
    /*******************************/
    /*        general routes       */
    /*       non authenticated     */
    /*******************************/
    /*******************************/
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth',
        activeTab: 'login'
      })
      /*******************************/
      /*******************************/
      /**      specific routes      **/
      /**  requires authentication  **/
      /*******************************/
      /*******************************/

      /*  main page route  */
      .when('/', {          /*  non admin users  */
        templateUrl: 'views/master/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/control-panel', { /*  admin user   */
        templateUrl: 'views/admin_main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      /*  admin - backend management  routes  */
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/control-panel/faculty', {
        templateUrl: 'views/faculty/main.html',
        controller: 'FacultyMainCtrl',
        controllerAs: 'facultyController'
      })
      /*  user - management  routes  */
      .when('/control-panel/users', {
        templateUrl: 'views/user_management/users.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })

      .when('/control-panel/user-types', {
        templateUrl: 'views/user_management/user_types.html',
        controller: 'UserTypeCtrl',
        controllerAs: 'usertype'
      })
      /*  appointment - management  routes  */
      .when('/l/appointments/appointment', {
        templateUrl: 'views/appointments/appointment.html',
        controller: 'AppointmentCtrl',
        controllerAs: 'appointment',
        bindToController: 'true'

      })
      .when('/s/appointments/appointment', {
        templateUrl: 'views/appointments/appointment-request.html',
        controller: 'AppointmentRequestsCtrl',
        controllerAs: 'appointmentRequest',
        bindToController: 'true'

      })
      .when('/l/appointments/my-availability', {
        templateUrl: 'views/appointments/lecture-avilability.html',
        controller: 'LectureAvilabilityCtrl',
        controllerAs: 'lectureAvailability',
        bindToController: 'true'

      })
      /*  feedback - management  routes  */
      .when('/feedback-management/feedback-sessions', {
        templateUrl: 'views/feedback_management/feedback_sessions.html',
        controller: 'FeedbacksessionsCtrl',
        controllerAs: 'appointment',
        bindToController: 'true'
      })
      // .when('/faculty/main', {
      //   templateUrl: 'views/faculty/main.html',
      //   controller: 'FacultyMainCtrl',
      //   controllerAs: 'facultyController',
      // })
      .when('/admin/questions', {
        templateUrl: 'views/questions/questions.html',
        controller: 'QuestionsCtrl',
        controllerAs: 'questions'
      })
      .when('/hod/feedbackSession', {
        templateUrl: 'views/feedbackSession/feedbackSession.html',
        controller: 'QuestionsCtrl',
        controllerAs: 'questions'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(function($httpProvider){
    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
  })
  .run([
    '$rootScope',
    '$location',
    'AuthenticationService',
    'AUTH_EVENTS',
    function ($rootScope,$location, AuthenticationService,AUTH_EVENTS){
      // $rootScope.user = {
      //   id: 3,
      //   userName: 'student01',
      //   role: 'lecture'
      // };
      $rootScope.$on('$routeChangeSuccess', function(event, currentRoute,previous) {
        /*******************************/
        /*       non authenticated     */
        /*******************************/


        if (!AuthenticationService.isAuthenticated()) {
          event.preventDefault();
          $rootScope.bodyClass = 'login-page';
          $location.path( "/login" );
        } else {
          // get logged in user`s user role
          var user_credentials = AuthenticationService.getUserCredentials();
          var user_role = user_credentials.usertype;
          $rootScope.user_role = user_credentials.usertype;
          $rootScope.user_name = user_credentials.username;
          $rootScope.full_name = user_credentials.full_name;
          $rootScope.email = user_credentials.email;

          //check for the request path
          var current_requested_path = $location.path();
          var check_path = current_requested_path.substring(14, 1);

          if( user_role == 'Admin') {/*  admin routes check  */
            $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini'; /*  style for admin control panel  */
            if( check_path != 'control-panel' || $location.path() ==  "/login"){
              $location.path( "/control-panel" );
            }
          } else {                    /*  non admin routes check  */
            $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini layout-top-nav'; /*  style for non admin  */
            if( check_path == 'control-panel' || $location.path() ==  "/login") {
              $location.path("/");
            }
          }
        }

        // switch (currentRoute.templateUrl) {
        //   case 'views/login.html':
        //     $rootScope.bodyClass = 'login-page';
        //     break;
        //   default:
        //     if ($rootScope.user.role === 'Admin') {
        //       $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini';
        //     } else {
        //       $rootScope.bodyClass = 'hold-transition skin-blue layout-top-nav';
        //     }
        //     break;
        // }

      });
    }])
  .constant("moment", moment);
