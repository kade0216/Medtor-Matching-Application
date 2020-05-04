var homeStateIn = document.getElementById('homeStateInput');
var genderIn = document.getElementById("gend");
var hobbyIn1 = document.getElementById("hobby1");
var hobbyIn2 = document.getElementById("hobby2");
var hobbyIn3 = document.getElementById("hobby3");

var originalFontSize = homeStateIn.style.fontSize;

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

homeStateIn.addEventListener('change', e => {
  changeColor(e, homeStateIn);
})
genderIn.addEventListener('change', e => {
  changeColor(e, genderIn);
})
hobbyIn1.addEventListener('change', e => {
  changeColor(e, hobbyIn1);
})
hobbyIn2.addEventListener('change', e => {
  changeColor(e, hobbyIn2);
})
hobbyIn3.addEventListener('change', e => {
  changeColor(e, hobbyIn3);
})
