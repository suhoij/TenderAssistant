var Elance = (function() {

	return {

        init : function() {

        },

		isProjectPage : function() {
			return appAPI.matchPages(/^.*\.elance\.com\/j\/[a-z0-9-]*?\/[0-9]*\/.*?/);
		},

        isApplicationPage : function() {
            return appAPI.matchPages(/^.*\.elance\.com\/j\/[a-z0-9-]*?\/[0-9]*\/.*?/);
        },

        extractPageId : function(pageURI) {
            var pattern = /^.*\.odesk\.com\/job\/~([a-z0-9]*)\/.*/i;
            var result = pattern.exec(pageURI);

            return (result !== null) ? result[1] : null;
        },

        extractJobId : function(pageURI) {
            var pattern = /^.*\.odesk\.com\/jobs\/[a-z0-9-]*_(~[a-z0-9]*)\??.*/i;
            var result = pattern.exec(pageURI);


            return (result !== null) ? result[1] : null;
        }






//		signin : function(username, email, password) {
//
//			appAPI.request.get({
//				url: 'http://server.da-14.com/ta/signin.json',
//				onSuccess: function(response, additionalInfo) {
//					var response = appAPI.JSON.parse(response)
//					if(response.status == 'success') {
//						var userData = {
//							username 	: username,
//							email		: email,
//							logged		: true,
//							token		: response.token
//						};
//						appAPI.db.set("user", userData);
//					}
//				},
//				onFailure: function(httpCode) {
//					alert('Failed to retrieve content. (HTTP Code:' + httpCode + ')');
//				}
//			});
//
//		},
//
//		getToken : function() {
//			return user.token;
//		}

	};

})();



