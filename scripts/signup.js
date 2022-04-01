//Referências
const inputNomeRef = document.querySelector('#inputNome');
const inputApelidoRef = document.querySelector('#inputApelido');
const inputEmailRef = document.querySelector('#inputEmail');
const inputSenhaRef = document.querySelector('#inputSenha');
const inputSenhaConfirmRef = document.querySelector('#inputSenhaConfirm');
const inputBtnCriarContaRef = document.querySelector('#btnCriarConta');
const inputMsgErroNomeRef = document.querySelector('#msgErroNome');
const inputMsgErroSenhaRef = document.querySelector('#msgErroSenha');
const inputMsgErroConfirmSenhaRef = document.querySelector('#msgErroConfirmSenha')
const inputMsgErroApelidoRef = document.querySelector('#msgErroApelido');
const inputMsgErroEmailRef = document.querySelector('#msgErroEmail');
const linkLoginRef = document.querySelector('a')
const inputShowSenhaRef = document.querySelector('#showPassword')
const checkboxSenhaRef = document.querySelector('#checkboxShow')

//Valida nome
const validaNome = () => {
  if (inputNomeRef.checkValidity()) {
    inputMsgErroNomeRef.classList.remove('show');
    return true;
  } else {
    inputMsgErroNomeRef.classList.add('show');
    return false;
  }
}

//Valida apelido
const validaApelido = () => {
  if (inputApelidoRef.checkValidity()) {
    inputMsgErroApelidoRef.classList.remove('show');
    return true;
  } else {
    inputMsgErroApelidoRef.classList.add('show');
    return false;
  }
}

//Valida email
const validaEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErroEmailRef.classList.remove('show');
    return true;
  } else {
    inputMsgErroEmailRef.classList.add('show');
    return false;
  }
}

//Valida senha
const validaSenha = () => {
  if (inputSenhaRef.checkValidity()) {
    inputMsgErroSenhaRef.classList.remove('show');
    return true;
  } else {
    inputMsgErroSenhaRef.classList.add('show');
    return false;
  }
}

//Confirma senha
const confirmaSenha = () => {
  if(inputSenhaRef.value !== inputSenhaConfirmRef.value) {
    inputMsgErroConfirmSenhaRef.classList.add('show');
    return false;
  } else {
    inputMsgErroConfirmSenhaRef.classList.remove('show');
    return true;
  }
}

// Habilita campo com o chechbox para visualizar a senha
const showFieldCheckbox = () => {

  if(inputSenhaRef.value.length >= 2) {

    checkboxSenhaRef.classList.add('showSenha')

  }
  else {

    checkboxSenhaRef.classList.remove('showSenha')
  }
}

// Checkbox para visualizar a senha
const showSenha = () => {

  if(inputShowSenhaRef.checked){

    inputSenhaRef.type = inputSenhaRef.type == 'text' ? 'password' : 'text'
    inputSenhaConfirmRef.type = inputSenhaConfirmRef.type == 'text' ? 'password' : 'text'
  }
  else {

    inputSenhaRef.type = inputSenhaRef.type == 'password' ? 'text' : 'password'
    inputSenhaConfirmRef.type = inputSenhaConfirmRef.type == 'password' ? 'text' : 'password'

  }
}

//Valida todos os campos do formulário
const validaFormCriarConta = () => {
  return validaNome() &&
  validaApelido() &&
  validaEmail() &&
  validaSenha() &&
  confirmaSenha()
}

//Habilita o botão de criar conta
const habilitaBtnCriarConta = () => {
  inputBtnCriarContaRef.disabled = !validaFormCriarConta();
}

//Acessar a página do login caso já tenha conta
const acessarPagLogin = () => {
  window.location.assign("../index.html")
}

//Chama as funções
inputNomeRef.addEventListener('keyup', habilitaBtnCriarConta);
inputApelidoRef.addEventListener('keyup', habilitaBtnCriarConta);
inputEmailRef.addEventListener('keyup', habilitaBtnCriarConta);
inputSenhaRef.addEventListener('keyup', validaSenha);
inputShowSenhaRef.addEventListener('change', showSenha)
inputSenhaRef.addEventListener('keydown', showFieldCheckbox)
inputSenhaConfirmRef.addEventListener('keyup', habilitaBtnCriarConta);
linkLoginRef.addEventListener('click', acessarPagLogin)
inputBtnCriarContaRef.addEventListener('click', (e) => {
  e.preventDefault();
});
