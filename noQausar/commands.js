window.addEventListener('DOMContentLoaded', () => {
    //link buttons etc.
    const button = document.getElementById('button')
    const result = document.getElementById('result')
    const main = document.getElementsByTagName('main')[0]
    let listening = false

    // CHROME SUPPORT
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

    // GRAMMAR - define grammar the app should recognise
    // grammar format used is JSpeech Grammar Format (JSGF) - https://www.w3.org/TR/jsgf/
    var keywords = ['doughnut', 'square', 'triangle'];
    var grammar = '#JSGF V1.0; grammar keywords; public <keywords> = ' + keywords.join(' | ') + ' ;'

    // DEFINE SPEECH RECOGNITION INSTANCE (or display that browser in not compatible)
    if (typeof SpeechRecognition !== 'undefined') {
      const recognition = new SpeechRecognition()             //new instance
      var speechRecognitionList = new SpeechGrammarList();    //new grammar list to contain grammar
      speechRecognitionList.addFromString(grammar, 1);        //add grammar - optional weight value from 0 to 1

      recognition.grammars = speechRecognitionList;   //add speech grammar list
      recognition.continuous = false;                 //determines if continuous results are captured or not
      recognition.lang = 'en-US';                     //set language - good practice
      recognition.interimResults = false;             //determines if interim results should be returned or just final
      recognition.maxAlternatives = 1;                //sets number of alternative potential matches that should be returned per result

      const stop = () => {
        main.classList.remove('speaking')
        recognition.stop()
        button.textContent = 'Start listening'
      }
  
      const start = () => {
        main.classList.add('speaking')
        recognition.start()
        button.textContent = 'Stop listening'
      }
  
      const onResult = event => {
        result.innerHTML = ''
        for (const res of event.results) {
          const text = document.createTextNode(res[0].transcript)
          const p = document.createElement('p')
          if (res.isFinal) {
            p.classList.add('final')
          }
          p.appendChild(text)
          result.appendChild(p)
        }
      }
      recognition.continuous = true
      recognition.interimResults = true
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
  