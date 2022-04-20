//References
const inputEmailRef = document.querySelector('#inputEmail');
const inputPasswordRef = document.querySelector('#inputPassword');
const inputBtnAccessRef = document.querySelector('#btnAccess');
const linkCreateAccountRef = document.querySelector('a');
const alertIdentUserRef = document.querySelector('#alertUser');
const inputShowPasswordRef = document.querySelector('#showPassword');

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
        showSpinner()
        sweetAlertLogin()
        setTimeout(()=>{window.location.assign('./pages/tarefas.html')},2000)
    })

  }
  else {
    alertIdentUserRef.classList.add('alertIdentUserShow')
  }
  })
}

//Msg success
const sweetAlertLogin = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Login feito com sucesso',
    showConfirmButton: false,
    timer: 1500
  })
}

// Access create account page
const acessCreateAccountPage = () => {
  window.location.assign("./pages/signup.html");
}

//Functions
inputEmailRef.addEventListener('keyup', enableBtnAccess);
inputPasswordRef.addEventListener('keyup', enableBtnAccess);
inputBtnAccessRef.addEventListener('click', e => {
  e.preventDefault();
  loginUser();
});
inputPasswordRef.addEventListener('keydown', () =>{
  showFieldCheckbox()
});
inputShowPasswordRef.addEventListener('change', () =>{
  showPassword()
});
linkCreateAccountRef.addEventListener('click', acessCreateAccountPage);
