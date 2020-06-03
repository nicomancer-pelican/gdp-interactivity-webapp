window.addEventListener('DOMContentLoaded', () => {
    // LINK BUTTONS ETC.
    const button = document.getElementById('button')
    const confirm = document.getElementById('confirm')
    const result = document.getElementById('result')
    const main = document.getElementsByTagName('main')[0]

    // CHROME SUPPORT - note: specific grammars currently not supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

    // FIREBASE REALTIME DATABASE BITS AND BOBS
    var database = firebase.database();
    var dbRef = firebase.database().ref();
    var cmRef = firebase.database().ref('commands');

    // GRAMMAR - define grammar the app should recognise (currently not supported)
    // grammar format used is JSpeech Grammar Format (JSGF) - https://www.w3.org/TR/jsgf/
    var keywords = ['doughnut' , 'square' , 'triangle', 'figure of eight'];
    var grammar = '#JSGF V1.0; grammar keywords; public <keywords> = ' + keywords.join(' | ') + ' ;'

    // DEFINE SPEECH RECOGNITION INSTANCE (or display that browser in not compatible)
    if (typeof SpeechRecognition !== 'undefined') {
      let listening = false;                                  //currently not listening for speech
      const recognition = new SpeechRecognition()             //new instance

      var speechRecognitionList = new SpeechGrammarList();    //new grammar list to contain grammar
      speechRecognitionList.addFromString(grammar, 1);        //add grammar - optional weight value from 0 to 1

      recognition.continuous = false                          //determines if continous results are captured or not
      recognition.interimResults = false                      //determines if interim results should be returned or just final
      recognition.grammars = speechRecognitionList;           //add speech grammar list
      recognition.lang = 'en-GB';                             //set language - good practice
      recognition.maxAlternatives = 1;                        //sets number of alternative potential matches that should be returned per result

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

        //click to retry button
        button.addEventListener('click', event => {
          confirm.setAttribute('hidden','true')
          result.textContent = ''
        })

        //add to database if confirm button clicked
        confirm.addEventListener('click', event => {
          var pull

          // pull data i
          var pullData = i => new Promise(
            function(resolve){
              var hello = `${i}`;
              var cpRef = firebase.database().ref('commands').child(hello).child('complete')
              cpRef.once('value', function(snapshot){
                pull = snapshot.val();
              })
              .then(function(){
                console.log(`pulling from queue position ${i}`)
                resolve(pull)
              })
            }
          )

          //function to increment queue or push to update database
          var pushData = function(i){
            var hello = `${i}`;
            var noRef = firebase.database().ref('commands').child(hello);
            noRef.set({
              "manoeuvre" : text,
              "complete" : false
            });
            var message = 'data sent to database'
            return Promise.resolve(message);
          }

          //function to call promise
          var updateData = function(i){
            pullData(i)
            //.then(checkNull)
            //.then(queue)
            .then(function (fulfilled){
              console.log(fulfilled);
            })
          }

          //updateData();

          //call promise
          const loop = function(value){
            pullData(value).then(complete => {
              if (complete != null){
                console.log(`value of complete: ${complete}`)
                return loop(value + 1)
              } else {
                console.log(`value of complete: ${complete}`)
                pushData(value).then(message => {
                  console.log(message)
                  window.location.reload();
                })
              }
            })
          }

          loop(1);

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