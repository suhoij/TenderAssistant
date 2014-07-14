/**
 * In future we can do Ctrl Z and restore as much History as we can
 *
 */

//Get all the textareas when loading page
//Add event handlers keyup and set timeout for 5 second
//Save the data in this textarea

var History = (function() {

    var _prepareUniqueID = function(pageId, textarea) {
        return pageId + "-ta-textarea-id-" + $(textarea).attr('id');
    };

    var _restoreHistoryForTextArea = function(uniqueHistoryId, textarea) {
        appAPI.db.async.get(uniqueHistoryId, function(value) {
            $(textarea).val( value );
            if(value !== null && value !== undefined && value == '') {
                _updateTextAreaHeight(textarea);
            }

        });
    };

    var _updateTextAreaHeight = function(textarea) {
        $(textarea).height('10px');
        var scrollHeight = $(textarea).get(0).scrollHeight + 20;
        $(textarea).height(scrollHeight + 'px');
    };

    var _initEventHandlers = function(uniqueHistoryId, textarea) {
        var currentTextArea = $(textarea);
        var saveTextareaContent = function() {
            $('#'+uniqueHistoryId).fadeIn({
                duration: 400,
                easing: 'linear'
            });
            appAPI.db.async.set(
                uniqueHistoryId,
                currentTextArea.val(),
                appAPI.time.hoursFromNow(12),
                function() {
                    $('#'+uniqueHistoryId).fadeOut(400);
                });
        };

        currentTextArea.on('keyup change',$.debounce( 500, saveTextareaContent ));
    }


    return {
        initialize : function(pageId) {

            $('textarea').each(function(index, textarea) {
                var uniqueHistoryId = _prepareUniqueID(pageId, textarea);
                _initEventHandlers(uniqueHistoryId, textarea);
                _restoreHistoryForTextArea(uniqueHistoryId, textarea);


                $(textarea).after('<div style="position: relative;"><div id="ta-suggestions"></div><div id="'+uniqueHistoryId+'" style="position: absolute; display: none;right: 0;">Saving changes ....</div></div>');

            });
        }
    };

})($);










