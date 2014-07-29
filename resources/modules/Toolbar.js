var elem = appAPI.dom.addInlineCSS({
    css: "#ta-use-template-btn { border: solid 1px #ccc;padding: 9px;background: #7db9e8; color: #FFF;} #ta-bid-template-description{ border: solid 1px #ccc; border-radius: 0; width: 270px; }   div.ta-wrapper{position:relative}div.ta-wrapper div.ta-toolbar{padding: 0 6px; position:absolute;width:100%; top: 5px;}div.ta-wrapper div.ta-toolbar button{float:right}textarea#coverLetter{padding-top:45px}",

});


var position = $('#coverLetter').position();

$('#coverLetter').wrap( "<div class='ta-wrapper'></div>" );
var toolbar = $('div.ta-wrapper')[0];

$(toolbar).width( $('#coverLetter').outerWidth()).css( 'margin-left', position.left );

$(toolbar).prepend( $('<div class="ta-toolbar"><input type="text" id="ta-bid-template-description" placeholder="Describe somehow your template" /><button id="ta-use-template-btn">Use this as template</button></div>') );


var currentTemplateId = 0;
$('#ta-use-template-btn').click(function(e) {
    e.preventDefault();

    var title = $('#ta-bid-template-description').val();
    var content     = $('#coverLetter').val();

    if( formFieldsAreValid(title, content) ) {
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
            var templateRecord = DropboxService.getTemplateById(currentTemplateId);

            templateRecord.set('title', title);
            templateRecord.set('content', content);

        }

    }

});


function formFieldsAreValid(description, content) {

    if( description.length > 0 && content.length > 0) {
        return true;
    }

    return false;
}

//Here comes the part which add the event handlers for bid template list
window.addEventListener("message", receiveMessage, false);


function receiveMessage(event)
{

    if( (event.origin == 'https://ta.da-14.com') && event.data.page == 'apply')  {
        $('#coverLetter').val(event.data.bidTemplate.description).change();
        $('#ta-bid-template-description').val(event.data.bidTemplate.title);
        currentTemplateId = event.data.bidTemplate.id;
        $('#coverLetter').height('10px');
        var scrollHeight = $('#coverLetter').get(0).scrollHeight + 20;
        $('#coverLetter').height(scrollHeight + 'px');
        $('#ta-use-template-btn').text('Update the template');
        $('#coverLetter').focus();


    }
}

var currentTextarea = $('textarea')[0];
function initTextareas() {
    //Set the onfocus handler in order to understand where should we put the text
    $('textarea').on('focus', function() {

        currentTextarea = this;
    });


}

initTextareas();


