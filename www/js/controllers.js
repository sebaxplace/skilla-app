angular.module('starter.controllers', ['starter.services'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //icone in title
  $scope.partecipaIcon = '<i class="ion-ios-chatboxes-outline normal"></i>';
  $scope.relatoriIcon = '<i class="ion-ios-list-outline normal"></i>';
  $scope.comitatoIcon = '<i class="ion-ios-people-outline normal"></i>';
  $scope.posterlabIcon = '<i class="ion-ios-calendar-outline normal"></i>';
  $scope.baseTitle = 'percorso<br/>base';
  $scope.intermedioTitle = 'percorso<br/>intermedio';
  $scope.avanzatoTitle = 'percorso<br/>avanzato';
  $scope.sessioniIcon = '<i class="ion-ios-folder-outline normal"></i>';
  $scope.infoIcon = '<i class="ion-ios-information-outline normal"></i>';
  
  // Form data for the login modal
  $scope.loginData = {};

  /*/ Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', { 
    scope: $scope

  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };*/

  // Perform the login action when the user submits the login form
  
})


.controller('Login', function($scope, $timeout, $state, $localStorage, $http, $ionicPopup) {

  var dati = $localStorage.getObject('login');
  var utente = dati.username;
  
  if (utente !== undefined) {

    $state.go("app.chat");

  }

    $scope.doLogin = function() {
    //console.log('Doing login', $scope.loginData);

    var datilogin = $scope.loginData;
    var datisession = $localStorage.get('session');

    //console.log();
    $http({
        url: 'http://posterlab.skilla.com/posterlabs/index/login',
        method: "POST",
        data: datilogin,
        type: 'html',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response) {
            // success
            var risposta = response.data.data;
            var session = response.data.session;

            if (risposta == 'error') {

              var alertPopup = $ionicPopup.alert({
  					title: 'Password Errata',
  					template: 'Riprova',
      				buttons: [{
						text: 'OK',
						type: 'button-magenta'
													
					}]
				});

            }

            if (risposta == 'success') {

              var datilogin = $scope.loginData;
              //console.log(datilogin);
              
              window.localStorage['login'] = JSON.stringify(datilogin);
              var datilogin = JSON.parse(window.localStorage['login'] || '{}');

              $localStorage.setObject('sessione_attuale', session);

              	var b;
              	 
            	if (datisession == undefined) {
                $localStorage.setObject('session', session);
                b = [];
  
            	} else {

             	b = $localStorage.getObject('session');
             	console.log(b);
              	//b.push(nsessione);
              	$localStorage.setObject('session', b + ',' + session);

            	};

              	//$localStorage.setObject('session', session);

              $timeout(function() {
                $state.go("app.chat");
              }, 500);

            }
       
            
    }, 
    function(response) { // optional
            //fallisce duro
            //$( "#error" ).html( "<span class='assertive'><strong>Errore di sessione</strong></span>" );
            var alertPopup = $ionicPopup.alert({
  					title: 'Errore',
  					template: 'Errore di sessione',
      				buttons: [{
						text: 'OK',
						type: 'button-magenta'
					
					}]
				});


    });

    

  };

 
 

})




.controller('BasesCtrl', function($scope, $ionicHistory, Base) {
  
  	$scope.bases = Base.query();

})


.controller('BaseCtrl', function($scope, $sce, $stateParams, $state, Base) {	
   
  	$scope.bases = Base.query();
  	$scope.baseid = $stateParams.baseId;

  	$scope.to_trusted = function(html_code) {
    	return $sce.trustAsHtml(html_code);
  	}

  	$scope.goChat = function() { 
    	$state.go("app.partecipa");
  	}
  
})



.controller('IntermediosCtrl', function($scope, Intermedio) {
  
  	$scope.intermedios = Intermedio.query();

})


.controller('IntermedioCtrl', function($scope, $sce, $stateParams, $state, Intermedio) {
 
    $scope.intermedios = Intermedio.query();
    $scope.intermedioid = $stateParams.intermedioId;

    $scope.to_trusted = function(html_code) {
    	return $sce.trustAsHtml(html_code);
  	}

  	$scope.goChat = function() { 
    	$state.go("app.partecipa");
  	}

})


.controller('AvanzatosCtrl', function($scope, Avanzato) {

    $scope.avanzatos = Avanzato.query();

})


