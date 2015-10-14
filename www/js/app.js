// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Connessione a internet assente",
                        content: "Rete disconnessa. Controlla la connessione del dispositivo."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }   
    
  });



})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })

  .state('app.partecipa', {
      url: '/partecipa',
      views: {
        'menuContent': {
          templateUrl: 'templates/partecipa.html',
          controller: 'Login'
        }
      }
    })

  .state('app.chat', {
      url: '/partecipa/chat',
      views: {
        'menuContent': {
          templateUrl: 'templates/UserMessages.html',
          controller: 'Messages'
        }
      }
    })

  .state('app.info', {
      url: '/info',
      views: {
        'menuContent': {
          templateUrl: 'templates/info.html',
          controller: 'SalesCtrl'
        }
      }
    })

  .state('app.info-dett', {
      url: '/info/:saleId',
      views: {
        'menuContent': {
          templateUrl: 'templates/info-dett.html',
          controller: 'SaleCtrl'
        }
      }
    })

  .state('app.posterlab', {
      url: '/posterlab',
      views: {
        'menuContent': {
          templateUrl: 'templates/posterlab.html',

      	}
      }
    })

  .state('app.posterlab.base', {
    url: '/base',
    cache: false,
    views: {
      'base': {
        templateUrl: 'templates/base.html',
        controller: 'BasesCtrl'
      }
    }
  })

  .state('app.posterlab.basedett', {
    url: '/base/:baseId',
    cache: false,
    views: {
      'base': {
        templateUrl: 'templates/base_dett.html',
        controller: 'BaseCtrl'
      }
    }
  })

  .state('app.posterlab.intermedio', {
    url: '/intermedio',
    views: {
      'intermedio': {
        templateUrl: 'templates/intermedio.html',
        controller: 'IntermediosCtrl'
      }
    }
  })

  .state('app.posterlab.intermediodett', {
    url: '/intermedio/:intermedioId',
    views: {
      'intermedio': {
        templateUrl: 'templates/intermedio_dett.html',
        controller: 'IntermedioCtrl'
      }
    }
  })

  .state('app.posterlab.avanzato', {
    url: '/avanzato',
    views: {
      'avanzato': {
        templateUrl: 'templates/avanzato.html',
        controller: 'AvanzatosCtrl'
      }
    }
  })

  .state('app.posterlab.avanzatodett', {
    url: '/avanzato/:avanzatoId',
    views: {
      'avanzato': {
        templateUrl: 'templates/avanzato_dett.html',
        controller: 'AvanzatoCtrl'
      }
    }
  })

    .state('app.relatori', {
      url: '/relatori',
      views: {
        'menuContent': {
          templateUrl: 'templates/relatori.html',
          controller: 'RelatoriCtrl'
        }
      }
    })

  .state('app.relatore', {
    url: '/relatori/:relatoreId',
    views: {
      'menuContent': {
        templateUrl: 'templates/relatori_dett.html',
        controller: 'RelatoreCtrl'
      }
    }
  })

  .state('app.comitato', {
      url: '/comitato',
      views: {
        'menuContent': {
          templateUrl: 'templates/comitato.html',
          controller: 'ComitatosCtrl'
        }
      }
    })

  /*.state('app.single2', {
    url: '/comitato/:comitato_dettId',
    views: {
      'menuContent': {
        templateUrl: 'templates/comitato_dett.html',
        controller: 'ComitatoCtrl'
      }
    }
  })*/

  .state('app.sessioni', {
      url: '/sessioni',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessioni.html',
          controller: 'SessioniCtrl'
        }
      }
    })

  .state('app.single3', {
    url: '/sessioni/:sessioni_dettId',
    views: {
      'menuContent': {
        templateUrl: 'templates/sessioni_dett.html',
        controller: 'sessioni_dettCtrl'
      }
    }
  })


 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
