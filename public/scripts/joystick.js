window.addEventListener('DOMContentLoaded', () => {

  // ACTIVE? - check if this function is active
  const activeQuery = function(){
    return new Promise(function(resolve){
      var aRef = firebase.database().ref('active').child('joystick')

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
      console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

      // MODAL BOX
      var modal1 = document.getElementById("Modal1");
      var modal2 = document.getElementById("Modal2");
      var modal3 = document.getElementById("Modal3");
      var GoHome = document.getElementById("GoHome");
      var GoHome2 = document.getElementById("GoHome2");
      var GoHome3 = document.getElementById("GoHome3");
      var Start = document.getElementById("Start");
  
      // GO HOME BUTTON
      GoHome.onclick = function(){
        location.href = 'index.html';
      }
  
      // START BUTTON
      Start.onclick = function(){
        modal1.style.display = "none"
        // RIGHT JOYSTICK
        var joystickR = new VirtualJoystick({
            container: left,
            strokeStyle: 'green',
            limitStickTravel: true,
            stickRadius: 50
        });
  
        joystickR.addEventListener('touchStartValidation', function (event) {
            var touch = event.changedTouches[0];
            if (touch.pageX > window.innerWidth / 2 & touch.pageY > 80) return true;
            return false
        });
      
        joystickR.addEventListener('touchStart', function () {
            console.log('fire right')
        })
      
        // LEFT JOYSTICK
        var joystickL = new VirtualJoystick({
            container: right,
            strokeStyle: 'purple',
            limitStickTravel: true,
            stickRadius: 50
        });
      
        joystickL.addEventListener('touchStartValidation', function (event) {
            var touch = event.changedTouches[0];
            if (touch.pageX <= window.innerWidth / 2 & touch.pageY > 80) return true;
            return false
        });
      
        joystickL.addEventListener('touchStart', function () {
            console.log('fire left')
        })
      
        // SET X and Y
        document.addEventListener("touchmove", function (e) {
            e.preventDefault();
        }, { passive: false });
      
        var dx = 0.00;
        var dy = 0.00;
        var left = "00.00";
        var right = "00.00";
  
        startAnimating(20)  //20 fps
  
        // FUNCTIONS:
        // FPS CONTROL
        var frameCount = 0;
        var fpsInterval, startTime, now, then, elapsed, i;
        function startAnimating(fps){
          fpsInterval = 1000 / fps;
          then = Date.now();
          startTime = then;
          console.log(`Start time: ${startTime}`);
  
          var pull
          // find position i near the end to go a bit faster
          const findPos = function(){
              return new Promise(function(resolve){
                var incoming
                var temp
                var key
                var endRef = firebase.database().ref('joystick').limitToLast(1)
  
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
                var cpRef = firebase.database().ref('joystick').child(hello).child('complete')
  
                cpRef.once('value', function(snapshot){
                  pull = snapshot.val();
                })
                .then(function(){
                  console.log(`pulling from queue position ${i}`)
                  resolve(pull)
                })
              })
          }
  
          //call promise sequence
          const loop = function(value){
              complete = pullData(value)
              .then(complete => {
                if (complete === null){
                  return loop(value + 1)
                } else if (complete === false){
                  joystickR.removeEventListener('touchStartValidation', function (event) {
                    var touch = event.changedTouches[0];
                    if (touch.pageX < window.innerWidth / 2 & touch.pageY > 80) return true;
                    return false
                  });
                  joystickL.removeEventListener('touchStartValidation', function (event) {
                    var touch = event.changedTouches[0];
                    if (touch.pageX >= window.innerWidth / 2 & touch.pageY > 80) return true;
                    return false
                  });
                  joystickR.addEventListener('touchStartValidation', function (event) {
                    return false;
                  });
                  joystickL.addEventListener('touchStartValidation', function (event) {
                    return false;
                  });

                  modal3.removeAttribute('hidden')

                  GoHome3.onclick = function(){
                    location.href = 'index.html';
                  }
                } else {
                  console.log(`queue position: ${value}`)
                  i = value;
                  var hello = `${i}`;
                  var noRef = firebase.database().ref('joystick').child(hello);
                  noRef.set({
                    "complete" : false
                  });
                  animate()
                }
              })
          }
  
          findPos()
          .then(function(value){
            return value
          })
          .then((value) => {
            return value
          })
          .then((value) => {
            loop(value)
          })
        }
  
        // ANIMATE FUNCTION
        function animate(){
          //stop if exceed 200 frames --> 10 seconds at 20 fps
          if(frameCount >= 200){
            joystickR.removeEventListener('touchStartValidation', function (event) {
              var touch = event.changedTouches[0];
              if (touch.pageX < window.innerWidth / 2 & touch.pageY > 80) return true;
              return false
            });
            joystickL.removeEventListener('touchStartValidation', function (event) {
              var touch = event.changedTouches[0];
              if (touch.pageX >= window.innerWidth / 2 & touch.pageY > 80) return true;
              return false
            });
            joystickR.addEventListener('touchStartValidation', function (event) {
              return false;
            });
            joystickL.addEventListener('touchStartValidation', function (event) {
              return false;
            });

            modal2.removeAttribute('hidden')
  
            GoHome2.onclick = function(){
              location.href = 'index.html';
            }
            return
          } else {
            requestAnimationFrame(animate); //request a frame
            now = Date.now();               //time now
            elapsed = now - then;           //elapsed time since last loop
  
            // if enough time has elapsed, draw the next frame
            if (elapsed > fpsInterval) {
              //Get ready for next frame by setting then=now, but also adjust for your
              //specified fpsInterval not being a multiple of RAF's interval (16.7ms)
              then = now - (elapsed % fpsInterval);
              frameCount = frameCount + 1;
  
              left = LJoystick();
              console.log(`left joystick: ${left}`)
  
              right = RJoystick();
              console.log(`right joystick: ${right}`)
  
              var data = left.concat(right);
              console.log(`i: ${i}, framecount: ${frameCount}`)
              pushData(i,frameCount)
  
              // FUNCTIONS:
              // LEFT JOYSTICK
              function LJoystick(){
                dx = joystickL.deltaX().toFixed(2);
                dy = -joystickL.deltaY().toFixed(2);
  
                if (dx < 0) {
                  dx = Math.abs(dx).toString().concat("1")
                } else {
                  dx = Math.abs(dx).toString().concat("0")
                }
                dx = String("000000" + dx).slice(-6);
  
                if (dy < 0) {
                  dy = Math.abs(dy).toString().concat("1")
                } else {
                  dy = Math.abs(dy).toString().concat("0")
                }
                dy = String("000000" + dy).slice(-6);
  
                return dx.concat(dy);
              }
  
              // RIGHT JOYSTICK
              function RJoystick(){
                dx = joystickR.deltaX().toFixed(2);
                dy = -joystickR.deltaY().toFixed(2);
  
                if (dx < 0) {
                  dx = Math.abs(dx).toString().concat("1")
                } else {
                  dx = Math.abs(dx).toString().concat("0")
                }
                dx = String("000000" + dx).slice(-6);
  
                if (dy < 0) {
                  dy = Math.abs(dy).toString().concat("1")
                } else {
                  dy = Math.abs(dy).toString().concat("0")
                }
                dy = String("000000" + dy).slice(-6);
  
                return dx.concat(dy);
              }
  
              // PUSH DATA
              function pushData(i,j){
                return new Promise(function(resolve){
                  var hello = `${i}`;
                  var smile = `${j}`;
                  var noRef = firebase.database().ref('joystick').child(hello);
                  noRef.update({
                    [smile] : data
                  });
                  var message = 'data sent to database'
                  resolve(message)
                })
              }
            }
  
          }
        }
      }
    } else {
      document.getElementById("left").style.display = "none"
      document.getElementById("right").style.display = "none"
      document.getElementById("Modal1").style.display = "none"

      document.getElementById("inactive").removeAttribute('hidden')
      return
    }
  })
})
  

  
// SIDE BAR
/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";

  // DISABLE JOYSTICK///////////////////////////
  joystickR.removeEventListener('touchStartValidation', function (event) {
    var touch = event.changedTouches[0];
    if (touch.pageX < window.innerWidth / 2 & touch.pageY > 80) return true;
    return false
  });

  joystickL.removeEventListener('touchStartValidation', function (event) {
    var touch = event.changedTouches[0];
    if (touch.pageX >= window.innerWidth / 2 & touch.pageY > 80) return true;
    return false
  });

  joystickR.addEventListener('touchStartValidation', function (event) {
    return false;
  });

  joystickL.addEventListener('touchStartValidation', function (event) {
    return false;
  });
  //////////////////////////////////////////////////
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";

  // ENABLE JOYSTICK ///////////////////////////////
  joystickR.removeEventListener('touchStartValidation', function (event) {
    return false;
  });

  joystickL.removeEventListener('touchStartValidation', function (event) {
    return false;
  });

  joystickR.addEventListener('touchStartValidation', function (event) {
    var touch = event.changedTouches[0];
    if (touch.pageX < window.innerWidth / 2 & touch.pageY > 80) return true;
    return false
  });

  joystickL.addEventListener('touchStartValidation', function (event) {
    var touch = event.changedTouches[0];
    if (touch.pageX >= window.innerWidth / 2 & touch.pageY > 80) return true;
    return false
  });
  //////////////////////////////////////////////////
}
