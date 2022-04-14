const userNameRef = document.querySelector('#userName');
const userPhotoRef = document.querySelector('.user-image');
const btnRegisterTaskRef = document.querySelector('#registerTarefa');
const inputNewTaskRef = document.querySelector('#newTask');
const containerTasksRef = document.querySelector('.pending-tasks');
const skeletonRef = document.querySelector('#skeleton');
const btnCloseAppRef = document.querySelector('#closeApp');
const alertShowRef = document.querySelector('#alertShow');
const btnConfirmLogout = document.querySelector('#confirmLogout');
const btnCancelLogout = document.querySelector('#cancelLogout');
const containerFinishedTasksRef = document.querySelector('.finished-tasks');
const menuToggleRef = document.querySelector('#menu-toggle');

// menu hamburguer
const menuToggle = (event) => {

  event.preventDefault()
  const mostrarMenu = document.querySelector('#showMenu')
  mostrarMenu.classList.toggle('menuAtivo')

}

//Formata data
let date = new Date()
let formatDate =
  date.toLocaleDateString('pt-BR', {
    day:   '2-digit',
    month: '2-digit',
    year:  'numeric',
  });

//Insere o nome do usuário na tela
const showUserName = () =>{
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
        userPhotoRef.src = '../assets/foto-login.png'
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
        if(data == '') {
          skeletonRef.classList.remove('display')
        }
        else {
          skeletonRef.classList.add('display')
        }

        let tasks = data

        for(let task of tasks){
          let formatDate = new Date(task.createdAt).toLocaleDateString('pt-BR', {
            day:   '2-digit',
            month: '2-digit',
            year:  'numeric',
          })

          if(!task.completed){
            containerTasksRef.innerHTML += `
            <li class="task">
            <div class="not-done" onclick = "updateTasks(${task.id}, true)" ></div>
            <div class="description">
              <p class="name">${task.description}</p>
              <p class="timestamp">Criada em: ${formatDate}</p>
              <img class="bin-img" onclick = "removerTarefa(${task.id})"  src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
          }else {
            containerFinishedTasksRef.innerHTML += `
            <li class="task">
            <div class="not-done" onclick = "updateTasks(${task.id}, false)" id="alterarStatus"></div>
            <div class="description">
              <p class="name">${task.description}</p>
              <p class="timestamp">Criada em: ${formatDate}</p>
              <img class="bin-img" onclick = "removerTarefa(${task.id})" src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
          }
        }
    });
  });
}

//Posta as novas tarefas
const postNewTask = () => {
  let tasksRegister = {
    description: inputNewTaskRef.value,
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
          containerTasksRef.innerHTML += `
            <li class="task">
            <div class="not-done"></div>
            <div class="description">
              <p class="name">${data.description}</p>
              <p class="timestamp">Criada em: ${formatDate}</p>
              <img class="bin-img"src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
            renderizaApp()
      });
    });
  } else {
     alert('Por favor preencha o nome da tarefa!')
    }
}

//Atualiza status da tarefa

const updateTasks = (id, completed) => { //Rever função*******
  let requestConfig = {
    method: 'PUT',
    body: JSON.stringify({ completed: completed }),
    headers: {
      "Content-Type":'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfig)
    .then(response => {
      if(response.ok){
        renderizaApp()
    }
  })
}

//Desmarcar tarefa
// const desmarcarTarefa = (id) => {
//   let requestConfig = {
//     method: 'PUT',
//     body: JSON.stringify({ completed:false }),
//     headers: {
//       "Content-Type":'application/json',
//       "Authorization": localStorage.getItem('token')
//     }
//   }

//   fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfig)
//     .then(response => {
//       if(response.ok){
//         renderizaApp()
//     }
//   })
// }

//Renderiza app
const renderizaApp = () =>{
  document.location.reload()
}

//Remove tarefa
const removerTarefa = (id) => {

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
      renderizaApp()
    });
 });
}

//Sai do App
const logoutApp = () => {

  if(btnCloseAppRef.click){
    alertShowRef.classList.add('alertShow')
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

    alertShowRef.classList.remove('alertShow')
  }
}

//Invoca as funções
showUserName();
mostraTarefas();
menuToggleRef.addEventListener('click', menuToggle)
btnRegisterTaskRef.addEventListener('click', e =>{
  e.preventDefault()
  postNewTask()
});
btnCloseAppRef.addEventListener('click', logoutApp);
btnConfirmLogout.addEventListener('click', confirmLogout);
btnCancelLogout.addEventListener('click', cancelLogout);
