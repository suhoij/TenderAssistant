var DropboxService = (function() {

    var _Dropbox = null;
    var _Datastore = null;


    return {

        initialize : function(Dropbox) {
console.log('Initializing');
            debugger
            _Dropbox = Dropbox;

            var dropboxCredentials = appAPI.db.get("dropboxCredentials");

                appAPI.request.post({
                    url: 'https://ta.da-14.com/panel/getDropboxAuth',
                    postData: {appId: appAPI.appInfo.id, userId: appAPI.appInfo.userId},
                    onSuccess: function(response, additionalInfo) {

                        var client = new Dropbox.Client(response);

                        if (client.isAuthenticated()) {

                            client.getDatastoreManager().openDefaultDatastore(function (error, datastore) {
                                if (error) {
                                    alert('Error opening default datastore: ' + error);
                                }

                                console.log('Datastore' , datastore);
                                _Datastore = datastore;


//                                var records = taskTable.query();
//
//                                // Sort by creation time.
//                                records.sort(function (taskA, taskB) {
//                                    if (taskA.get('created') < taskB.get('created')) return -1;
//                                    if (taskA.get('created') > taskB.get('created')) return 1;
//                                    return 0;
//                                });
//
//                                // Add an item to the list for each task.
//                                for (var i = 0; i < records.length; i++) {
//                                    var record = records[i];
//                                    console.log(record.getId());
//                                }

                            });
                        }


                        console.log('Response Headers:' + headersAsString);
                    },
                    onFailure: function(httpCode) {
                        console.log('Failed to retrieve content. (HTTP Code:' + httpCode + ')');
                    },
                    responseDataType: 'application/json'
                });



        },

        createTemplate : function(title, description) {
            if(_Datastore) {
                templatesTable = _Datastore.getTable('bidTemplates');
                var savedTemplate = templatesTable.insert({
                    title: title,
                    description: description,
                    created: new Date()
                });

                return savedTemplate;
            }

        },

        getTemplateById : function(templateId) {
            if(_Datastore) {
                var templateRecord = _Datastore.getTable('bidTemplates').get(templateId);
                return templateRecord;
            }
        }


    }



})();