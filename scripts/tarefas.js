const userNameRef = document.querySelector('#userName');
const userFotoRef = document.querySelector('.user-image');
const btnCadastrarTarefasRef = document.querySelector('#cadastrarTarefa');
const inputNovaTarefaRef = document.querySelector('#novaTarefa');
const containerTarefas = document.querySelector('.tarefas-pendentes');
const skeletonRef = document.querySelector('#skeleton');
const btnCloseAppRef = document.querySelector('#closeApp');
const alertaShowRef = document.querySelector('#alertShow')
const btnConfirmLogout = document.querySelector('#confirmLogout')
const btnCancelLogout = document.querySelector('#cancelLogout')
const containerTarefasTerminadasRef = document.querySelector('.tarefas-terminadas')
const alterarStatusRef = document.querySelector('#alterarStatus')
let btnsRemoverTarefaRef;
//Formata data
let date = new Date()
const dataFormatada =
  date.toLocaleDateString('pt-BR', {
    day:   '2-digit',
    month: '2-digit',
    year:  'numeric',
  });

//Insere o nome do usuário na tela
const mostraNomeUsuário = () =>{

  let requestHeaders = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestHeaders)
    .then(response =>{
      response.json()
      .then(data =>{
        userNameRef.innerHTML = `${data.firstName} ${data.lastName}`;
        userFotoRef.src = '../assets/foto-login.png'
    });
  });
}

//Mostra as tarefas
const mostraTarefas = () =>{

  let requestHeaders = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestHeaders)
    .then(response =>{
      response.json()
      .then(data =>{
        skeletonRef.classList.add('display')
        let tasks = data
        for(let task of tasks){ //rever a formatação da data, acredito que tenha uma forma de melhorar

          if(!task.completed){
            containerTarefas.innerHTML += `
            <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp">Criada em: ${new Date(task.createdAt).toLocaleDateString('pt-BR', {
                day:   '2-digit',
                month: '2-digit',
                year:  'numeric',
              })}</p>
              <img class="bin-img" src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
          }else {
            containerTarefasTerminadasRef.innerHTML += `
            <li class="tarefa">
            <div class="not-done" id="alterarStatus"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp">Criada em: ${new Date(task.createdAt).toLocaleDateString('pt-BR', {
                day:   '2-digit',
                month: '2-digit',
                year:  'numeric',
              })}</p>
              <img class="bin-img" onclick = "removerTarefa()" src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `

          }
        }
    });
  });
}


//Posta as novas tarefas
const postNovaTarefa = () => {
  let tasksRegister = {
    description: inputNovaTarefaRef.value,
    completed: false,
  }

  let requestConfig = {
    method: 'POST',
    body: JSON.stringify(tasksRegister),
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }

  if(tasksRegister.description !== ''){
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfig)
      .then(response => {
        response.json()
        .then(data =>{
          console.log(data)
            containerTarefas.innerHTML += `
            <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${data.description}</p>
              <p class="timestamp">Criada em: ${dataFormatada}</p>
              <img class="bin-img"src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
      });
    });
  } else {
     alert('Por favor preencha o nome da tarefa!')
    }
}

//Remove tarefa **não está funcionando pedi ajuda para o assitente técnico
const removerTarefa = () => {

  let requestConfig = {
    method: 'DELETE',
    headers: {
      "Content-Type":'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfig)
    .then(response => {
      response.json()
    .then(data => {
      console.log(data)
    });
 });
}

//Sai do App
const logoutApp = () => {

  if(btnCloseAppRef.click){
    alertaShowRef.classList.add('alertaShow')
  }
}

const confirmLogout = () => {

  if(btnConfirmLogout.click){
    console.log('ok')

    localStorage.removeItem('token')
    window.location.assign('../index.html')
  }
}

const cancelLogout = () => {

  if(btnCancelLogout.click){

    alertaShowRef.classList.remove('alertaShow')
  }
}



//Invoca as funções
mostraNomeUsuário();
mostraTarefas();
btnCadastrarTarefasRef.addEventListener('click', e =>{
  e.preventDefault()
  postNovaTarefa()
});

btnCloseAppRef.addEventListener('click', logoutApp);

btnConfirmLogout.addEventListener('click', confirmLogout );
btnCancelLogout.addEventListener('click', cancelLogout);
