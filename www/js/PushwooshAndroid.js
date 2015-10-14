/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    function registerPushwooshAndroid() {

      var pushNotification = window.plugins.pushNotification;


        //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
        pushNotification.onDeviceReady({ projectid: "AIzaSyBds8Jqeafwk9idb9T6L0pex8U_RkjsIo4", appid : "4EE4A-4A69C" });


     if(!window.localStorage['Pushwoosh']){ 
        //register for pushes
    			pushNotification.registerDevice(
    					function(status) {
    							var pushToken = status;
    							console.warn('push token: ' + pushToken);
    							window.localStorage['Pushwoosh'] = true;
    					},
    					function(status) {
    							console.warn(JSON.stringify(['failed to register ', status]));
    					}
    			);
    		}

    }