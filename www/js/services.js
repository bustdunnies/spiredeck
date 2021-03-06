spiredeck.factory(("ionPlatform"), function( $q ){
    var ready = $q.defer();

    ionic.Platform.ready(function( device ){
        ready.resolve( device );
    });

    return {
        ready: ready.promise
    }
})

/*spiredeck.factory('PushPlugin', function ($rootScope, $cordovaPush, ionic, gcm_id) {
	
	// Register
	function register () {
		
		var config = ionic.Platform.isAndroid()?
			
			// Is Android
			{"senderID": gcm_id} :
			
			// Or iOS
			{"badge": "true", "sound": "true", "alert": "true"};
		
		
		// Tackle PushPlugin
		$cordovaPush.register(config).then(
			function (result) {
				
				$rootScope.registerDisabled = true;
				$rootScope.regId = result;
				
				// Device tokens are so Apple
				if (ionic.Platform.isIOS())
					
					storeDeviceToken("ios");
				
				else console.log("Register success " + result);
			},
			function (err) { console.log("Register error " + err); }
		);
	}
	
	
	// Notification Received
	$rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
		console.log(JSON.stringify([notification]));
		if (ionic.Platform.isAndroid()) {
			handleAndroid(notification);
		}
		else if (ionic.Platform.isIOS()) {
			handleIOS(notification);
			$rootScope.$apply(function () {
				$rootScope.notifications.push(JSON.stringify(notification.alert));
			})
		}
	});

	// Android Notification Received Handler
	function handleAndroid(notification) {
		// ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
		//			 via the console fields as shown.
		console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
		if (notification.event == "registered") {
			$rootScope.regId = notification.regid;
			storeDeviceToken("android");
		}
		else if (notification.event == "message") {
			$cordovaDialogs.alert(notification.message, "Push Notification Received");
			$rootScope.$apply(function () {
				$rootScope.notifications.push(JSON.stringify(notification.message));
			})
		}
		else if (notification.event == "error")
			$cordovaDialogs.alert(notification.msg, "Push notification error event");
		else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
	}

	// IOS Notification Received Handler
	function handleIOS(notification) {
		// The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
		// for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
		// the notification when this code runs (weird).
		if (notification.foreground == "1") {
			// Play custom audio if a sound specified.
			if (notification.sound) {
				var mediaSrc = $cordovaMedia.newMedia(notification.sound);
				mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
			}

			if (notification.body && notification.messageFrom) {
				$cordovaDialogs.alert(notification.body, notification.messageFrom);
			}
			else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

			if (notification.badge) {
				$cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
					console.log("Set badge success " + result)
				}, function (err) {
					console.log("Set badge error " + err)
				});
			}
		}
		// Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
		// in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
		// the data in this situation.
		else {
			if (notification.body && notification.messageFrom) {
				$cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
			}
			else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
		}
	}

	// Stores the device token in a db using node-pushserver (running locally in this case)
	//
	// type:  Platform type (ios, android etc)
	function storeDeviceToken(type) {
		// Create a random userid to store with it
		var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $rootScope.regId };
		console.log("Post token for registered device with data " + JSON.stringify(user));

		$http.post('http://192.168.1.16:8000/subscribe', JSON.stringify(user))
			.success(function (data, status) {
				console.log("Token stored, device is successfully subscribed to receive push notifications.");
			})
			.error(function (data, status) {
				console.log("Error storing device token." + data + " " + status)
			}
		);
	}

	// Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
	// If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
	// time the app opens which this currently does. However in many cases you will always receive the same device token as
	// previously so multiple userids will be created with the same token unless you add code to check).
	function removeDeviceToken() {
		var tkn = {"token": $rootScope.regId};
		$http.post('http://192.168.1.16:8000/unsubscribe', JSON.stringify(tkn))
			.success(function (data, status) {
				console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
			})
			.error(function (data, status) {
				console.log("Error removing device token." + data + " " + status)
			}
		);
	}

	// Unregister - Unregister your device token from APNS or GCM
	// Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
	//				   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
	//
	// ** Instead, just remove the device token from your db and stop sending notifications **
	$rootScope.unregister = function () {
		console.log("Unregister called");
		removeDeviceToken();
		$rootScope.registerDisabled=false;
		//need to define options here, not sure what that needs to be but this is not recommended anyway
//		$cordovaPush.unregister(options).then(function(result) {
//			console.log("Unregister success " + result);//
//		}, function(err) {
//			console.log("Unregister error " + err)
//		});
	}
	
	
	
	
	return {
		register: register
	}
});*/

