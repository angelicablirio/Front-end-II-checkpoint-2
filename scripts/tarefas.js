const userNameRef = document.querySelector('#userName')
const btnCadastrarTarefasRef = document.querySelector('#cadastrarTarefa')
const inputNovaTarefaRef = document.querySelector('#novaTarefa')

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

      userNameRef.innerHTML = data.firstName

  })
});


btnCadastrarTarefasRef.addEventListener('click', e => {

  e.preventDefault()

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
      .then(requestConfig =>{
        console.log(requestConfig)
      })
    })
})
