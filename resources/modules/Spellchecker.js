var Spellchecker = (function($) {

    appAPI.resources.includeCSS("libs/spellchecker/jquery.spellchecker.css");
    appAPI.resources.includeJS("libs/spellchecker/jquery.spellchecker.js");


    var spellchecker = [];
    (function() {


        $('textarea').each(function(index, textarea) {
                spellchecker[index]   = new $.SpellChecker(textarea, {
                lang: 'en',
                parser: 'text',
                webservice: {
                    path: 'https://ta.da-14.com/SpellChecker.php',
                    driver: 'PSpell'
                },
                suggestBox: {
                    position: 'below',
                    position: null //function

                },
                incorrectWords: {
                    position: function(container) {
                        this.after(container);
                    }
                }
            });

            $(textarea).on('keyup change',$.debounce( 500, function() {
                spellchecker[index].check();
            } ));
        });

        var isOpera = navigator.userAgent.indexOf("Opera") > -1;
        var isIE    = navigator.userAgent.indexOf("MSIE") > 1 && !isOpera;
        var isMoz   = navigator.userAgent.indexOf("Mozilla/5.") == 0 && !isOpera;

        function textboxSelect(oTextbox, iStart, iEnd) {
            switch(arguments.length) {
                case 1:
                    oTextbox.select();
                    break;
                case 2:
                    iEnd = oTextbox.value.length;
                case 3:
                    if (isIE) {
                        var oRange = oTextbox.createTextRange();
                        oRange.moveStart("character", iStart);
                        oRange.moveEnd("character", -oTextbox.value.length + iEnd);
                        oRange.select();
                    } else if (isMoz){
                        oTextbox.setSelectionRange(iStart, iEnd);
                    }
            }
            oTextbox.focus();
        }


        var incorrectWordsContainer = $('div.ta-wrapper').find('.spellchecker-incorrectwords');

        incorrectWordsContainer.on('mouseenter', 'a', function() {

            var word = $(this).text();
            var start = $('#coverLetter').val().indexOf(word);
            textboxSelect($('#coverLetter').get(0), start, start+word.length);

        });

        incorrectWordsContainer.on('mouseleave', 'a', function() {
            textboxSelect($('#coverLetter').get(0), 0, 0);
        });

    })();

})($);