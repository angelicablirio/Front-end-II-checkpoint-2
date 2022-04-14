//Referências
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
const linkLoginRef = document.querySelector('a')
const inputShowPasswordRef = document.querySelector('#showPassword')
const checkboxPasswordRef = document.querySelector('#checkboxShow')
const alertIdentUserRef = document.querySelector('#alertUser')

//Valida nome
const validateName = () => {
  if (inputNameRef.checkValidity()) {
    inputMsgErrorNameRef.classList.remove('show');
    return true;
  } else {
    inputMsgErrorNameRef.classList.add('show');
    return false;
  }
}

//Valida apelido
const validateLastName = () => {
  if (inputLastNameRef.checkValidity()) {
    inputMsgErrorLastNameRef.classList.remove('show');
    return true;
  } else {
    inputMsgErrorLastNameRef.classList.add('show');
    return false;
  }
}

//Valida email
const validateEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErrorEmailRef.classList.remove('show');
    return true;
  } else {
    inputMsgErrorEmailRef.classList.add('show');
    return false;
  }
}

//Valida senha
const validatePassword = () => {
  if (inputPasswordRef.checkValidity()) {
    inputMsgErrorPasswordRef.classList.remove('show');
    return true;
  } else {
    inputMsgErrorPasswordRef.classList.add('show');
    return false;
  }
}

//Confirma senha
const confirmPassword = () => {
  if(inputPasswordRef.value !== inputPasswordConfirmRef.value) {
    inputMsgErrorConfirmPasswordRef.classList.add('show');
    return false;
  } else {
    inputMsgErrorConfirmPasswordRef.classList.remove('show');
    return true;
  }
}

// Habilita campo com o checkbox para visualizar a senha
const showFieldCheckbox = () => {

  if (inputPasswordRef.value.length >= 2) {
    checkboxPasswordRef.classList.add('showSenha')
  }
  else {
    checkboxPasswordRef.classList.remove('showSenha')
  }
}

// Checkbox para visualizar a senha
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

//Valida todos os campos do formulário
const validateFormCreateAccount = () => {
  return validateName() &&
  validateLastName() &&
  validateEmail() &&
  validatePassword() &&
  confirmPassword()
}

//Habilita o botão de criar conta
const enableBtnCreateAccount = () => {
  inputBtnCreateAccountRef.disabled = !validateFormCreateAccount();
}

//Cria a conta do usuário
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
        console.log(response)
      response.json()

      .then(requestConfig =>{
        console.log(requestConfig)
        window.location.assign('../index.html')
      });
      }
      else {

        alertIdentUserRef.classList.add('alertIdentUserShow')
      }
    });
}

//Acessar a página do login caso já tenha conta
const accessLoginPage = () => {
  window.location.assign("../index.html")
}

//Chama as funções
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
  createLoginUser();

});
