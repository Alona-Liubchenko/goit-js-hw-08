import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function populateTextarea() {
  let savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    console.log(savedMessage);
    // form.email.value = savedMessage.email;
    // form.message.value = savedMessage.message;

    // formData.email = savedMessage.email;
    // form.email.value = formData.email;
    // formData.message = savedMessage.message;
    // form.message.value = formData.message;

    Object.entries(savedMessage).forEach(([key, value]) => {
      formData[key] = value;
      form.elements[key].value = value;
    });
  }
}
