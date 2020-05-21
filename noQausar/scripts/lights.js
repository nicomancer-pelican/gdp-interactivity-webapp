window.addEventListener('DOMContentLoaded', () => {
    //link buttons etc.
    const button = document.getElementById('button')
    const result = document.getElementById('result')
    const main = document.getElementsByTagName('main')[0]
    let listening = false

    // CHROME SUPPORT
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    // GRAMMAR - define grammar the app should recognise
    // grammar format used is JSpeech Grammar Format (JSGF) - https://www.w3.org/TR/jsgf/
    var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'blue', 'brown', 'chocolate', 'coral' ];
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

    // define speech recognition instance
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();    //new grammar list to contain grammar
    speechRecognitionList.addFromString(grammar, 1);        //add grammar - optional weight value from 0 to 1

    recognition.grammars = speechRecognitionList;   //add speech grammar list
    recognition.continuous = false;                 //determines if continuous results are captured or not
    recognition.lang = 'en-US';                     //set language - good practice
    recognition.interimResults = false;             //determines if interim results should be returned or just final
    recognition.maxAlternatives = 1;                //sets number of alternative potential matches that should be returned per result


    // SPEECH RECOGNITION - check this bit aka the important bit...
    var diagnostic = document.querySelector('.output');
    var bg = document.querySelector('html');
    var hints = document.querySelector('.hints');

    var colorHTML= '';
    colors.forEach(function(v, i, a){
    console.log(v, i);
    colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
    });
    hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

    document.main.onclick = function() {
    recognition.start();
    console.log('Ready to receive a color command.');
    }


    // RECIEVING RESULTS - fired once a successful result is received
    recognition.onresult = function(event) {
        var color = event.results[0][0].transcript;
        diagnostic.textContent = 'Result received: ' + color + '.';
        bg.style.backgroundColor = color;
        console.log('Confidence: ' + event.results[0][0].confidence);
    }

    // handler to stop the service from running once a word has been recognised and finished being spoken
    recognition.onspeechend = function() {
        recognition.stop();
    }


    //ERROR HANDLING
    // speech not in defined grammar or an error occured - mozilla says this doesn't work that well
    recognition.onnomatch = function(event) {
        diagnostic.textContent = 'I didnt recognise that color.';
    }

    // actual error with the recognisation
    recognition.onerror = function(event) {
        diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    }
});
        

    
    // SIDE BAR
    /* Set the width of the sidebar to 250px (show it) */
    function openNav() {
        document.getElementById("mySidepanel").style.width = "250px";
    }
    
    /* Set the width of the sidebar to 0 (hide it) */
    function closeNav() {
        document.getElementById("mySidepanel").style.width = "0";
    }