/**
 * Created by DeAlwis on 10/15/2016.
 */
angular.module('armsAngularApp')
    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated'
    })
    .constant('API_ENDPOINT', {
        url: 'http://localhost:8002'
    })
    .constant('CONFIG', {
    'APP_NAME': 'Acadamic Resource Management',
    'APP_VERSION': '0.0.1',
    'GOOGLE_ANALYTICS_ID': '',
    'BASE_URL': 'http://localhost:8002/',
    'SYSTEM_LANGUAGE': ''
    });
