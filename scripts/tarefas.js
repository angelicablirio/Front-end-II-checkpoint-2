const userNameRef = document.querySelector('#userName');
const userFotoRef = document.querySelector('.user-image')
const btnCadastrarTarefasRef = document.querySelector('#cadastrarTarefa');
const inputNovaTarefaRef = document.querySelector('#novaTarefa');
const containerTarefas = document.querySelector('#skeleton');


//Inserir o nome do úsuário na tela
const mostraNomeUsuário = () =>{

  let requestHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestHeaders)
    .then(response =>{
      response.json()
      .then(data =>{
        userNameRef.innerHTML = `${data.firstName} ${data.lastName}`;
        userFotoRef.src = '../assets/foto-login.png'
    })
  });
}

//Mostra as tarefas
const mostraTarefas = () =>{

}

//Postar as novas tarefas
const postNovaTarefa = () => {
  let date = new Date();
  let tasksRegister = {
    description: inputNovaTarefaRef.value,
    completed: false,
  }

  let requestConfig = {
    method: 'POST',
    body: JSON.stringify(tasksRegister),
    headers: {   // foi necessario adicionar aqui a autorização do token
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfig)
    .then(response =>{
      response.json()
      .then(data =>{
        console.log(data)
        containerTarefas.innerHTML += `      
        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${data.description}</p>
          <p class="timestamp">Criada em: ${date.toLocaleDateString()}</p>
        </div>
      </li>
        `
      })
    })
}

mostraNomeUsuário()
mostraTarefas()
btnCadastrarTarefasRef.addEventListener('click', e => {
  e.preventDefault()
  postNovaTarefa()
});


