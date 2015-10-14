angular.module('starter.services', ['ngResource'])


.factory('Sale', function ($resource) {
    
    return $resource('data/sale.json',{ }, {

        get: {method:'GET', isArray: true}

      });

})

.factory('Relatore', function ($resource) {
    
    return $resource('http://posterlab.skilla.com/relatori/ejemplo-cliente-restful?method=get-list',{ }, {

        get: {method:'GET', isArray: true}

      });

})

.factory('Sessione', function ($http, $localStorage, $resource) {
    
		var mysession = $localStorage.getObject('session');
		var dati = {
			      'session': mysession
			    }
		var users = [];
	
		return {
			getUsers: function(){
				return $http({
				        url: 'http://posterlab.skilla.com/posterlabs/index/mysession',
				        method: "POST",
				        data: dati,
				        type: 'html',
				        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				    }).then(function(response){
		                requests = response.data;
		                //console.log(requests);
		                return requests;
		            });
				},
				getUser: function(id){
					//console.log(id);
					for(i=0;i<requests.length;i++){
						if(requests[i].id == id){
							//console.log(requests[i].interattivo);
							return requests[i].interattivo;
						}
					}
					return null;
				}
		    }
	
})

.factory('Comitato', function ($resource) {
    
    return $resource('data/comitato_scientifico.json',{ }, {

        get: {method:'GET', isArray: true}

      });

})

.factory('Base', function ($resource) {
    
    return $resource('data/posterlab_base.json',{ }, {

        get: {method:'GET', isArray: true}

      });

})

.factory('Intermedio', function ($resource) {
   
    return $resource('data/posterlab_intermedio.json',{ }, {

        get: {method:'GET', isArray: true}

      });

})

.factory('Avanzato', function ($resource) {
  
    return $resource('data/posterlab_avanzato.json',{ }, {

        get: {method:'GET', isArray: true}

      });

})

.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);



