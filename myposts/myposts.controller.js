(function () {
    'use strict';

    angular
        .module('app')
        .controller('MyPostController', MyPostController);

    MyPostController.$inject = ['UserService', 'FeedsService', '$location', '$scope', 'FlashService'];
    function MyPostController(UserService, FeedsService, $location, scope, FlashService) {
        var vm = this;
        vm.deleteFeed = deleteFeed;
        vm.addNew = addNew;
        initController();

        function initController() {
            loadMyFeeds();
        }

        function loadMyFeeds() {
            FeedsService.GetAll()
                .then(function (feeds) {
                    vm.allfeeds = feeds;
                    console.log(vm.allfeeds);
                });
    }

        function deleteFeed(id) {
            FeedsService.DeleteFeed(id).then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
        function addNew(){
            let data = {
                title: vm.feed.title,
                body: vm.feed.body,
                usrId: 1
            }
            FeedsService.AddNew(data).then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
                angular.element('#close').trigger('click');
                angular.element('#reset').trigger('click');
        }
}

})();
