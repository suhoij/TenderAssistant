appAPI.ready(function($) {
    appAPI.resources.includeJS("modules/Fixes.js");


	appAPI.resources.includeCSS("libs/jqueryui/jquery-ui.css");
	appAPI.resources.includeCSS("styles.css");
    appAPI.resources.includeJS("libs/jquery-throttle-debounce/jquery.ba-throttle-debounce.min.js");

	appAPI.resources.includeJS("modules/User.js");
	appAPI.resources.includeJS("modules/Odesk.js");
	appAPI.resources.includeJS("modules/Elance.js");


    var sidebar = null;

    if (appAPI.matchPages("*.odesk.com/*") || appAPI.matchPages("*.elance.com/*")) {

        var token = null;

        if (User.isAuthenticated()) {
            token = User.getToken();
        }

        var currentService = null;

        if (appAPI.matchPages("*.odesk.com/*")) {
            Odesk.init();
            currentService = Odesk;
        } else if (appAPI.matchPages("*.elance.com/*")) {
            Elance.init();
            currentService = Elance;
        }


        if (currentService.isProjectPage()) {
            var jobId = currentService.extractJobId(document.location.href);
            var sidebarUrl = 'https://ta.da-14.com/panel/job/service/' + currentService + '/jobid/' + jobId;
        } else if (currentService.isApplicationPage()) {

            var sidebarUrl = 'https://ta.da-14.com/panel/apply/';
            appAPI.resources.includeJS("modules/Toolbar.js");
            appAPI.resources.includeJS("modules/History.js");
            appAPI.resources.includeJS("modules/Spellchecker.js");
            var pageId = currentService.extractPageId(document.location.href);
            History.initialize(pageId);

        }

        sidebar = new appAPI.sidebar({
            position: 'right',
            url: sidebarUrl,
            title: {
                content: 'Tender Assistant', // Title content
                close: true // Display close [X] button
            },
            opacity: 1.0, // Sidebar's opacity
            width: '500px', // Sidebar width (can be px or %)
            height: '590px', // Sidebar height (can be px or %)
            preloader: true, // Show spinning loader until content has loaded (apply only if url parameter is specified)
            sticky: true,
            slide: 150,
            openAction: ['click'],
            closeAction: 'click',
            theme: 'default',
            scrollbars: false,
            openOnInstall: false,

            events: {
                onShow: function () {
                    // alert("show")
                },
                onHide: function () {
                    // alert('hide');
                }
            }
        });

        if (currentService.isApplicationPage()) {
            sidebar.open(true);
        }

    }

});


