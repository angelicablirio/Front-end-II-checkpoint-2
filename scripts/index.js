//References
const inputEmailRef = document.querySelector('#inputEmail');
const inputPasswordRef = document.querySelector('#inputPassword');
const inputBtnAccessRef = document.querySelector('#btnAccess');
const linkCreateAccountRef = document.querySelector('a');
const alertIdentUserRef = document.querySelector('#alertUser');

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
        setTimeout(()=>{window.location.assign('./pages/tarefas.html')},300)
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
inputBtnAccessRef.addEventListener('click', e => {
  e.preventDefault();
  loginUser();
  showSpinner();
});
linkCreateAccountRef.addEventListener('click', acessCreateAccountPage);

