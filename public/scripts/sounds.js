window.addEventListener('DOMContentLoaded', () => {
    // LINK BUTTONS ETC.
    const button = document.getElementById('button')
    const confirm = document.getElementById('confirm')
    const result = document.getElementById('result')
    const main = document.getElementsByTagName('main')[0]

    // FIREBASE REALTIME DATABASE BITS AND BOBS
    var database = firebase.database();
    var dbRef = firebase.database().ref('sounds');

    // SELECT TRACK
    button1.addEventListener('click', event => {
      var commandListRef = firebase.database().ref(dbRef)
      var newCommandRef = commandListRef.push();
        newCommandRef.set({
          'track' : 'T1'
        })
        setTimeout(function () {
            window.location.reload();
        },1000)
    }),

    button2.addEventListener('click', event => {
        var commandListRef = firebase.database().ref(dbRef)
        var newCommandRef = commandListRef.push();
          newCommandRef.set({
            'track' : 'T2'
          })
          setTimeout(function () {
              window.location.reload();
          },1000)
      }),

      button3.addEventListener('click', event => {
        var commandListRef = firebase.database().ref(dbRef)
        var newCommandRef = commandListRef.push();
          newCommandRef.set({
            'track' : 'T3'
          })
          setTimeout(function () {
              window.location.reload();
          },1000)
      }),

      button4.addEventListener('click', event => {
        var commandListRef = firebase.database().ref(dbRef)
        var newCommandRef = commandListRef.push();
          newCommandRef.set({
            'track' : 'T4'
          })
          setTimeout(function () {
              window.location.reload();
          },1000)
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