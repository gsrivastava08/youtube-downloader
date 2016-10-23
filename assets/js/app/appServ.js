app.factory('DataFactory', ["$q", "$http" ,function($q, $http){
   var DataFactory = {};
   DataFactory.videoInfo = null;
   DataFactory.fetchData = function(url){

     var deferred = $q.defer();
     $http.post('/fetch-video', {url: url}).then(function(response){
       if(response.status == 200){
         DataFactory.videoInfo = response.data.data;
         deferred.resolve();
       }else{
         deferred.reject(response.data.error);
       }
     }, function(err){
       deferred.reject(err.data.error);
     });
     return deferred.promise;
   }

   return DataFactory;
}]);
