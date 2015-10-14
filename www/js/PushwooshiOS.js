function registerPushwooshIOS() {
    var pushNotification = window.plugins.pushNotification;

    //set push notification callback before we initialize the plugin
    document.addEventListener('push-notification', function(event) {
				//get the notification payload
				var notification = event.notification;

				//display alert to the user for example
				alert(notification.aps.alert);

				//clear the app badge
				pushNotification.setApplicationIconBadgeNumber(0);
		});

    //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"4EE4A-4A69C"});

		if(!window.localStorage['Pushwoosh']){ 
			//register for pushes
			pushNotification.registerDevice(
					function(status) {
							var deviceToken = status['deviceToken'];
							console.warn('registerDevice: ' + deviceToken);
							window.localStorage['Pushwoosh'] = true;
					},
					function(status) {
							console.warn('failed to register : ' + JSON.stringify(status));
							alert(JSON.stringify(['failed to register ', status]));
					}
			);
		}

    //reset badges on app start
    pushNotification.setApplicationIconBadgeNumber(0);
}