window.addEventListener('DOMContentLoaded', () => {
  // ACTIVE? - check if this function is active
  const activeQuery = function(){
    return new Promise(function(resolve){
      var aRef = firebase.database().ref('Active').child('destinations')

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

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    var slideClass = document.getElementsByClassName("slidecontainer")[0];
    output.innerHTML = `${slider.value/10} m/s`;

    // FIREBASE REALTIME DATABASE BITS AND BOBS
    var database = firebase.database();
    var dbRef = firebase.database().ref('destinations');

    // FOYER
    button1.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "foyer" : true,
            "speed" : `${slider.value/10}`
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      slideClass.removeAttribute('hidden');
      slider.oninput = function() {
        pushData()
        output.innerHTML = `${slider.value/10} m/s`;
      }
    })

    // COMMON ROOM
    button2.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "common room" : true,
            "speed" : `${slider.value/10}`
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      slideClass.removeAttribute('hidden');
      slider.oninput = function() {
        pushData()
        output.innerHTML = `${slider.value/10} m/s`;
      }
    })

    // CAGB LOBBY
    button3.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "CAGB lobby" : true,
            "speed" : `${slider.value/10}`
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      slideClass.removeAttribute('hidden');
      slider.oninput = function() {
        pushData()
        output.innerHTML = `${slider.value/10} m/s`;
      }
    })

    // MENS BATHROOM
    button4.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "mens bathroom" : true,
            "speed" : `${slider.value/10}`
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      slideClass.removeAttribute('hidden');
      slider.oninput = function() {
        pushData()
        output.innerHTML = `${slider.value/10} m/s`;
      }
    })

    // LADIES BATHROOM
    button5.addEventListener('click', event => {
      function pushData(){
        return new Promise(function(resolve){
          var noRef = firebase.database().ref('destinations')

          noRef.set({
            "ladies bathroom" : true,
            "speed" : `${slider.value/10}`
          });

          var message = 'data sent to database'
          resolve(message)
        })
      }

      slideClass.removeAttribute('hidden');
      slider.oninput = function() {
        pushData()
        output.innerHTML = `${slider.value/10} m/s`;
      }
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
