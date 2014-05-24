'use strict';

self.addEventListener('message', function(e) {
    var data = e.data;
    //get question from json
    var tempQuestion= {};
    load('../../../data/questiondir/'+data.questionId+'.json', function(xhr) {
        console.log('questionResponse.....:'+xhr.responseText);
        var thisQuestion=JSON.parse(xhr.responseText);
        tempQuestion= {};
        tempQuestion.id=data.questionId;
        tempQuestion.direction="";
        tempQuestion.option_type=thisQuestion.option_type;
        tempQuestion.question_type=thisQuestion.question_type;
        tempQuestion.status="unattempted";
        tempQuestion.user_selected_option="-1";

        //should be last addition in question object as passage includes cloning of above setups
        console.log('isPassage: '+thisQuestion.isPassage);
        if(thisQuestion.isPassage=='Y'){
            tempQuestion.direction=thisQuestion.passage;
            var passageQuestion={};
            for(var j=0; j<thisQuestion.questions.length; j++){
                //copy all above fields
                passageQuestion=tempQuestion;
                passageQuestion.statement=thisQuestion.questions[j].questionStatement;
                console.log('passageQuestion.statement: '+thisQuestion.questions[j].questionStatement);

                passageQuestion.options=[];
                for(var k=0; k<thisQuestion.questions[j].options.length; k++){
                    passageQuestion.options.push(thisQuestion.questions[j].options[k].optionValue);
                    if(thisQuestion.questions[j].options[k].correct){
                        if(passageQuestion.correct_option){
                            passageQuestion.correct_option=","+k;
                        }else{
                            passageQuestion.correct_option=k;
                        }
                    }
                }
                //publish this question
                self.postMessage(passageQuestion);
            }
        }else{
            tempQuestion.statement=thisQuestion.questionStatement;
            console.log('tempQuestion.statement: '+tempQuestion.statement);

            tempQuestion.options=[];
            console.log('thisQuestion.options: '+thisQuestion.options);
            console.log('thisQuestion.options.length: '+thisQuestion.options.length);
            for(var j=0; j<thisQuestion.options.length; j++){
                tempQuestion.options.push(thisQuestion.options[j].optionValue);
                if(thisQuestion.options[j].correct){
                    if(tempQuestion.correct_option){
                        tempQuestion.correct_option=","+j;
                    }else{
                        tempQuestion.correct_option=j;
                    }
                }
            }

            self.postMessage(tempQuestion);
        }

    });

}, false);

//simple XHR request in pure JavaScript
function load(url, callback) {
    var xhr;

    if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
    else {
        var versions = ["MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"]

        for(var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            }
            catch(e){}
        } // end for
    }

    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if(xhr.readyState < 4) {
            return;
        }

        if(xhr.status !== 200) {
            return;
        }

        // all is well
        if(xhr.readyState === 4) {
            callback(xhr);
        }
    }

    xhr.open('GET', url, true);
    xhr.send('');
}