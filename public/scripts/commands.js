window.addEventListener('DOMContentLoaded', () => {
  // ACTIVE? - check if this function is active
  const activeQuery = function(){
    return new Promise(function(resolve){
      var aRef = firebase.database().ref('active').child('voice')

      aRef.once('value', function(snapshot){
        pull = snapshot.val();
      })
      .then(function(){
        console.log(`active: ${pull}`)
        resolve(pull)
      })
    })
  }

  activeQuery()
  .then((value) => {
    if(value === true){
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
        const recognition = new SpeechRecognition()             //new instance
  
        var speechRecognitionList = new SpeechGrammarList();    //new grammar list to contain grammar
        speechRecognitionList.addFromString(grammar, 1);        //add grammar - optional weight value from 0 to 1
  
        recognition.continuous = false                          //determines if continous results are captured or not
        recognition.interimResults = false                      //determines if interim results should be returned or just final
        recognition.grammars = speechRecognitionList;           //add speech grammar list
        recognition.lang = 'en-GB';                             //set language - good practice
        recognition.maxAlternatives = 1;                        //sets number of alternative potential matches that should be returned per result
  
  
  
        // START LISTENING - function to start SpeechRecognition
        const start = () => {
          console.log('listening')
          recognition.start()                     //start the speech recogniser
          button.textContent = 'Stop listening'   //change button text
        }
  
        // STOP LISTENING - function to end SpeechRecognition
        const stop = () => {
          console.log('not listening')
          recognition.stop()                      //stop the speech recogniser
          button.textContent = 'Start listening'  //change button text
        }
  
        // CLICK TO RETRY
        const retry = () => {
          stop()                                  //run stop function
          confirm.setAttribute('hidden','true')   //hide confirm button
          result.textContent = ''                 //remove "result received: ..." text
          window.location.reload();               //reload window - work around for the multiple event listeners of recognition being created for some reason
        }
        
        // RESULT - function for when result is received
        const onResult = event => {
          console.log('recieved')
          button.textContent = 'click to retry'
          console.log('Confidence: ' + event.results[0][0].confidence);
  
          // function to set the value of the variable 'text' to be the voice input
          const setText = function(){
            var text = event.results[0][0].transcript;
            confirm.removeAttribute('hidden')
            result.textContent = 'Result received: ' + text + '.';
            return text
          }
          var text = setText()
  
          // add to database if confirm button clicked
          confirm.addEventListener('click', event => {
            var pull  //variable to contain data pulled from the database
  
            // find position i near the end to go a bit faster
            const findPos = function(){
              return new Promise(function(resolve){
                var incoming
                var temp
                var key
                var endRef = firebase.database().ref('commands').limitToLast(1)
  
                endRef.once('value', function(snapshot){
                  incoming = snapshot.val();
                })
                .then(function(){
                  temp = Object.keys(incoming)
                  key = parseInt(temp[0])
                  console.log(`key retrieved: ${key}`)
                  resolve(key)
                })
              })
            }
  
            // pull data from position i
            const pullData = function(i){
              return new Promise(function(resolve){
                var queue = `${i}`; //current position in the database (equal to the value of the key)
                var cpRef = firebase.database().ref('commands').child(queue).child('complete')
  
                cpRef.once('value', function(snapshot){
                  pull = snapshot.val();
                })
                .then(function(){
                  console.log(`pulling from queue position ${i}`)
                  resolve(pull)
                })
              })
            }
  
            // function to increment queue (if needed - probs won't ever be more than once or twice) or push to update database
            const pushData = function(i){
              return new Promise(function(resolve){
                var queue = `${i}`;
                var noRef = firebase.database().ref('commands').child(queue);
                noRef.set({
                  "manoeuvre" : text,
                  "complete" : false
                });
                var message = 'data sent to database'
                resolve(message)
              })
            }
  
            // call promise sequence
            const loop = function(value){
              complete = pullData(value)  //complete is the value of the 'complete' key so either true, false or null
              .then(complete => {
                if (complete != null){
                  return loop(value + 1)
                } else {
                  pushData(value).then(message => {
                    console.log(message)
                    console.log(`Queue position: ${value}`)
                    confirm.setAttribute('hidden','true')
                    result.textContent = `Key value: ${value}`
                    return
                  })
                }
              })
            }
  
            // run promises
            findPos()
              .then(function(value){
                return value
              })
              .then((value) => {
                return value
              }).then((value) => {
                loop(value)
              })
          })
        }
  
        //recognition even listener - it's a right pain and won't end properly hence the window reload when retry is clicked
        recognition.addEventListener('result', onResult, false)
  
        // start and stop listening button
        button.addEventListener('click', event => {
          if(button.textContent === 'Start listening'){
            start()
          } else if(button.textContent === 'Stop listening'){
            stop()
          } else {
            retry()
          }
        })
      } else {
        button.remove()
        const message = document.getElementById('message')
        message.removeAttribute('hidden')
        message.setAttribute('aria-hidden', 'false')
      }
    } else {
      document.getElementById("instruction").style.display = "none"
      document.getElementById("button").style.display = "none"
      document.getElementById("result").style.display = "none"

      document.getElementById("inactive").removeAttribute('hidden')
    }
  })


  
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