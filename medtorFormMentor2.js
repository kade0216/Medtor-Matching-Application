var gradyearIn = document.getElementById('gradyearInput');
var gradIn = document.getElementById("gradInput");

var originalFontSize = gradyearIn.style.fontSize;

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

gradyearIn.addEventListener('change', e => {
  changeColor(e, gradyearIn);
})
gradIn.addEventListener('change', e => {
  changeColor(e, gradIn);
})
