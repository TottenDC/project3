/* FSJS Unit 3 Project - Interactive Form */

//Add autofocus to first input element as an attribute
const nameInput = document.querySelector('#name');
nameInput.setAttribute('autofocus', '');

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
