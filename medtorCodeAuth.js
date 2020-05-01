var myForm = document.getElementById("theForm");
var emailIn = document.getElementById("emailInput");
var regBtn = document.getElementById("registerBtn");
var key = 0;
const scriptURL = 'https://script.google.com/macros/s/AKfycbxskeV2MousRxCSpJoEw8wJuxbq8XLLwcruPsTnW6Yzs-8wWf2G/exec';
//const scriptURL = 'https://script.google.com/macros/s/AKfycbz8Gvf08qIfMIeck_7aavu9vvNhgY75a2YuRjQ82-UwPaTgkP9w/exec';
//const scriptURL = 'https://script.google.com/macros/s/AKfycbw0KN3s7fCh_FmhjSekE9doQ95ayTqY1qTyaSRlCojbNiE-qiw/exec';
const form = document.forms['getEmail'];
// window.alert(localStorage.getItem("confCode"));
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



// form.addEventListener('submit', e => {
//   e.preventDefault();
//   emailText = emailIn.value;
//   if (checkFormatting(emailText)){
//     key = Math.floor(100000 + Math.random() * 900000);
//     document.getElementById("hiddenVal").value = key;
//     if (key != 0) {
//       localStorage.setItem("confCode", key);
//     }
//     fetch(scriptURL, {method: 'POST', body: new FormData(form)})
//       .then(response => window.location.href = 'medtorHome.html')
//       .catch(error => console.error('Error!', error.message))
//
//     console.log(key);
//   }
// })