.controller('AvanzatoCtrl', function($scope, $sce, $stateParams, $state, Avanzato) {
 
    $scope.avanzatos = Avanzato.query();
    $scope.avanzatoid = $stateParams.avanzatoId;

    $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
    }

    $scope.goChat = function() { 
    $state.go("app.partecipa");
  }

})

.controller('RelatoriCtrl', function($scope, $state, $ionicPopup, $ionicLoading, Relatore) {
	
	$ionicLoading.show({
      	template: '<ion-spinner icon="ios"></ion-spinner>',
    	hideOnStageChange: true
    });
	
	$scope.relatori = Relatore.query();
	$scope.relatori.$promise.then(function(data) {
     
     	$ionicLoading.hide();
     	// Do whatever when the request is finished
	}, 
  	function(response) { // optional
            
            //fallisce duro
            $ionicLoading.hide();
            
            var alertPopup = $ionicPopup.confirm({
  		title: 'Connessione assente',
  		template: 'Assicurati di avere una connessione internet',
      buttons: [{
		text: 'OK',
		type: 'button-magenta',
		onTap: function(e) {
      	// Returning a value will cause the promise to resolve with the given value.
      	$state.go("app.home");
      		

  			}
		}]
	});
  
            
    });

  $scope.doRefresh = function() {
    
    $scope.relatori = Relatore.query();
    //console.log('fatto');
    $scope.$broadcast('scroll.refreshComplete');//stop spinner
  }
 

})

.controller('RelatoreCtrl', function($scope, $stateParams, $state, $ionicLoading, $ionicPopup, $sce, Relatore) {

  $ionicLoading.show({
      	template: '<ion-spinner icon="ios"></ion-spinner>',
    	hideOnStageChange: true
    });
	
	$scope.relatori = Relatore.query();
	$scope.relatoreid = $stateParams.relatoreId;
	$scope.relatori.$promise.then(function(data) {
     
     	$ionicLoading.hide();
     	// Do whatever when the request is finished
	}, 
  	function(response) {
            //fallisce duro
            $ionicLoading.hide();
            
            var alertPopup = $ionicPopup.confirm({
  				title: 'Connessione assente',
  				template: 'Assicurati di avere una connessione internet',
      			buttons: [{
					text: 'OK',
					type: 'button-magenta',
					onTap: function(e) {
      		// Returning a value will cause the promise to resolve with the given value.
      					$state.go("app.home");
      				}
				}]
			});
            
    });

  $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
    }


})


.controller('SalesCtrl', function($scope, Sale) {
  
  $scope.sales = Sale.query();
  //console.log($scope.relatori);

})

.controller('SaleCtrl', function($scope, $stateParams, Sale) {

  $scope.sales = Sale.query();
  $scope.saleid = $stateParams.saleId;

})


.controller('ComitatosCtrl', function($scope, Comitato) {
  
  $scope.comitatos = Comitato.query();

})


.controller('SessioniCtrl', function($scope, $timeout, $ionicScrollDelegate, $ionicLoading, $sce, $stateParams, $localStorage, $state, $ionicPopup, $http, Sessione) {
	$ionicLoading.show({
      	template: '<ion-spinner icon="ios"></ion-spinner>',
    	hideOnStageChange: true
    });
	
	var mysession = $localStorage.getObject('session');
	var checkempty = $localStorage.get('session');
	
	
	    
	  
	//console.log(checkempty);
	if(checkempty==undefined){
		 $ionicLoading.hide();
		$scope.$root.showExtraButton = true;

		 $scope.$on("$stateChangeStart", function() {
		   $scope.$root.showExtraButton = false;
		 })
		 $scope.goChat = function() { 
	    	$state.go("app.partecipa");
	  	}
	}else{
		 $ionicLoading.hide();
		 $scope.$root.showExtraButton = false;
		 Sessione.getUsers().then(function(data){
			 $scope.sessions = data;
			 //console.log(data);
		 })
		 $scope.doRefresh = function() {
			 Sessione.getUsers().then(function(data){
				 $scope.sessions = data;
				 //console.log(data);
			 }) 
			    
			    $scope.$broadcast('scroll.refreshComplete');//stop spinner
			  }
		 
	}
	 
    
	
	
})

.controller('sessioni_dettCtrl', function($scope, $timeout, $ionicScrollDelegate, $localStorage, $state, $ionicPopup, $http, Sessione, $stateParams) {
	var id = $stateParams.sessioni_dettId;
	$scope.user = Sessione.getUser(id);
	$scope.nomeposterlab = $scope.user[0].nomeposterlab;
	//console.log($scope.nomeposterlab);
	
})




