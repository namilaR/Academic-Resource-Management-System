/**
 * Created by User on 11/18/2016.
 */
angular.module('armsAngularApp')
    .factory('batchService', ['$http', 'CONFIG', function ($http, CONFIG) {
        var baseUrl = CONFIG.BASE_URL;
        var batchService = {};

        batchService.createBatch = function(batch) {
            return $http({
                method: 'post',
                url: baseUrl + 'batch',
                data: batch
            }).then(function(response) {
                return response;
            })
        }

        return batchService;
    }]);