import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const renderMessage = (element) => {
  document.body.appendChild(element);

  const closeElement = () => {
    element.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      closeElement();
    }
  }

  element.addEventListener('click', closeElement);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  renderMessage(successMessage);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  renderMessage(errorMessage);
};

const showAlert = () => {
  const alertContainer = document.createElement('div');
  const text = document.createElement('p');

  alertContainer.classList.add('server-request-error');
  text.classList.add('server-request-error__message');

  text.textContent = 'Не удалось получить данные с сервера. Пожалуйста, обновите страницу или попробуйте позже';

  alertContainer.append(text);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export { showSuccessMessage, showErrorMessage, showAlert };

