/* FSJS Unit 3 Project - Interactive Form */

//Add autofocus to first input element as an attribute
const nameInput = document.querySelector('#name');
nameInput.setAttribute('autofocus', '');

//Hide "other job role" input and display when selected
const otherJobInput = document.querySelector('#other-title');
otherJobInput.style.display = 'none';

const titleInput = document.querySelector('#title');
titleInput.addEventListener('change', () => {
  const userSelection = titleInput.value;
  if (userSelection === 'other') {
    otherJobInput.style.display = '';
  } else {
    otherJobInput.style.display = 'none';
  }
});

//Hide color label and options
const tshirtDesignInput = document.querySelector('#design');
const tshirtColorInput = document.querySelector('#color');
const tshirtColorLabel = tshirtColorInput.previousElementSibling;
const tshirtColorOptions = tshirtColorInput.children;
function tshirtDisplayOn() {
  tshirtColorLabel.style.display = '';
  tshirtColorInput.style.display = '';
}
function tshirtDisplayOff() {
  tshirtColorLabel.style.display = 'none';
  tshirtColorInput.style.display = 'none';
}
//The 'selected' attribute makes it responsive to the options available
function tshirtOptionDisplay(indexStart, indexEnd) {
  for (i=0; i<tshirtColorOptions.length; i++) {
    tshirtColorOptions[i].style.display = 'none';
    tshirtColorOptions[i].removeAttribute('selected');
  }
  tshirtColorOptions[indexStart].setAttribute('selected', '');
  for (i=indexStart; i <= indexEnd; i++) {
    tshirtColorOptions[i].style.display = '';
  }
}
tshirtDisplayOff();
//Create conditional selection of color based on design 
tshirtDesignInput.addEventListener('change', () => {
  const userSelection = tshirtDesignInput.value;
  if (userSelection === 'js puns') {
    tshirtDisplayOn();
    tshirtOptionDisplay(0, 2);
  } else if (userSelection === 'heart js') {
    tshirtDisplayOn();
    tshirtOptionDisplay(3, 5);
  } else {
    tshirtDisplayOff();
  }
});
