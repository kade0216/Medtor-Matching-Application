var myForm = document.getElementById("theForm");
var emailIn = document.getElementById("emailInput");
var regBtn = document.getElementById("registerBtn");
const scriptURL = 'https://script.google.com/macros/s/AKfycbz8Gvf08qIfMIeck_7aavu9vvNhgY75a2YuRjQ82-UwPaTgkP9w/exec';
//const scriptURL = 'https://script.google.com/macros/s/AKfycbw0KN3s7fCh_FmhjSekE9doQ95ayTqY1qTyaSRlCojbNiE-qiw/exec';
const form = document.forms['getEmail'];

console.log("working");

function checkFormatting(inputText){
  var mailformat = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  if(inputText.match(mailformat)){
    if (checkEdu(inputText)) {
      return true;
    }
    else {
      return false;
    }
  }
  else{
    alert("You have entered an invalid email address");
    return false;
  }
}

function checkEdu(inputText) {
  if ((inputText.slice(-4)) == ".com") {
    return true;
  }
  else {
    alert("Please use .edu email");
    return false;
  }
}





function generateKey(inputText) {
    inputText = inputText.toLowerCase();
    var firstLet = inputText.charAt(0);
    var domainLet = inputText.charAt(inputText.lastIndexOf("@") - 1);
    if (!(isLetter(firstLet))) {
      firstLet = 'j';
    }
    if (!(isLetter(domainLet))) {
      domainLet = 'g';
    }

    key = prevTwoChar(domainLet) + '7' + firstLet + nextChar(domainLet) + '0' + prevTwoChar(firstLet);
    return key.toUpperCase();

}
function nextChar(c){
  if (!(isLetter(c))){
    theLet = 'j';
  }
  else {
    theLet = c;
    if (theLet == 'z') {
      return prevTwoChar(theLet);
    }
  }
  return String.fromCharCode(theLet.charCodeAt(0) + 1);
}
function prevTwoChar(c){
  if (!(isLetter(c))){
    theLet = 'g';
  }
  else {
    theLet = c;
    if (theLet == 'a' || theLet == 'b') {
      return nextChar(theLet);
    }
  }
  return String.fromCharCode(theLet.charCodeAt(0) - 2);
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}



form.addEventListener('submit', e => {
  e.preventDefault();
  emailText = emailIn.value;
  if (checkFormatting(emailText)){
    var key = generateKey(emailText);
    var key = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("hiddenVal").value = key;
    fetch(scriptURL, {method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))

    console.log(key);
  }
})
