const inputEmailRef = document.querySelector('#inputEmail');
const inputSenhaRef = document.querySelector('#inputPassword');
const inputBtnAcessarRef = document.querySelector('#btnAcessar');
const inputMsgErroEmailRef = document.querySelector('.msgErroEmail');
const inputMsgErroSenhaRef = document.querySelector('.msgErroSenha');
const linkCriarContaRef = document.querySelector('a')

//Valida email
const validaEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErroEmailRef.classList.remove('show')
  } else {
    inputMsgErroEmailRef.classList.add('show')

  }
}

//Valida senha
const validaSenha = () => {
  if (inputSenhaRef.checkValidity()) {
    inputMsgErroSenhaRef.classList.remove('show')
  } else {
    inputMsgErroSenhaRef.classList.add('show')

  }
}

//Habilita o botão acessar
const habilitaBtnAcessar = () =>{
  inputBtnAcessarRef.removeAttribute('disabled')
}

//Acessar a página do para criar conta caso não tenha
const acessarPagCriarConta = () => {
  window.location.assign("./pages/signup.html")
}

inputEmailRef.addEventListener('keyup', validaEmail);
inputSenhaRef.addEventListener('keyup', validaSenha);
inputBtnAcessarRef.addEventListener('click', (e) => {
  e.preventDefault()
});
linkCriarContaRef.addEventListener('click', acessarPagCriarConta)