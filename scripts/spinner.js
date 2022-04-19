const body = document.querySelector('body');
const form = document.querySelector('form');
const spinnerContainer = document.createElement('div');
const spinner = document.createElement('div');
const link = document.querySelector('.join');

const showSpinner = () => {
    spinnerContainer.setAttribute('id', 'container-load');
    spinner.setAttribute('id', 'load');

    form.classList.add('hidden');
    link.classList.add('hidden');
    spinnerContainer.appendChild(spinner);
    body.appendChild(spinnerContainer);

    return

}
