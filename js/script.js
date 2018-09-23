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
//Create functions to turn the color selection on and off
function tshirtDisplayOn() {
  tshirtColorLabel.style.display = '';
  tshirtColorInput.style.display = '';
}
function tshirtDisplayOff() {
  tshirtColorLabel.style.display = 'none';
  tshirtColorInput.style.display = 'none';
}
//Create a function to selectively display the colors pertenant to the design choice
//The 'selected' attribute makes it responsive to the options available
function tshirtOptionDisplay(indexStart, indexEnd) {
//First turn off all display and remove attributes, then turn on appropriate options
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
//Add running total of selected activites to DOM
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

//Create a responsive payment section
const paymentInput = document.querySelector('#payment');
//Set credit card to default selection and hide other informaiton
const paymentOptions = paymentInput.children;
paymentOptions[0].setAttribute('disabled', '');
paymentOptions[1].setAttribute('selected', '');
const creditCardSection = document.querySelector('#credit-card');
const payPalSection = creditCardSection.nextElementSibling;
const bitcoinSection = payPalSection.nextElementSibling;
payPalSection.style.display = 'none';
bitcoinSection.style.display = 'none';
//Only show selected payment information / input
paymentInput.addEventListener('change', () => {
  const paymentSelection = paymentInput.value;
  function displayAllPayments () {
    creditCardSection.style.display = '';
    payPalSection.style.display = '';
    bitcoinSection.style.display = '';
  }
  function hidePayments (payment1, payment2) {
    displayAllPayments();
    payment1.style.display = 'none';
    payment2.style.display = 'none';
  }
  if (paymentSelection === 'credit card') {
    hidePayments (payPalSection, bitcoinSection);
  } else if (paymentSelection === 'paypal') {
    hidePayments (creditCardSection, bitcoinSection);
  } else if (paymentSelection === 'bitcoin') {
    hidePayments (creditCardSection, payPalSection);
  }
})

//Form validation
const submitButton = document.querySelector('button');
const emailInput = document.querySelector('#mail');
submitButton.addEventListener('click', (event) => {
  const stop = () => event.preventDefault();
//Create a function to append an error message above a 'faulty' section
  function addErrorMessage (message, elementWithError) {
    const paragraph = document.createElement('p');
    paragraph.style.color = 'red';
    paragraph.innerHTML = `<bold>${message}</bold>`;
    elementWithError.previousElementSibling.appendChild(paragraph);
  }
//Check name
  if (nameInput.value === '') {
    stop();
    addErrorMessage('Please provide a name.', nameInput);
  }
//Check email. Use .indexOf property of string (returns location or -1 if not there) for conditionals. 
  const email = emailInput.value.toLowerCase();
  if (email.indexOf('@') < 0 || email.indexOf('.com') < 0) {
    stop();
    addErrorMessage('Please provide a valid email address.', emailInput);
  }
//Activity selection validation
  let activitySelectedTotal = 0;
  for (i=0; i < activities.length; i++) {
    let isChecked = activities[i].firstChild.checked;
    if (isChecked) {
      activitySelectedTotal += 1;
    }
  }
  if (activitySelectedTotal === 0) {
    stop();
    addErrorMessage('Please select at least one activity.', activityTotal);
  }
//Credit card-specific validations and conditional error messages
  if (paymentInput.value === 'credit card') {
    const ccNumberInput = document.querySelector('#cc-num');
    const zipInput = document.querySelector('#zip');
    const cvvInput = document.querySelector('#cvv');
    if (isNaN(ccNumberInput.value) || ccNumberInput.value === '') {
      stop();
      addErrorMessage('Please enter a credit card number.', ccNumberInput);
    } else if (ccNumberInput.value.length < 13 || ccNumberInput.value.length > 16) {
      stop();
      addErrorMessage('Please enter a 13-16 digit number.', ccNumberInput)
    }
    if (isNaN(zipInput.value) || zipInput.value === '') {
      stop();
      addErrorMessage('Please enter your zip code.', zipInput);
    } else if (zipInput.value.length !== 5) {
      stop();
      addErrorMessage('Please enter a 5 digit number.', zipInput);
    }
    if (isNaN(cvvInput.value) || cvvInput.value === '') {
      stop();
      addErrorMessage('Please enter your CVV number.', cvvInput);
    } else if (cvvInput.value.length !== 3) {
      stop();
      addErrorMessage('Please enter a 3 digit number.', cvvInput);
    }
  }
});

//Create a 'real-time' error message for email input.
const emailErrorMessage = document.createElement('p');
emailErrorMessage.style.color = 'red';
emailErrorMessage.innerHTML = `<bold>Please provide a valid email address.</bold>`;
emailInput.previousElementSibling.appendChild(emailErrorMessage);
emailErrorMessage.style.display = 'none';
emailInput.addEventListener('keyup', () => {
  emailErrorMessage.style.display = '';
  const email = emailInput.value.toLowerCase();
  if (email.indexOf('@') > 0 && email.indexOf('.com') > 0) {
    emailErrorMessage.style.display = 'none';
  }
});
