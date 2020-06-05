window.addEventListener('DOMContentLoaded', () => {
    // LINK BUTTONS ETC.
    const button1 = document.getElementById('button1')
    const button2 = document.getElementById('button2')
    const result = document.getElementById('result')
    const main = document.getElementsByTagName('main')[0]

    // FIREBASE REALTIME DATABASE BITS AND BOBS
    var database = firebase.database();
    var dbRef = firebase.database().ref('sounds');

    // SELECT TRACK 1
    button1.addEventListener('click', event => {
      var pull

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
          var hello = `${i}`;
          var cpRef = firebase.database().ref('sounds').child(hello).child('complete')

          cpRef.once('value', function(snapshot){
            pull = snapshot.val();
          })
          .then(function(){
            console.log(`pulling from queue position ${i}`)
            resolve(pull)
          })
        })
      }

      //function to increment queue (if needed - probs won't ever be more than once or twice) or push to update database
      const pushData = function(i){
        return new Promise(function(resolve){
          var hello = `${i}`;
          var noRef = firebase.database().ref('sounds').child(hello);
          noRef.set({
            "sound" : "Track 1",
            "complete" : false
          });
          var message = 'data sent to database'
          resolve(message)
        })
      }

      //call promise sequence
      const loop = function(value){
        complete = pullData(value)
        .then(complete => {
          if (complete != null){
            return loop(value + 1)
          } else {
            pushData(value).then(message => {
              console.log(message)
              console.log(`Queue position: ${value}`)
              return
            })
          }
        })
      }

      findPos()
        .then(function(value){
          console.log(`the resolved value is called key and has value ${value}`)
          return value
        })
        .then((value) => {
          console.log(`the resolved value is called pull and has value ${value}`)
          return value
        }).then((value) => {
          loop(value)
        })
    })

    // SELECT TRACK 2
    button2.addEventListener('click', event => {
      var pull

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
          var hello = `${i}`;
          var cpRef = firebase.database().ref('sounds').child(hello).child('complete')

          cpRef.once('value', function(snapshot){
            pull = snapshot.val();
          })
          .then(function(){
            console.log(`pulling from queue position ${i}`)
            resolve(pull)
          })
        })
      }

      //function to increment queue (if needed - probs won't ever be more than once or twice) or push to update database
      const pushData = function(i){
        return new Promise(function(resolve){
          var hello = `${i}`;
          var noRef = firebase.database().ref('sounds').child(hello);
          noRef.set({
            "sound" : "Track 2",
            "complete" : false
          });
          var message = 'data sent to database'
          resolve(message)
        })
      }

      //call promise sequence
      const loop = function(value){
        complete = pullData(value)
        .then(complete => {
          if (complete != null){
            return loop(value + 1)
          } else {
            pushData(value).then(message => {
              console.log(message)
              console.log(`Queue position: ${value}`)
              return
            })
          }
        })
      }

      findPos()
        .then(function(value){
          console.log(`the resolved value is called key and has value ${value}`)
          return value
        })
        .then((value) => {
          console.log(`the resolved value is called pull and has value ${value}`)
          return value
        }).then((value) => {
          loop(value)
        })
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