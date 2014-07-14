appAPI.ready(function () {

    // Set the button icon
    appAPI.browserAction.setResourceIcon('images/icon.jpg');

    // Sets the tooltip for the button
    appAPI.browserAction.setTitle('Tender Assistant Options');

    if (appAPI.db.get('userId')) {
        appAPI.browserAction.setPopup({
            resourcePath: 'login.html',
            height: 300,
            width: 300
        });
    } else {
        appAPI.browserAction.setPopup({
            resourcePath: 'settings.html',
            height: 300,
            width: 300
        });
    }


});