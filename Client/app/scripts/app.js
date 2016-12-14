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
    'ui.bootstrap',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'datatables',
    'datatables.bootstrap',
    'ui.select2',
    'mgcrea.ngStrap',
    'checklist-model',
    'toggle-switch'
  ])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider) {
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
      .when('/', {
        /*  non admin users  */
        templateUrl: 'views/user_main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/control-panel', {
        /*  admin user   */
        templateUrl: 'views/admin_main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })


      /*  admin - backend management  routes  */
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      /*  appointment - management  routes  */
      .when('/hod/appointments/appointment', {
        templateUrl: 'views/appointments/hod-appoinments.html',
        controller: 'HodAppointmentsCtrl',
        // controllerAs: 'appointment',
        // bindToController: 'true'
      })
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
      /*  feedback - management  routes  */
      .when('/feedback-management/feedback-sessions', {
        templateUrl: 'views/feedback_management/feedback_sessions.html',
        controller: 'FeedbacksessionsCtrl',
        controllerAs: 'appointment',
        bindToController: 'true'
      })

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
      .when('/feedback/quiz', {
          templateUrl: 'views/quiz/quiz.html',
          controller: 'QuizCtrl',
          controllerAs: 'QuizCtrl',
          bindToController: 'true'
      })
      /*  faculty - management  routes  */
      .when('/control-panel/faculty/main', {
        templateUrl: 'views/faculty/main.html',
        controller: 'FacultyMainCtrl',
        controllerAs: 'facultyController'
      })
      .when('/control-panel/admin/subjects', {
        templateUrl: 'views/subjects/subjects.html',
        controller: 'SubjectsCtrl',
        controllerAs: 'subjects'
      })
      .when('/control-panel/admin/center', {
        templateUrl: 'views/center/center.html',
        controller: 'CenterCenterCtrl',
        controllerAs: 'Center/Center'
      })
      .when('/control-panel/admin/departments', {
        templateUrl: 'views/department/department.html',
        controller: 'DepartmentCtrl',
        controllerAs: 'Department'
      })
      .when('/control-panel/admin/batch', {
        templateUrl: 'views/batch/batch.html',
        controller: 'BatchCtrl',
        controllerAs: 'Batch'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(false);

  }]).run(function ($rootScope, $location, AuthenticationService, AUTH_EVENTS) {
  $rootScope.$on('$routeChangeSuccess', function (event, currentRoute, previous) {

    /*******************************/
    /*       non authenticated     */
    /*******************************/


    if (!AuthenticationService.isAuthenticated()) {
      event.preventDefault();
      $rootScope.bodyClass = 'login-page';
      $location.path("/login");
    } else {
      // get logged in user`s user role
      var user_credentials = AuthenticationService.getUserCredentials();
      $rootScope.user = user_credentials;
      var user_role = user_credentials.usertype;
      $rootScope.user_role = user_credentials.usertype;
      $rootScope.user_name = user_credentials.username;
      $rootScope.full_name = user_credentials.full_name;
      $rootScope.email = user_credentials.email;

      //check for the request path
      var current_requested_path = $location.path();
      var check_path = current_requested_path.substring(14, 1);

      if (user_role == 'Admin') {/*  admin routes check  */
        $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini';
        /*  style for admin control panel  */
        if (check_path != 'control-panel' || $location.path() == "/login") {
          $location.path("/control-panel");
        }
      }
      else {                    /*  non admin routes check  */
        $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini layout-top-nav';
        /*  style for non admin  */
        if (check_path == 'control-panel' || $location.path() == "/login") {
          $location.path("/");
        }
      }
    }

  });
}).constant("moment", moment);


 