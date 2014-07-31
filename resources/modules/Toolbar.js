var elem = appAPI.dom.addInlineCSS({
    css: "#ta-use-template-btn { border: solid 1px #ccc;padding: 9px;background: #7db9e8; color: #FFF;} " +
        "#ta-bid-template-description{ border: solid 1px #ccc; border-radius: 0; width: 270px; }   " +
        "div.ta-wrapper{position:relative}" +
        "div.ta-wrapper div.ta-toolbar{padding: 0 6px; position:absolute;width:100%; top: 5px;}" +
        "div.ta-wrapper div.ta-toolbar button{float:right}textarea#coverLetter{padding-top:45px}"
});


var currentTemplateId = 0,
    currentTextarea = $('textarea')[0],
    odeskToolBar,
    elanceToolBar;

var Toolbar = function (id) {
    var skillsTextarea;

    this.findTextareaById = function () {
        skillsTextarea = $('#' + id);
        return this;
    };

    this.getTextarea = function () {
        return skillsTextarea;
    };

};

Toolbar.prototype.addToolbar = function () {
    var textarea = this.getTextarea(),
        position = textarea.position();

    textarea.wrap( "<div class='ta-wrapper'></div>" );
    var toolbar = $('div.ta-wrapper')[0];

    $(toolbar).width( textarea.outerWidth()).css( 'margin-left', position.left );

    $(toolbar).prepend( $('<div class="ta-toolbar"><input type="text" id="ta-bid-template-description" placeholder="Describe somehow your template" />' +
        '<button id="ta-use-template-btn">Use this as template</button></div>') );

    return this;
};

Toolbar.prototype.addEvList = function () {
    var self = this,
        textarea = this.getTextarea();
    $('#ta-use-template-btn').click(function(e) {
        e.preventDefault();

        var title = $('#ta-bid-template-description').val();
        var content     = textarea.val();

        if( self.formFieldsAreValid(title, content) ) {
            var postData = {
                'title'   : title,
                'content' : content
            };

            //Send this as template to server
            if(currentTemplateId == 0) {

                var record = DropboxService.createTemplate(title, content);
                currentTemplateId = record.getId();
                $('#ta-use-template-btn').text('Update template');


            } else {
                debugger;
                var templateRecord = DropboxService.getTemplateById(currentTemplateId);

                templateRecord.set('title', title);
                templateRecord.set('content', content);

            }

        }

    });
};

Toolbar.prototype.formFieldsAreValid = function(description, content) {
    if( description.length > 0 && content.length > 0) {
        return true;
    }
    return false;
};

Toolbar.prototype.receiveMessage = function (event) {
    var textarea = this.getTextarea();
    if( (event.origin == 'https://ta.da-14.com') && event.data.page == 'apply')  {
        debugger;
        textarea.val(event.data.bidTemplate.description).change();
        $('#ta-bid-template-description').val(event.data.bidTemplate.title);
        currentTemplateId = event.data.bidTemplate.id;
        textarea.height('10px');
        var scrollHeight = textarea.get(0).scrollHeight + 20;
        textarea.height(scrollHeight + 'px');
        $('#ta-use-template-btn').text('Update the template');
        textarea.focus();
    }
};


if (Odesk.isApplicationPage()) {
    odeskToolBar = new Toolbar('coverLetter');
    odeskToolBar
        .findTextareaById()
        .addToolbar()
        .addEvList();
    //Here comes the part which add the event handlers for bid template list
    window.addEventListener("message", odeskToolBar.receiveMessage.bind(odeskToolBar), false);
} else if (Elance.isApplicationPage()) {
    elanceToolBar = new Toolbar('bid_exp-plaintext');
    elanceToolBar
        .findTextareaById()
        .addToolbar()
        .addEvList();
    //Here comes the part which add the event handlers for bid template list
    window.addEventListener("message", elanceToolBar.receiveMessage.bind(elanceToolBar), false);
}

(function () {
    //Set the onfocus handler in order to understand where should we put the text
    $('textarea').on('focus', function() {
        currentTextarea = this;
    });

})();



