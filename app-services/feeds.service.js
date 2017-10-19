(function () {
    'use strict';

    angular
        .module('app')
        .factory('FeedsService', FeedsService);

    FeedsService.$inject = ['$http'];
    function FeedsService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.DeleteFeed = DeleteFeed;
        service.AddNew = AddNew;

        return service;

        function GetAll() {
            return $http.get('https://jsonplaceholder.typicode.com/posts?userId=1').then(handleSuccess, handleError('Error getting all users'));
        }

        function DeleteFeed(id) {
            return $http.delete('https://jsonplaceholder.typicode.com/posts/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function AddNew(model){
            return $http.post('http://jsonplaceholder.typicode.com/posts', model).then(handleSuccess, handleError('Error getting all users'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
