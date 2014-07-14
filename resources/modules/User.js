var User = (function() {
	var user = appAPI.db.get("user");
	return {

		isAuthenticated : function() {
			return (user === null || user.logged === false)? false : true;
		},

		signin : function(username, email, password) {

			appAPI.request.get({
				url: 'http://server.da-14.com/ta/signin.json',
				onSuccess: function(response, additionalInfo) {
					var response = appAPI.JSON.parse(response)
					if(response.status == 'success') {
						var userData = {
							username 	: username,
							email		: email,
							logged		: true,
							token		: response.token
						};
						appAPI.db.set("user", userData);
					}
				},
				onFailure: function(httpCode) {
					alert('Failed to retrieve content. (HTTP Code:' + httpCode + ')');
				}
			});

		},

		getToken : function() {
			return user.token;
		}

	};


})();



