window.addEventListener('DOMContentLoaded', () => {
    // LINK BUTTONS ETC.
    const button = document.getElementById('button')
    const main = document.getElementsByTagName('main')[0]

    // FIREBASE REALTIME DATABASE BITS AND BOBS
    var database = firebase.database();
    var dbRef = firebase.database().ref('reports');

    // SEND REPORT
    button.addEventListener('click', event => {
      var commandListRef = firebase.database().ref(dbRef)
      var newCommandRef = commandListRef.push();

      var text = document.getElementById('input').value;

      newCommandRef.set({
        'problem' : text
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