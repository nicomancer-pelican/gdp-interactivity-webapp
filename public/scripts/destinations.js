window.addEventListener('DOMContentLoaded', () => {
  // ACTIVE? - check if this function is active
  const activeQuery = function(){
    return new Promise(function(resolve){
      var aRef = firebase.database().ref('active').child('destinations')

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
    const button1 = document.getElementById('button1')
    const button2 = document.getElementById('button2')
    const button3 = document.getElementById('button3')
    const button4 = document.getElementById('button4')
    const button5 = document.getElementById('button5')
    const result = document.getElementById('result')
    const main = document.getElementsByTagName('main')[0]

    // FIREBASE REALTIME DATABASE BITS AND BOBS
    var database = firebase.database();
    var dbRef = firebase.database().ref('destinations');

    // FOYER
    button1.addEventListener('click', event => {
      var pull

      // find position i near the end to go a bit faster
      const findPos = function(){
        return new Promise(function(resolve){
          var incoming
          var temp
          var key
          var endRef = firebase.database().ref('destinations').limitToLast(1)

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
          var cpRef = firebase.database().ref('destinations').child(hello).child('complete')

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
          var noRef = firebase.database().ref('destinations').child(hello);

          noRef.set({
            "destination" : "foyer",
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
        return value
      })
      .then((value) => {
        return value
      }).then((value) => {
        loop(value)
      })
    
    })

    // COMMON ROOM
    button2.addEventListener('click', event => {
      var pull

      // find position i near the end to go a bit faster
      const findPos = function(){
        return new Promise(function(resolve){
          var incoming
          var temp
          var key
          var endRef = firebase.database().ref('destinations').limitToLast(1)

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
          var cpRef = firebase.database().ref('destinations').child(hello).child('complete')

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
          var noRef = firebase.database().ref('destinations').child(hello);

          noRef.set({
            "destination" : "common room",
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
        return value
      })
      .then((value) => {
        return value
      }).then((value) => {
        loop(value)
      })
    
    })

    // CAGB LOBBY
    button3.addEventListener('click', event => {
      var pull

      // find position i near the end to go a bit faster
      const findPos = function(){
        return new Promise(function(resolve){
          var incoming
          var temp
          var key
          var endRef = firebase.database().ref('destinations').limitToLast(1)

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
          var cpRef = firebase.database().ref('destinations').child(hello).child('complete')

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
          var noRef = firebase.database().ref('destinations').child(hello);

          noRef.set({
            "destination" : "CAGB lobby",
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
        return value
      })
      .then((value) => {
        return value
      }).then((value) => {
        loop(value)
      })
    
    })

    // MENS BATHROOM
    button4.addEventListener('click', event => {
      var pull

      // find position i near the end to go a bit faster
      const findPos = function(){
        return new Promise(function(resolve){
          var incoming
          var temp
          var key
          var endRef = firebase.database().ref('destinations').limitToLast(1)

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
          var cpRef = firebase.database().ref('destinations').child(hello).child('complete')

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
          var noRef = firebase.database().ref('destinations').child(hello);

          noRef.set({
            "destination" : "mens bathroom",
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
        return value
      })
      .then((value) => {
        return value
      }).then((value) => {
        loop(value)
      })
    
    })

    // LADIES BATHROOM
    button5.addEventListener('click', event => {
      var pull

      // find position i near the end to go a bit faster
      const findPos = function(){
        return new Promise(function(resolve){
          var incoming
          var temp
          var key
          var endRef = firebase.database().ref('destinations').limitToLast(1)

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
          var cpRef = firebase.database().ref('destinations').child(hello).child('complete')

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
          var noRef = firebase.database().ref('destinations').child(hello);

          noRef.set({
            "destination" : "ladies bathroom",
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
        return value
      })
      .then((value) => {
        return value
      }).then((value) => {
        loop(value)
      })
    
    })
    } else {
    document.getElementById("button1").style.display = "none"
    document.getElementById("button2").style.display = "none"
    document.getElementById("button3").style.display = "none"
    document.getElementById("button4").style.display = "none"
    document.getElementById("button5").style.display = "none"
    document.getElementById("instruction").style.display = "none"

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
