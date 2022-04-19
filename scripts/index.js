const inputEmailRef = document.querySelector('#inputEmail');
const inputPasswordRef = document.querySelector('#inputPassword');
const inputBtnAccessRef = document.querySelector('#btnAccess');
const inputMsgErrorEmailRef = document.querySelector('.msgErrorEmail');
const inputMsgErrorPasswordRef = document.querySelector('.msgErrorPassword');
const linkCreateAccountRef = document.querySelector('a');
const inputShowPasswordRef = document.querySelector('#showPassword');
const checkboxPasswordRef = document.querySelector('#checkboxShow');
const alertIdentUserRef = document.querySelector('#alertUser');


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

  if (inputShowPasswordRef.checked) {
    inputPasswordRef.type = inputPasswordRef.type == 'text' ? 'password' : 'text'
  }
  else {
    inputPasswordRef.type = inputPasswordRef.type == 'password' ? 'text' : 'password'
  }
}

//Validate form
const validateForm = () => {
  return validateEmail() &&
  validatePassword()
}

//Enable btn access
const enableBtnAccess = () =>{
  inputBtnAccessRef.disabled = !validateForm();
}

//Login
const loginUser = () =>{

  let usuarioLogin = {
    email: inputEmailRef.value,
    password: inputPasswordRef.value
  }

  let requestHeaders = {
    'Content-Type': 'application/json'
  }

  let requestConfig = {
    method: 'POST',
    body: JSON.stringify(usuarioLogin),
    headers: requestHeaders
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfig)

   .then(response =>{
    if(response.ok) {
      response.json()
      .then(data =>{
        localStorage.setItem('token', data.jwt)
        setTimeout(()=>{window.location.assign('./pages/tarefas.html')},500)
    })
  }
  else {
    alertIdentUserRef.classList.add('alertIdentUserShow')

  }
  })
}

// Access create account page
const acessCreateAccountPage = () => {
  window.location.assign("./pages/signup.html");
}

//Functions
inputEmailRef.addEventListener('keyup', enableBtnAccess);
inputPasswordRef.addEventListener('keyup', enableBtnAccess);
inputPasswordRef.addEventListener('keydown', showFieldCheckbox);
inputBtnAccessRef.addEventListener('click', e => {
  e.preventDefault();
  showSpinner();
  loginUser();
});
linkCreateAccountRef.addEventListener('click', acessCreateAccountPage);
inputShowPasswordRef.addEventListener('change', showPassword);
