app.controller('appCtrl', ['$scope', 'DataFactory', function($scope, DataFactory){

  $scope.url = null;
  $scope.hasVideoInfo = false;
  $scope.isLoading = false;
  $scope.videoData = {list: [], description: null};

  $('.modal-trigger').leanModal();

  $scope.validateUrl = function(){
    if($scope.url && $scope.url.match(/https?:\/\/(.+?\.)?youtube\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/))
      return true;
    return false;
  }

  $scope.displayError = function(error){
    Materialize.toast(error, 3000);
  }

  $scope.fetchData = function(){
    if($scope.isLoading)
      return;
    $scope.hasVideoInfo = false;
    if($scope.validateUrl()){
      $scope.isLoading = true;
        DataFactory.fetchData($scope.url).then(function(){
            $scope.isLoading = false;
            $scope.hasVideoInfo = true;
            $scope.videoData = DataFactory.videoInfo;
        }, function(err){
            $scope.isLoading = false;
            $scope.displayError(err || 'Server error');
        });
    }else{
      $scope.displayError('Enter a valid youtube URL');
    }
  }

}]);
