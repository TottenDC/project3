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

//Grab activity portion of form
const activitiesSection = document.querySelector('.activities');
const activities = activitiesSection.querySelectorAll('label');
//Add running total to DOM
const activityTotal = document.createElement('p');
let total = 0;
activityTotal.textContent = `Total: $${total}`;
activitiesSection.appendChild(activityTotal);
//Create event handler for activities section
activitiesSection.addEventListener('change', (event) => {
  const activity = event.target;
  const isChecked = activity.checked;
//Disable competing activites
  function disableCompetingActivity(activityName, competingActivityIndex) {
    if (activity.name === activityName) {
      if (isChecked) {
        activities[competingActivityIndex].firstChild.setAttribute('disabled', '');
        activities[competingActivityIndex].style.color = 'grey';
      } else {
        activities[competingActivityIndex].firstChild.removeAttribute('disabled');
        activities[competingActivityIndex].style.color = '';
      }
    }
  }
  disableCompetingActivity('js-frameworks', 3);
  disableCompetingActivity('js-libs', 4);
  disableCompetingActivity('express', 1);
  disableCompetingActivity('node', 2);
//Update the total to reflect activity choices
  function updateTotal() {
    if (activity.name !== 'all') {
      if (isChecked) {
        total += 100;
      } else {
        total -= 100;
      }
    } else if (activity.name === 'all') {
      if (isChecked) {
        total += 200;
      } else {
        total -= 200;
      }
    }
    activityTotal.textContent = `Total: $${total}`;
  }
  updateTotal();
});

const paymentInput = document.querySelector('#payment');
const paymentOptions = paymentInput.children;
paymentOptions[1].setAttribute('selected', '');
const creditCardSection = document.querySelector('#credit-card');
const payPalSection = creditCardSection.nextElementSibling;
const bitcoinSection = payPalSection.nextElementSibling;
payPalSection.style.display = 'none';
bitcoinSection.style.display = 'none';
paymentInput.addEventListener('change', () => {
  const paymentSelection = paymentInput.value;
  function displayAllPayments () {
    creditCardSection.style.display = '';
    payPalSection.style.display = '';
    bitcoinSection.style.display = '';
  }
  function hidePayments (payment1, payment2) {
    payment1.style.display = 'none';
    payment2.style.display = 'none';
  }
  if (paymentSelection === 'select_method') {
    creditCardSection.style.display = 'none';
    payPalSection.style.display = 'none';
    bitcoinSection.style.display = 'none';
  } else if (paymentSelection === 'credit card') {
    displayAllPayments();
    hidePayments (payPalSection, bitcoinSection);
  } else if (paymentSelection === 'paypal') {
    displayAllPayments();
    hidePayments (creditCardSection, bitcoinSection);
  } else if (paymentSelection === 'bitcoin') {
    displayAllPayments();
    hidePayments (creditCardSection, payPalSection);
  }
})
