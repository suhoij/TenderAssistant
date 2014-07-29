appAPI.ready(function () {

    // Set the button icon
    appAPI.browserAction.setResourceIcon('images/icon.jpg');

    // Sets the tooltip for the button
    appAPI.browserAction.setTitle('Tender Assistant Options');

    appAPI.browserAction.onClick(function() {
        appAPI.tabs.create('https://ta.da-14.com/panel/authenticate?userId=' + appAPI.appInfo.userId);
    });


});