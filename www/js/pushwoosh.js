function initPushwoosh()
{

var pushNotification = window.plugins.pushNotification;

//alert(pushNotification);

// Listener que espera a chegada da notificação e roda um evento
document.addEventListener('push-notification', function(event) {
    var message = event.notification.title;
    var userData = event.notification.userdata;

    if(typeof(userData) != "undefined") {
        console.warn('user data: ' + JSON.stringify(userData));
    }

    alert(message);
});

// Inicializa os dados do plugin
pushNotification.onDeviceReady({ projectid: "AIzaSyBds8Jqeafwk9idb9T6L0pex8U_RkjsIo4", pw_appid : "4EE4A-4A69C" });

if(!window.localStorage['Pushwoosh']){
    //Registra para os Pushs
    pushNotification.registerDevice(
            function(status) {
                    var pushToken = status;
                    console.warn('push token: ' + pushToken);
                    alert('push token: ' + pushToken);
                    window.localStorage['Pushwoosh'] = true;
                    window.localStorage['token'] = pushToken;
            },
            function(status) {
                    console.warn(JSON.stringify(['failed to register ', status]));
                    alert(JSON.stringify(['failed to register ', status]));
            }
    );
}

}

app.js

.controller('iniciarCtrl', function($scope, $window){

$scope.mostrar = function(){
alert('Exemplo de ionic + pushwoosh');
}
})	