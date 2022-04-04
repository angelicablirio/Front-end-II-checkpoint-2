const inputEmailRef = document.querySelector('#inputEmail');
const inputSenhaRef = document.querySelector('#inputPassword');
const inputBtnAcessarRef = document.querySelector('#btnAcessar');
const inputMsgErroEmailRef = document.querySelector('.msgErroEmail');
const inputMsgErroSenhaRef = document.querySelector('.msgErroSenha');
const linkCriarContaRef = document.querySelector('a')
const inputShowSenhaRef = document.querySelector('#showPassword')
const checkboxSenhaRef = document.querySelector('#checkboxShow')

//Valida email
const validaEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErroEmailRef.classList.remove('show')
    return true;
  } else {
    inputMsgErroEmailRef.classList.add('show')
    return false
  }
}

//Valida senha
const validaSenha = () => {
  if (inputSenhaRef.checkValidity()) {
    inputMsgErroSenhaRef.classList.remove('show')
    return true;
  } else {
    inputMsgErroSenhaRef.classList.add('show')
    return false
  }
}

// Habilita campo com o chechbox para visualizar a senha
const showFieldCheckbox = () => {

  if (inputSenhaRef.value.length >= 2) {
    // console.log('fdgjgj')
    checkboxSenhaRef.classList.add('showSenha')

  }
  else {
    checkboxSenhaRef.classList.remove('showSenha')
  }
}

// Checkbox para visualizar a senha
const showSenha = () => {

  if (inputShowSenhaRef.checked) {
    inputSenhaRef.type = inputSenhaRef.type == 'text' ? 'password' : 'text'
  }
  else {
    inputSenhaRef.type = inputSenhaRef.type == 'password' ? 'text' : 'password'
  }
}

//Valida todos os campos do formulário
const validaForm = () => {
  return validaEmail() &&
  validaSenha()
}

//Habilita o botão acessar
const habilitaBtnAcessar = () =>{
  inputBtnAcessarRef.disabled = !validaForm();
}

//Acessar a página do para criar conta caso não tenha
const acessarPagCriarConta = () => {
  window.location.assign("./pages/signup.html");
}

inputEmailRef.addEventListener('keyup', habilitaBtnAcessar);
inputSenhaRef.addEventListener('keyup', habilitaBtnAcessar);
inputSenhaRef.addEventListener('keydown', showFieldCheckbox);
inputBtnAcessarRef.addEventListener('click', e => {
  e.preventDefault()

});
linkCriarContaRef.addEventListener('click', acessarPagCriarConta);
inputShowSenhaRef.addEventListener('change', showSenha);
