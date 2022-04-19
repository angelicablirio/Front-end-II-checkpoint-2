const userNameRef = document.querySelector('#userName');
const userPhotoRef = document.querySelector('.user-image');
const btnRegisterTaskRef = document.querySelector('#registerTask');
const inputNewTaskRef = document.querySelector('#newTask');
const containerTasksRef = document.querySelector('.pending-tasks');
const skeletonRef = document.querySelector('#skeleton');
const btnCloseAppRef = document.querySelector('#closeApp');
const alertShowRef = document.querySelector('#alertShow');
const btnConfirmLogout = document.querySelector('#confirmLogout');
const btnCancelLogout = document.querySelector('#cancelLogout');
const containerFinishedTasksRef = document.querySelector('.finished-tasks');
const menuToggleRef = document.querySelector('#menu-toggle');
const msgNoTasksRef = document.querySelector('.msg-notasks');

//Menu hamburguer
const menuToggle = (event) => {
  event.preventDefault()
  const showMenuRef = document.querySelector('#showMenu')
  showMenuRef.classList.toggle('activeMenu')
  menuToggleRef.classList.toggle('active')
}

//Format date
let date = new Date()
let formatDate =
  date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

//Show user name
const showUserName = () => {
  let requestHeaders = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestHeaders)
    .then(response => {
      response.json()
        .then(data => {
          userNameRef.innerHTML = `${data.firstName} ${data.lastName}`;
          userPhotoRef.src = '../assets/foto-login.png'
        });
    });
}

//Show tasks
const showTasks = () => {
  let requestHeaders = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestHeaders)
    .then(response => {
      response.json()
        .then(data => {
          if (data == '') {
            msgNoTasksRef.classList.remove('display')
            skeletonRef.classList.add('display')
          } else {
            msgNoTasksRef.classList.add('display')
            skeletonRef.classList.add('display')
          }

          let tasks = data
          for (let task of tasks) {
            let formatDate = new Date(task.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })

            if (!task.completed) {
              containerTasksRef.innerHTML += `
            <li class="task">
            <div class="not-done" onclick = "updateTasks(${task.id}, true)" ></div>
            <div class="description">
              <p class="name">${task.description}</p>
              <p class="timestamp">Criada em: ${formatDate}</p>
              <img class="bin-img" onclick = "removeTask(${task.id})"  src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
            } else {
              containerFinishedTasksRef.innerHTML += `
            <li class="task">
            <div class="not-done" onclick = "updateTasks(${task.id}, false)" id="alterarStatus"></div>
            <div class="description">
              <p class="name">${task.description}</p>
              <p class="timestamp">Criada em: ${formatDate}</p>
              <img class="bin-img" onclick = "removeTask(${task.id})" src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
            }
          }
        });
    });
}

//Post new task
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

  if (tasksRegister.description !== '') {
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfig)
      .then(response => {
        response.json()
          .then(data => {
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
            renderApp()
          });
      });
  } else {
    alert('Por favor preencha o nome da tarefa!')
  }
}

//Update task status

const updateTasks = (id, completed) => { //Rever função*******
  let requestConfig = {
    method: 'PUT',
    body: JSON.stringify({
      completed: completed
    }),
    headers: {
      "Content-Type": 'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfig)
    .then(response => {
      if (response.ok) {
        renderApp()
      }
    })
}

//Render app
const renderApp = () => {
  document.location.reload()
}

//Remove task
const removeTask = (id) => {

  let requestConfig = {
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": localStorage.getItem('token')
    }
  }

  Swal.fire({
    title: 'Você tem certeza que deseja deletar a tarefa?',
    text: "Não há como mudar esta opção!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, deletar!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfig)
        .then(response => {
          response.json()
            .then(data => {
              if (response.ok) {
                Swal.fire(
                    'Deletado!',
                    'Sua tarefa foi deletada.',
                    'success'
                  )
                  .then((result) => {
                    if (result.isConfirmed) {
                      renderApp()
                    }
                  })
              }
            });
        });


    }
  })



}

//Logout app
const logoutApp = () => {
  if (btnCloseAppRef.click) {
    alertShowRef.classList.add('alertShow')
  }
}

const confirmLogout = () => {
  if (btnConfirmLogout.click) {
    console.log('ok')
    localStorage.removeItem('token')
    window.location.assign('../index.html')
  }
}

const cancelLogout = () => {
  if (btnCancelLogout.click) {
    alertShowRef.classList.remove('alertShow')
  }
}

//Functions
showUserName();
showTasks();
menuToggleRef.addEventListener('click', menuToggle)
btnRegisterTaskRef.addEventListener('click', e => {
  e.preventDefault()
  postNewTask()
});
btnCloseAppRef.addEventListener('click', logoutApp);
btnConfirmLogout.addEventListener('click', confirmLogout);
btnCancelLogout.addEventListener('click', cancelLogout);