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

//Valida nome
const validaNome = () => {
  if (inputNomeRef.checkValidity()) {
    inputMsgErroNomeRef.classList.remove('show');
  } else {
    inputMsgErroNomeRef.classList.add('show');
  }
}

//Valida apelido
const validaApelido = () => {
  if (inputApelidoRef.checkValidity()) {
    inputMsgErroApelidoRef.classList.remove('show');
  } else {
    inputMsgErroApelidoRef.classList.add('show');
  }
}

//Valida email
const validaEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErroEmailRef.classList.remove('show');
  } else {
    inputMsgErroEmailRef.classList.add('show');
  }
}

//Valida senha
const validaSenha = () => {
  if (inputSenhaRef.checkValidity()) {
    inputMsgErroSenhaRef.classList.remove('show');
  } else {
    inputMsgErroSenhaRef.classList.add('show');
  }
}

//Confirma senha
const confirmaSenha = () => {
  if(inputSenhaRef.value !== inputSenhaConfirmRef.value) {
    inputMsgErroConfirmSenhaRef.classList.add('show');
  } else {
    inputMsgErroConfirmSenhaRef.classList.remove('show');
  }
}

//Acessar a página do login caso já tenha conta
const acessarPagLogin = () => {
  window.location.assign("../index.html")
}

//Habilita o botão de criar conta
const habilitaBtnCriarConta = () => {
  inputBtnCriarContaRef.removeAttribute('disabled');

}


//Chama as funções
inputNomeRef.addEventListener('keyup', validaNome);
inputApelidoRef.addEventListener('keyup', validaApelido);
inputEmailRef.addEventListener('keyup', validaEmail);
inputSenhaRef.addEventListener('keyup', validaSenha);
inputSenhaConfirmRef.addEventListener('keyup', confirmaSenha);
linkLoginRef.addEventListener('click', acessarPagLogin)
inputBtnCriarContaRef.addEventListener('click', (e) => {
  e.preventDefault();
});

