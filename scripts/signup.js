//References
const inputNameRef = document.querySelector('#inputName');
const inputLastNameRef = document.querySelector('#inputLastName');
const inputEmailRef = document.querySelector('#inputEmail');
const inputPasswordRef = document.querySelector('#inputPassword');
const inputPasswordConfirmRef = document.querySelector('#inputPasswordConfirm');
const inputBtnCreateAccountRef = document.querySelector('#btnCriarConta');
const inputMsgErrorNameRef = document.querySelector('#msgErrorName');
const inputMsgErrorPasswordRef = document.querySelector('#msgErroPassword');
const inputMsgErrorConfirmPasswordRef = document.querySelector('#msgErrorConfirmPassword')
const inputMsgErrorLastNameRef = document.querySelector('#msgErrorLastName');
const inputMsgErrorEmailRef = document.querySelector('#msgErrorEmail');
const linkLoginRef = document.querySelector('a');
const inputShowPasswordRef = document.querySelector('#showPassword');
const checkboxPasswordRef = document.querySelector('#checkboxShow');
const alertIdentUserRef = document.querySelector('#alertUser');

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
     inputMsgErrorEmailRef.classList.remove('show');
     return true;
   } else {
     inputMsgErrorEmailRef.classList.add('show');
     return false;
   }
}

//Validate password
const validatePassword = () => {
   if (inputPasswordRef.checkValidity()) {
     inputMsgErrorPasswordRef.classList.remove('show');
     return true;
   } else {
     inputMsgErrorPasswordRef.classList.add('show');
     return false;
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
    checkboxPasswordRef.classList.add('showSenha')
  }
  else {
    checkboxPasswordRef.classList.remove('showSenha')
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

//Validate form
const validateFormCreateAccount = () => {
  return validateName() &&
  validateLastName() &&
  validateEmail() &&
  validatePassword() &&
  confirmPassword()
}

//Enable btn create account
const enableBtnCreateAccount = () => {
  inputBtnCreateAccountRef.disabled = !validateFormCreateAccount();
}

//Create user
const createLoginUser = () =>{
  let user = {
    firstName: inputNameRef.value,
    lastName: inputLastNameRef.value,
    email: inputEmailRef.value,
    password: inputPasswordRef.value
  }

  let requestHeaders = {
    'Content-Type': 'application/json'
  }

  let requestConfig = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: requestHeaders
  }
  fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfig)
    .then(response =>{
      if(response.ok){
        response.json()
      .then(requestConfig =>{
        setTimeout(()=>{window.location.assign('../index.html')},500)
      });
      }
      else {
        alertIdentUserRef.classList.add('alertIdentUserShow')
      }
  });
}

// Access Login page
const accessLoginPage = () => {
  window.location.assign("../index.html")
}

//Functions
inputNameRef.addEventListener('keyup', enableBtnCreateAccount);
inputLastNameRef.addEventListener('keyup', enableBtnCreateAccount);
inputEmailRef.addEventListener('keyup', enableBtnCreateAccount);
inputPasswordRef.addEventListener('keyup', validatePassword);
inputShowPasswordRef.addEventListener('change', showPassword)
inputPasswordRef.addEventListener('keydown', showFieldCheckbox)
inputPasswordConfirmRef.addEventListener('keyup', enableBtnCreateAccount);
linkLoginRef.addEventListener('click', accessLoginPage)
inputBtnCreateAccountRef.addEventListener('click', e => {
  e.preventDefault();
  showSpinner();
  createLoginUser();

});
