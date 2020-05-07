var firebaseConfig = {
  apiKey: "AIzaSyBudIMeTFdzQ1HNSTOrGCfr3WnTa2y-Ij8",
  authDomain: "medtortest.firebaseapp.com",
  databaseURL: "https://medtortest.firebaseio.com",
  projectId: "medtortest",
  storageBucket: "medtortest.appspot.com",
  messagingSenderId: "423809348674",
  appId: "1:423809348674:web:0e1a0f78ffb4db0e59a9db",
  measurementId: "G-R464GQH3TF"
};
firebase.initializeApp(firebaseConfig);

var databaseRef = firebase.database().ref();
var functions = firebase.functions();

var upperLogInBtn = document.getElementById('upperLogIn');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Mentor") {
      window.location.href = "medtorAuthPass.html";
    }
    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    sortList("futureprof1Input");
    sortList("futureprof2Input");
    sortList("gapyear1Input");
    sortList("gapyear2Input");
    sortList("research1Input");
    sortList("research2Input");
    sortList("volunteer1Input");
    sortList("volunteer2Input");


  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});


var research1 = document.getElementById('research1Input');
var research2 = document.getElementById("research2Input");
var volunteer1 = document.getElementById('volunteer1Input');
var volunteer2 = document.getElementById("volunteer2Input");
var gap1 = document.getElementById('gapyear1Input');
var gap2 = document.getElementById("gapyear2Input");
var future1 = document.getElementById('futureprof1Input');
var future2 = document.getElementById("futureprof2Input");


var originalFontSize = research1.style.fontSize;

function changeColor(e, obj) {
  e = e || window.event;
  e.preventDefault();
  console.log("here");
  if (obj.value != "none") {
    obj.style.color = "black";
    obj.style.fontSize = "16px";
  }
  else {
    obj.style.color = "rgb(169, 169, 169, 80.0)"
    obj.style.fontSize = originalFontSize;
  }
}

research1.addEventListener('change', e => {
  changeColor(e, research1);
})
research2.addEventListener('change', e => {
  changeColor(e, research2);
})

volunteer1.addEventListener('change', e => {
  changeColor(e, volunteer1);
})
volunteer2.addEventListener('change', e => {
  changeColor(e, volunteer2);
})
gap1.addEventListener('change', e => {
  changeColor(e, gap1);
})
gap2.addEventListener('change', e => {
  changeColor(e, gap2);
})
future1.addEventListener('change', e => {
  changeColor(e, future1);
})
future2.addEventListener('change', e => {
  changeColor(e, future2);
})

function sortList(id) {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(id);
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("OPTION");
    // Loop through all list items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /* If next item is alphabetically lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}


function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
}
