const inputMsgErrorNameRef = document.querySelector('.msgErrorName');
const inputMsgErrorLastNameRef = document.querySelector('.msgErrorLastName');
const inputMsgErrorConfirmPasswordRef = document.querySelector('.msgErrorConfirmPassword');
const inputMsgErrorEmailRef = document.querySelector('.msgErrorEmail');
const inputMsgErrorPasswordRef = document.querySelector('.msgErrorPassword');
const checkboxPasswordRef = document.querySelector('#checkboxShow');


//Validate name
const validateName = () => {
  if (inputNameRef.checkValidity()) {
    inputMsgErrorNameRef.classList.remove('show');
    return true;
  } else {
    inputMsgErrorNameRef.classList.add('show');
    return false;
  }
}

//Validate last name
const validateLastName = () => {
  if (inputLastNameRef.checkValidity()) {
    inputMsgErrorLastNameRef.classList.remove('show');
    return true;
  } else {
    inputMsgErrorLastNameRef.classList.add('show');
    return false;
  }
}

//Validate email
const validateEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErrorEmailRef.classList.remove('show')
    alertIdentUserRef.classList.remove('alertIdentUserShow')
    return true;
  } else {
    inputMsgErrorEmailRef.classList.add('show')
    return false
  }
}

//Validate password
const validatePassword = () => {
  if (inputPasswordRef.checkValidity()) {
    inputMsgErrorPasswordRef.classList.remove('show')
    return true;
  } else {
    inputMsgErrorPasswordRef.classList.add('show')
    return false
  }
}

//Confirm password
const confirmPassword = () => {
  if(inputPasswordRef.value !== inputPasswordConfirmRef.value) {
    inputMsgErrorConfirmPasswordRef.classList.add('show');
    return false;
  } else {
    inputMsgErrorConfirmPasswordRef.classList.remove('show');
    return true;
  }
}

// Show password
const showFieldCheckbox = () => {
  if (inputPasswordRef.value.length >= 2) {
    checkboxPasswordRef.classList.add('showPassword')
  }
  else {
    checkboxPasswordRef.classList.remove('showPassword')
  }
}

const showPassword = () => {

  if(inputShowPasswordRef.checked){
    inputPasswordRef.type = inputPasswordRef.type == 'text' ? 'password' : 'text'
    inputPasswordConfirmRef.type = inputPasswordConfirmRef.type == 'text' ? 'password' : 'text'
  }
  else {
    inputPasswordRef.type = inputPasswordRef.type == 'password' ? 'text' : 'password'
    inputPasswordConfirmRef.type = inputPasswordConfirmRef.type == 'password' ? 'text' : 'password'
  }
}


