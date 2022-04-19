const showSpinner = () => {

    let body = document.querySelector('body')
    let form = document.querySelector('form')
    let spinnerContainer = document.createElement('div')
    let spinner = document.createElement('div')
    let link = document.querySelector('.join')

    spinnerContainer.setAttribute('id', 'container-load')
    spinner.setAttribute('id', 'load')

    form.classList.add('hidden')
    link.classList.add('hidden')
    spinnerContainer.appendChild(spinner)
    body.appendChild(spinnerContainer)

    return

  }
