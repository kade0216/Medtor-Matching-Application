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

var genderLabel = document.getElementById("gendLabel");
var homeLabel = document.getElementById("homeL");
var hob1Label = document.getElementById("hob1L");
var hob2Label = document.getElementById("hob2L");
var hob3Label = document.getElementById("hob3L");

var homeStateIn = document.getElementById('homeStateInput');
var genderIn = document.getElementById("gend");
var hobbyIn1 = document.getElementById("hobby1");
var hobbyIn2 = document.getElementById("hobby2");
var hobbyIn3 = document.getElementById("hobby3");

var hobbyIn2Other = document.getElementById("other2In");
var hobbyIn3Other = document.getElementById("other3In");
var originalFontSize = homeStateIn.style.fontSize;

var theUserRN = null;
var formState = null;

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

if (iOS){
  var one = document.getElementById("labeler");
  one.style.left = "-3px";
  one.style.bottom = "0px";
  var two = document.getElementById("labeler1");
  two.style.left = "-3px";
  two.style.bottom = "0px";
  var three = document.getElementById("labeler2");
  three.style.left = "-3px";
  three.style.bottom = "0px";
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      //console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Student") {
      window.location.href = "medtorAuthStud.html";
    }

    if (localStorage.getItem("currUser") === null){
      logOut(event);
    }
    else {
      theUserRN = JSON.parse(localStorage["currUser"]);
      formState = theUserRN["formState"];
      if (formState >= 1){
        fillFields();
      }
      else if (formState < 0) {
        window.location.href = "medtorMentorForm1.html";
      }
    }

    //user signed in
    //console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };
    // helloWorld();

    //sorts hobby lists alphabetically
    sortList("hobby1");
    sortList("hobby2");
    sortList("hobby3");


  } else {
    //user not signed in
    //console.log("here2");
    window.location.href = "medtorHome.html";
  }
});

//occurs when nextButton is pressed, first checks to make sure fields are inputted properly
//then adds data to user database in firebase.
function goNext(e) {
  e = e || window.event;
  e.preventDefault();

  var user = firebase.auth().currentUser;

  var firstNameIn = document.getElementById('fNameInput').value;
  var lastNameIn = document.getElementById('lNameInput').value;
  var phoneIn = document.getElementById('phoneNumInput').value;
  var stateIn = homeStateIn.value;
  var gendIn = genderIn.value;
  var hobIn1 = hobbyIn1.value;
  var hobIn2 = hobbyIn2.value;
  var hobIn3 = hobbyIn3.value;

  if (checkFields(firstNameIn, lastNameIn, phoneIn, stateIn, gendIn, hobIn1, hobIn2, hobIn3)) {
    if (user.emailVerified == true) {
      theUserRN.firstName = firstNameIn;
      theUserRN.lastName = lastNameIn;
      theUserRN.phone = phoneIn;
      theUserRN.homeState = stateIn;
      theUserRN.gender = gendIn;
      theUserRN.hobby1 = hobIn1;
      theUserRN.hobby2 = hobIn2;
      theUserRN.hobby3 = hobIn3;
      if (hobIn2 == "Other") {
        theUserRN.hobby2other = hobbyIn2Other.value;
      }
      if (hobIn3 == "Other") {
        theUserRN.hobby3other = hobbyIn3Other.value;
      }

      if (formState < 1){
        theUserRN.formState = 1;
      }
      localStorage.setItem("currUser", JSON.stringify(theUserRN));

      theCurrUser = databaseRef.child("mentorUsers").child(user.uid);
      theCurrUser.update(theUserRN).then(function() {
        //new code
        //console.log("entered new data");
        window.location.href = "medtorMentorForm2.html";
        // var returnedPerson = firebase.functions().httpsCallable('findMatches');
        // returnedPerson( {text: " "}).then(function(result){
        //   theObject = result;
        //   //console.log(theObject);
        //});

      });
    }
    else {
      window.alert("You're email has not been verified")
    }

  }
}


