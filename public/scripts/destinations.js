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
        const main = document.getElementsByTagName('main')[0]
    
        // FIREBASE REALTIME DATABASE BITS AND BOBS
        var database = firebase.database();
        var dbRef = firebase.database().ref();
        var cmRef = firebase.database().ref('commands');

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