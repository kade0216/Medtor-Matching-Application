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
