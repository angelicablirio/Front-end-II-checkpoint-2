//References
const inputNameRef = document.querySelector('#inputName');
const inputLastNameRef = document.querySelector('#inputLastName');
const inputEmailRef = document.querySelector('#inputEmail');
const inputPasswordRef = document.querySelector('#inputPassword');
const inputPasswordConfirmRef = document.querySelector('#inputPasswordConfirm');
const inputBtnCreateAccountRef = document.querySelector('#btnCriarConta');
const linkLoginRef = document.querySelector('a');
const alertIdentUserRef = document.querySelector('#alertUser');
const inputShowPasswordRef = document.querySelector('#showPassword');

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
      .then(data =>{
        showSpinner()
        sweetAlertSingUp()
        setTimeout(()=>{window.location.assign('../index.html')},2000)
      });
      }
      else {
        alertIdentUserRef.classList.add('alertIdentUserShow')
      }
  });
}

//Msg success
const sweetAlertSingUp = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Cadastro realizado com sucesso',
    showConfirmButton: false,
    timer: 1500
  })
}

// Access Login page
const accessLoginPage = () => {
  window.location.assign("../index.html")
}

//Functions
inputNameRef.addEventListener('keyup', enableBtnCreateAccount);
inputLastNameRef.addEventListener('keyup', enableBtnCreateAccount);
inputEmailRef.addEventListener('keyup', enableBtnCreateAccount);
inputPasswordRef.addEventListener('keyup', enableBtnCreateAccount);
inputPasswordConfirmRef.addEventListener('keyup', enableBtnCreateAccount);
linkLoginRef.addEventListener('click', accessLoginPage);
inputPasswordRef.addEventListener('keydown', () =>{
  showFieldCheckbox();
});
inputShowPasswordRef.addEventListener('change', () =>{
  showPassword();
});
inputBtnCreateAccountRef.addEventListener('click', e => {
  e.preventDefault();
  createLoginUser();
});
