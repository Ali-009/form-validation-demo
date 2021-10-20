const emailElement = document.querySelector('#mail');
const countryElement = document.querySelector('#country');
const zipElement = document.querySelector('#zip');
const passwordElement = document.querySelector('#pass');
const passwordConfirmElement = document.querySelector('#passconfirm');

const form = document.querySelector('form');

const simpleValidityElements = [countryElement,
  zipElement];

//Those elements are only invalid if they are missing
simpleValidityElements.forEach(element => element.addEventListener('focusout',
(e) => {
  if(e.target.validity.valueMissing){
    styleInvalidField(e.target, 'This field is required');
  } else {
    styleValidField(e.target);
  }
}));

emailElement.addEventListener('focusout', (e) => {
  if(e.target.validity.valueMissing){
    styleInvalidField(e.target, 'This field is required');
  } else if (e.target.validity.typeMismatch){
    styleInvalidField(e.target, 'Please input a valid email');
  } else {
    styleValidField(e.target);
  }
});

passwordElement.addEventListener('focusout', (e) => {
  if(e.target.validity.valueMissing){
    styleInvalidField(e.target, 'This field is required');
  } else {
    styleValidField(e.target);
  }

  if(passwordConfirmElement.validity.patternMismatch){
    styleInvalidField(passwordConfirmElement, 'Doesn\'t match password');
  }
})

passwordElement.addEventListener('input', (e) => {
  passwordConfirmElement.setAttribute('pattern', e.target.value);

  if(e.target.validity.valueMissing){
    styleInvalidField(e.target, 'This field is required');
  } else {
    styleValidField(e.target);
  }

  if(passwordConfirmElement.validity.patternMismatch){
    styleInvalidField(passwordConfirmElement, 'Doesn\'t match password');
  } else if (passwordConfirmElement.value != '' &&
      !passwordConfirmElement.validity.patternMismatch){
        styleValidField(passwordConfirmElement);
  }
});

passwordConfirmElement.addEventListener('input', passwordConfirmHandler);
passwordConfirmElement.addEventListener('focusout', passwordConfirmHandler);

function passwordConfirmHandler(e){
  if(e.target.getAttribute('pattern') === ''){
      styleInvalidField(e.target, 'Doesn\'t match password');
      return;
  }

  if(e.target.validity.valueMissing){
    styleInvalidField(e.target, 'This field is required');
  } else if(e.target.validity.patternMismatch){
    styleInvalidField(e.target, 'Doesn\'t match password');
  } else {
    styleValidField(e.target);
  }
}

form.addEventListener('submit', (e) => {
  if(!e.target.checkValidity()){
    e.preventDefault();
  }
});

function styleInvalidField(field, errorMessage){
  field.nextElementSibling.textContent = errorMessage;
  field.parentNode.nextElementSibling.style.maxWidth = '0';
  field.style.border = 'thin solid red';
}

function styleValidField(field){
  field.nextElementSibling.textContent = '';
  field.parentNode.nextElementSibling.style.maxWidth = '100%';
  field.style.border = 'thin solid black';
}
