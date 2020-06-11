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
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "foyer" : true
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      pushData()
    })

    // COMMON ROOM
    button2.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "common room" : true
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      pushData()
    })

    // CAGB LOBBY
    button3.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "CAGB lobby" : true
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      pushData()
    })

    // MENS BATHROOM
    button4.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "mens bathroom" : true
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      pushData()
    })

    // LADIES BATHROOM
    button5.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "ladies bathroom" : true
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      pushData()
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
