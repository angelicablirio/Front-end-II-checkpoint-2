const inputEmailRef = document.querySelector('#inputEmail');
const inputSenhaRef = document.querySelector('#inputPassword');
const inputBtnAcessarRef = document.querySelector('#btnAcessar');
const inputMsgErroEmailRef = document.querySelector('.msgErroEmail');
const inputMsgErroSenhaRef = document.querySelector('.msgErroSenha');

let erro = false;

const validaEmail = () => {
  if (inputEmailRef.checkValidity()) {
    inputMsgErroEmailRef.classList.remove('show')
  } else {
    inputMsgErroEmailRef.classList.add('show')
    erro = true
  }
}

const validaSenha = () => {
  if (inputSenhaRef.checkValidity()) {
    inputMsgErroSenhaRef.classList.remove('show')
  } else {
    inputMsgErroSenhaRef.classList.add('show')
    erro = true
  }
}

const habilitaBtnAcessar = () =>{

}


inputEmailRef.addEventListener('keyup', validaEmail);
inputSenhaRef.addEventListener('keyup', validaSenha);
inputBtnAcessarRef.addEventListener('click', (e) => {
  e.preventDefault()
  habilitaBtnAcessar()
});