//checks all input fields to make sure they are of proper format and are filled in
function checkFields(first, last, phone, hState, gen, hob1, hob2, hob3) {
  var firstFormat = new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i);
  var lastFormat = new RegExp(/^[a-z ,.'-]+$/i);
  if (first.match(lastFormat) && last.match(lastFormat) && hState != "none" && gen != "none" && hob1 != "none" && hob2 != "none") {
    // if (phone[0] != "(" && phone.length == 10) {
    //   return true;
    // }
    // else if (phone[0] == "(" && phone.length == 13) {
    //   return true;
    // }
    // else {
    //   window.alert("Please input a proper phone number");
    //   return false;
    // }
    if (hob2 == "Other" && (hobbyIn2Other.value == null || hobbyIn2Other.value == "")) {
      window.alert("Incomplete: Please fill in the field for your other hobby");
      return false;
    }
    if (hob3 == "Other" && (hobbyIn3Other.value == null || hobbyIn3Other.value == "")) {
      window.alert("Incomplete: Please fill in the field for your other hobby");
      return false;
    }
    return true;
  }
  else {
    window.alert("Incomplete: Fill in all fields with proper inputs");
    return false;
  }
}

function changeColor(e, obj, labeler) {
  e = e || window.event;
  e.preventDefault();
  ////console.log("here");
  if (obj.value != "none") {
    // //console.log(obj.value);
    obj.style.color = "black";
    obj.style.fontSize = "16px";
    labeler.style.display = "block";
    if (obj.id == "hobby2" || obj.id == "hobby3") {
      var elem = "" + obj.id + "other";
      if (obj.value != "Other") {
        document.getElementById(elem).style.display = "none";
      }
      else {
        document.getElementById(elem).style.display = "flex";
      }
    }
  }
  else {
    obj.style.color = "rgb(169, 169, 169, 80.0)"
    obj.style.fontSize = originalFontSize;
    labeler.style.display = "none";
    if (obj.id == "hobby2" || obj.id == "hobby3") {
      var elem = "" + obj.id + "other";
      if (obj.value != "Other") {
        document.getElementById(elem).style.display = "none";
      }
      else {
        document.getElementById(elem).style.display = "flex";
      }
    }
  }
}

homeStateIn.addEventListener('change', e => {
  changeColor(e, homeStateIn, homeLabel);
})
genderIn.addEventListener('change', e => {
  changeColor(e, genderIn, genderLabel);
})
hobbyIn1.addEventListener('change', e => {
  changeColor(e, hobbyIn1, hob1Label);
})
hobbyIn2.addEventListener('change', e => {
  changeColor(e, hobbyIn2, hob2Label);
})
hobbyIn3.addEventListener('change', e => {
  changeColor(e, hobbyIn3, hob3Label);
})


function sortList(id) {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(id);
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("OPTION");
    for (i = 1; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}


function fillFields() {
  var eventer = new Event('change');

  document.getElementById('fNameInput').value = theUserRN["firstName"];
  document.getElementById('lNameInput').value = theUserRN["lastName"];
  document.getElementById('phoneNumInput').value = theUserRN["phone"];
  homeStateIn.value = theUserRN["homeState"];
  genderIn.value = theUserRN["gender"];
  hobbyIn1.value = theUserRN["hobby1"];
  hobbyIn2.value = theUserRN["hobby2"];
  hobbyIn3.value = theUserRN["hobby3"];
  if (hobbyIn2.value == "Other") {
    hobbyIn2Other.value = theUserRN["hobby2other"];
  }
  if (hobbyIn3.value == "Other") {
    hobbyIn3Other.value = theUserRN["hobby3other"];
  }

  changeColor(eventer, homeStateIn, homeLabel);
  changeColor(eventer, genderIn, genderLabel);
  changeColor(eventer, hobbyIn1, hob1Label);
  changeColor(eventer, hobbyIn2, hob2Label);
  changeColor(eventer, hobbyIn3, hob3Label);
}




function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  localStorage.clear();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
}

var zChar = new Array(' ', '(', ')', '-', '.');
var maxphonelength = 13;
var phonevalue1;
var phonevalue2;
var cursorposition;

function ParseForNumber1(object) {
    phonevalue1 = ParseChar(object.value, zChar);
}

function ParseForNumber2(object) {
    phonevalue2 = ParseChar(object.value, zChar);
}

function backspacerUP(object, e) {
    if (e) {
        e = e
    } else {
        e = window.event
    }
    if (e.which) {
        var keycode = e.which
    } else {
        var keycode = e.keyCode
    }

    ParseForNumber1(object)

    if (keycode >= 48) {
        ValidatePhone(object)
    }
}

function backspacerDOWN(object, e) {
    if (e) {
        e = e
    } else {
        e = window.event
    }
    if (e.which) {
        var keycode = e.which
    } else {
        var keycode = e.keyCode
    }
    ParseForNumber2(object)
}

function GetCursorPosition() {

    var t1 = phonevalue1;
    var t2 = phonevalue2;
    var bool = false
    for (i = 0; i < t1.length; i++) {
        if (t1.substring(i, 1) != t2.substring(i, 1)) {
            if (!bool) {
                cursorposition = i
                bool = true
            }
        }
    }
}

function ValidatePhone(object) {

    var p = phonevalue1

    p = p.replace(/[^\d]*/gi, "")

    if (p.length < 3) {
        object.value = p
    } else if (p.length == 3) {
        pp = p;
        d4 = p.indexOf('(')
        d5 = p.indexOf(')')
        if (d4 == -1) {
            pp = "(" + pp;
        }
        if (d5 == -1) {
            pp = pp + ")";
        }
        object.value = pp;
    } else if (p.length > 3 && p.length < 7) {
        p = "(" + p;
        l30 = p.length;
        p30 = p.substring(0, 4);
        p30 = p30 + ")"

        p31 = p.substring(4, l30);
        pp = p30 + p31;

        object.value = pp;

    } else if (p.length >= 7) {
        p = "(" + p;
        l30 = p.length;
        p30 = p.substring(0, 4);
        p30 = p30 + ")"

        p31 = p.substring(4, l30);
        pp = p30 + p31;

        l40 = pp.length;
        p40 = pp.substring(0, 8);
        p40 = p40 + "-"

        p41 = pp.substring(8, l40);
        ppp = p40 + p41;

        object.value = ppp.substring(0, maxphonelength);
    }

    GetCursorPosition()

    if (cursorposition >= 0) {
        if (cursorposition == 0) {
            cursorposition = 2
        } else if (cursorposition <= 2) {
            cursorposition = cursorposition + 1
        } else if (cursorposition <= 5) {
            cursorposition = cursorposition + 2
        } else if (cursorposition == 6) {
            cursorposition = cursorposition + 2
        } else if (cursorposition == 7) {
            cursorposition = cursorposition + 4
            e1 = object.value.indexOf(')')
            e2 = object.value.indexOf('-')
            if (e1 > -1 && e2 > -1) {
                if (e2 - e1 == 4) {
                    cursorposition = cursorposition - 1
                }
            }
        } else if (cursorposition < 11) {
            cursorposition = cursorposition + 3
        } else if (cursorposition == 11) {
            cursorposition = cursorposition + 1
        } else if (cursorposition >= 12) {
            cursorposition = cursorposition
        }

    }

}

function ParseChar(sStr, sChar) {
    if (sChar.length == null) {
        zChar = new Array(sChar);
    } else zChar = sChar;

    for (i = 0; i < zChar.length; i++) {
        sNewStr = "";

        var iStart = 0;
        var iEnd = sStr.indexOf(sChar[i]);

        while (iEnd != -1) {
            sNewStr += sStr.substring(iStart, iEnd);
            iStart = iEnd + 1;
            iEnd = sStr.indexOf(sChar[i], iStart);
        }
        sNewStr += sStr.substring(sStr.lastIndexOf(sChar[i]) + 1, sStr.length);

        sStr = sNewStr;
    }

    return sNewStr;
}
