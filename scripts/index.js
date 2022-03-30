const inputEmailRef = document.querySelector('#inputEmail');
const inputSenhaRef = document.querySelector('#inputPassword');
const inputBtnAcessarRef = document.querySelector('#btnAcessar');
const inputMsgErroEmailRef = document.querySelector('.msgErroEmail');
const inputMsgErroSenhaRef = document.querySelector('.msgErroSenha');


const validaEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErroEmailRef.classList.remove('show')
  } else {
    inputMsgErroEmailRef.classList.add('show')

  }
}

const validaSenha = () => {
  if (inputSenhaRef.checkValidity()) {
    inputMsgErroSenhaRef.classList.remove('show')
  } else {
    inputMsgErroSenhaRef.classList.add('show')

  }
}

const habilitaBtnAcessar = () =>{
  inputBtnAcessarRef.removeAttribute('disabled')
}

inputEmailRef.addEventListener('keyup', validaEmail);
inputSenhaRef.addEventListener('keyup', validaSenha);
habilitaBtnAcessar()
inputBtnAcessarRef.addEventListener('click', (e) => {
  e.preventDefault()
});