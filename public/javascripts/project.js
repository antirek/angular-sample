angular.module('project', ['ngRoute', 'firebase'])
 
.value('fbURL', 'https://angularjs-projects.firebaseio.com/')
 
.factory('Projects', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL)).$asArray();
})

.service('Phone', function(){

    var phone = function(){
        this.STATUS_IDLE  = 'idle';
        this.STATUS_RINGING  = 'ringing';

        this.status = 'idle';
        this.callButton = 'Call';
    }

    phone.prototype.isIdle = function() {
        return (this.status == this.STATUS_IDLE);
    };

    phone.prototype.call = function() {
        this.status = this.STATUS_RINGING;
    };

    phone.prototype.release = function() {
        this.status = this.STATUS_IDLE;
    };

    return phone;
})
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'/javascripts/list.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ListCtrl', function($scope, Projects, Phone) {

    $scope.projects = Projects;
    
    var phone = new Phone();
    $scope.phone = phone;
})