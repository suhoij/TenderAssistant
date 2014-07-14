var Odesk = (function() {

	return {

        init : function() {

        },

		isProjectPage : function() {
			return appAPI.matchPages(/^.*\.odesk\.com\/jobs\/[a-z0-9-]*_(~[a-z0-9]*)\??.*/i);
		},

        isApplicationPage : function() {
			return appAPI.matchPages(/^.*\.odesk\.com\/job\/(~[a-z0-9]*)\??.*/i);
		},

        extractPageId : function(pageURI) {
            var pattern = /^.*\.odesk\.com\/job\/~([a-z0-9]*)\/.*/i;
            var result = pattern.exec(pageURI);


            return (result !== null) ? result[1] : null;
        },

		extractJobId : function(pageURI) {
			var pattern = /^.*\.odesk\.com\/jobs\/[a-z0-9-]*_(~[a-z0-9]*)\??.*/i;
			var result = pattern.exec(pageURI);


//            if(  (result == null) ) {
//                var pattern = /^.*\.odesk\.com\/job\/(~[a-z0-9]*)\??.*/i;
//                var result = pattern.exec(pageURI);
//                console.log(result);
//            }

//            https://www.odesk.com/job/~01af24ad158732b3f7/apply/

			return (result !== null) ? result[1] : null;
		}

	};

})();