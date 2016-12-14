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
    'datatables.bootstrap',
    'ui.select2',
    'toggle-switch'
  ])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
      .when('/', {             /*  non admin users  */
        templateUrl: 'views/user_main.html',
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

      /*  question and question template - management  routes  */
      .when('/control-panel/questions', {
        templateUrl: 'views/questions/questions.html',
        controller: 'QuestionsCtrl',
        controllerAs: 'questions'
      })
      .when('/control-panel/question-templates', {
        templateUrl: 'views/question_template/questionTemplate.html',
        controller: 'QuestionTemplateCtrl',
        controllerAs: 'questionTemplate'
      })




      /*  appointment - management  routes  */
      .when('/appointments/appointment', {
        templateUrl: 'views/appointments/appointment.html',
        controller: 'AppointmentCtrl',
        controllerAs: 'appointment',
        bindToController: 'true'
      })



      /*  feedback - management  routes  */
      .when('/feedback-management/feedback-sessions', {
        templateUrl: 'views/feedback_management/feedback_sessions.html',
        controller: 'FeedbacksessionsCtrl',
        controllerAs: 'appointment',
        bindToController: 'true'
      })

      .when('/feedback-management/report', {
        templateUrl: 'views/reports/chart.html',
        controller: 'ReportCtrl',
        controllerAs: 'report',
        bindToController: 'true'
      })

      /*  quiz routes  */
      .when('/feedback/quiz-main', {
        templateUrl: 'views/quiz/quiz_main.html',
        controller: 'QuizCtrl',
        controllerAs: 'QuizCtrl',
        bindToController: 'true'
      })
      .when('/feedback/quiz/:sessionCode?', {
        templateUrl: 'views/quiz/quiz.html',
        controller: 'QuizCtrl',
        controllerAs: 'QuizCtrl',
        bindToController: 'true'
      })








      .otherwise({
        redirectTo: '/'
      });
  }]).run(function ($rootScope,$location, AuthenticationService,AUTH_EVENTS) {
  $rootScope.$on('$routeChangeSuccess', function (event,currentRoute, previous) {

    /*******************************/
    /*       non authenticated     */
    /*******************************/


    if (!AuthenticationService.isAuthenticated()) {
      event.preventDefault();
      $rootScope.bodyClass = 'login-page';
      $location.path( "/login" );
    }else{
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

      if( user_role == 'Admin'){/*  admin routes check  */
        $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini'; /*  style for admin control panel  */
        if( check_path != 'control-panel' || $location.path() ==  "/login"){
          $location.path( "/control-panel" );
        }
      }
      else {                    /*  non admin routes check  */
        $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini layout-top-nav'; /*  style for non admin  */
        if( check_path == 'control-panel' || $location.path() ==  "/login") {
          $location.path("/");
        }
      }
    }

  });

}).constant('CONFIG', {
  'APP_NAME': 'Acadamic Resource Management',
  'APP_VERSION': '0.0.1',
  'GOOGLE_ANALYTICS_ID': '',
  'BASE_URL': 'http://localhost:8002/',
  'SYSTEM_LANGUAGE': ''
})
  .constant("moment", moment);
