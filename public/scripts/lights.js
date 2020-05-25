window.addEventListener('DOMContentLoaded', () => {
    //link buttons etc.
    const button = document.getElementById('button')
    const confirm = document.getElementById('confirm')
    const result = document.getElementById('result')
    const main = document.getElementsByTagName('main')[0]

    // CHROME SUPPORT
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

    // FIREBASE REALTIME DATABASE BITS AND BOBS
    var database = firebase.database();
    var dbRef = firebase.database().ref('lights');

    // GRAMMAR - define grammar the app should recognise
    // grammar format used is JSpeech Grammar Format (JSGF) - https://www.w3.org/TR/jsgf/
    var keywords = ['doughnut', 'square', 'triangle'];
    var grammar = '#JSGF V1.0; grammar keywords; public <keywords> = ' + keywords.join(' | ') + ' ;'

    // DEFINE SPEECH RECOGNITION INSTANCE (or display that browser in not compatible)
    if (typeof SpeechRecognition !== 'undefined') {
      let listening = false;                                  //currently not listening for speech
      const recognition = new SpeechRecognition()             //new instance

      var speechRecognitionList = new SpeechGrammarList();    //new grammar list to contain grammar
      speechRecognitionList.addFromString(grammar, 1);        //add grammar - optional weight value from 0 to 1

      recognition.continuous = false                  //determines if continous results are captured or not
      recognition.interimResults = false              //determines if interim results should be returned or just final
      recognition.grammars = speechRecognitionList;   //add speech grammar list
      recognition.lang = 'en-US';                     //set language - good practice
      recognition.maxAlternatives = 1;                //sets number of alternative potential matches that should be returned per result

      //function to start SpeechRecognition
      const start = () => {
        console.log('listening')
        recognition.start()                     //start the speech recogniser
        button.textContent = 'Stop listening'   //change button text
      }

      //function to end SpeechRecognition
      const stop = () => {
        console.log('not listening')
        recognition.stop()                      //stop the speech recogniser
        button.textContent = 'Start listening'  //change button text
      }

      //function to respond to  SpeechRecognition results
      const onResult = event => {
        console.log('recieved')
        result.innerHTML = ''
        button.textContent = 'click to retry'
        confirm.removeAttribute('hidden')
        var text = event.results[0][0].transcript;
        result.textContent = 'Result received: ' + text + '.';

        console.log('Confidence: ' + event.results[0][0].confidence);

        //add to database if confirm button clicked
        confirm.addEventListener('click', event => {
          console.log('confirmed')

          var commandListRef = firebase.database().ref(dbRef)
          var newCommandRef = commandListRef.push();
          newCommandRef.set({
            'colour' : text
          })

          confirm.setAttribute('hidden', true)
        })
      }

      //what to execute
      recognition.addEventListener('result', onResult)
      button.addEventListener('click', event => {
        listening ? stop() : start()
        listening = !listening
      })
    } else {
      button.remove()
      const message = document.getElementById('message')
      message.removeAttribute('hidden')
      message.setAttribute('aria-hidden', 'false')
    }
  })
  

  
  // SIDE BAR
  /* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}