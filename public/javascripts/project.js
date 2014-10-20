angular.module('project', ['ngRoute', 'firebase'])
 
.value('fbURL', 'https://angularjs-projects.firebaseio.com/')
 
.factory('Projects', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL)).$asArray();
})
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'/javascripts/list.html'
    })
    .when('/edit/:projectId', {
      controller:'EditCtrl',
      templateUrl:'/javascripts/detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'/javascripts/detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ListCtrl', function($scope, Projects) {

  

var config = {
    uri: '1060@' + host,
    wsServers: 'ws://'+ host +':8088/ws',
    authorizationUser: '1060',
    password: 'qwerty',
    hackIpInContact: true,
    register: true,
    log: {
        builtinEnabled: false,
    },
    stunServers: [
        "stun.ideasip.com",
        "stun.iptel.org",
        "stun.rixtelecom.se",
        "stun.schlund.de",
        "stunserver.org",
        "stun.stunprotocol.org:3478",
        "stun.voiparound.com",
        "stun.voipbuster.com",
        "stun.voipstunt.com",
        "stun.turnservers.com:3478"
    ],    
};


  $scope.userAgent = new SIP.UA(config);

  $scope.projects = Projects;

  $scope.buttonCall = 'Call';

  $scope.call = function(){
      
      $scope.userAgent.invite('1060');
      $scope.buttonCall = 'End';
  }


})
 
.controller('CreateCtrl', function($scope, $location, $timeout, Projects) {
  $scope.save = function() {
      Projects.$add($scope.project).then(function(data) {
          $location.path('/');
      });
  };
})
 
.controller('EditCtrl',
  function($scope, $location, $routeParams, Projects) {
    var projectId = $routeParams.projectId,
        projectIndex;
 
    $scope.projects = Projects;
    projectIndex = $scope.projects.$indexFor(projectId);
    $scope.project = $scope.projects[projectIndex];
 
    $scope.destroy = function() {
        $scope.projects.$remove($scope.project).then(function(data) {
            $location.path('/');
        });
    };
 
    $scope.save = function() {
        $scope.projects.$save($scope.project).then(function(data) {
           $location.path('/');
        });
    };
});