// All this does is allow the message
// to be sent when you tap return
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})


.directive('hideTabBar', function($timeout) {
  var style = angular.element('<style>').html(
    '.has-tabs.no-tabs:not(.has-tabs-top) { bottom: 0; }\n' +
    '.no-tabs.has-tabs-top { top: 44px; }');
  document.body.appendChild(style[0]);
  return {
    restrict: 'A',
    compile: function(element, attr) {
      var tabBar = document.querySelector('.tab-nav');
      return function($scope, $element, $attr) {
        var scroll = $element[0].querySelector('.scroll-content');
        $scope.$on('$ionicView.beforeEnter', function() {
          tabBar.classList.add('slide-away');
          scroll.classList.add('no-tabs');
        })
        $scope.$on('$ionicView.beforeLeave', function() {
          tabBar.classList.remove('slide-away');
          scroll.classList.remove('no-tabs')
        });
      }
    }
  };
})

.controller('Messages', function($scope, $timeout, $ionicScrollDelegate, $localStorage, $state, $ionicPopup, $http) {

  var dati = $localStorage.getObject('login');
  var utente = dati.username;
  var session = $localStorage.getObject('sessione_attuale');

  $scope.nickname = dati.username;
  $scope.showTime = true;

  if (utente == undefined) {
    $state.go("app.partecipa");
  };


  var dati2 = $localStorage.get('messaggi');

  $scope.sendMessage = function() {
    
    var empty = $scope.data.message;

    if (empty !== undefined) {



    var dati = {
      'nome': utente,
      'session': session,
      'testo': $scope.data.message
    }

    $http({
        url: 'http://posterlab.skilla.com/posterlabs/index/guardar',
        method: "POST",
        data: dati,
        type: 'html',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response) {
            // success

            var risposta = response.data.data;
            var messaggio = response.data.messaggio;
            var colore = response.data.colore;

            if (risposta == 'error') {

              	var alertPopup = $ionicPopup.alert({
  					title: 'Sessione scaduta',
  					template: 'La sessione del PosterLab è scaduta.',
      				buttons: [{
						text: 'OK',
						type: 'button-magenta',
						onTap: function(e) {
      						// Returning a value will cause the promise to resolve with the given value.
      						window.localStorage.removeItem('login');
        					window.localStorage.removeItem('messaggi');
        					window.localStorage.removeItem('sessione_attuale');

      						$timeout(function() {
      							$state.go("app.partecipa");
      						}, 200);

  						}
					}]
				});


            }

            if (risposta == 'success') {

              $scope.messages.push({
                  nome: dati.username,
                  session: session,
                  testo: messaggio,
                  colore: colore
            });
            delete $scope.data.message;


            var post = $scope.messages;
            var a; 
            if (dati2 == undefined) {
                $localStorage.setObject('messaggi', post);
                a = [];
  
            } else {
        
              a = $localStorage.getObject('messaggi');
              a.push(post);
              $localStorage.setObject('messaggi', a);

            };


            }
       
            
    }, 
    function(response) { 
            //fallisce duro
            var alertPopup = $ionicPopup.confirm({
  			title: 'Connessione assente',
  			template: 'Assicurati di avere una connessione internet',
      			buttons: [{
					text: 'OK',
					type: 'button-magenta',
					onTap: function(e) {
      				// Returning a value will cause the promise to resolve with the given value.
      					$state.go("app.home");
 					}
		}]
	});

    });



    }


  };


  $scope.showPopup = function() {
  	var alertPopup = $ionicPopup.confirm({
  		title: 'Logout',
  		template: 'Stai abbandonando la sessione.<br/>Sei sicuro?',
      buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
      	text: 'Annulla',
      	type: 'button-default',
      	onTap: function(e) {
      // e.preventDefault() will stop the popup from closing when tapped.
      
  		}
		}, {
		text: 'OK',
		type: 'button-magenta',
		onTap: function(e) {
      		// Returning a value will cause the promise to resolve with the given value.
      	window.localStorage.removeItem('login');
        window.localStorage.removeItem('messaggi');
        window.localStorage.removeItem('sessione_attuale');

      		$timeout(function() {
      			$state.go("app.partecipa");
      		}, 200);

  			}
		}]
	});


  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];


});


/*
    $http({
        url: 'http://posterlab.skilla.com/posterlabs/index/guardar',
        method: "POST",
        data: ,
        type: 'html',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response) {
            // success
                
    }, 
    function(response) { // optional
            //fallisce duro
       
    });

*/
