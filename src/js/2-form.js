const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const feedbackForm = document.querySelector('.feedback-form');

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    feedbackForm.elements.email.value = formData.email;
    feedbackForm.elements.message.value = formData.message;
  } catch (error) {
    console.error('Failed to parse saved form state:', error);
  }
}

feedbackForm.addEventListener('input', event => {
  const { name, value } = event.target;
  if (!['email', 'message'].includes(name)) {
    return;
  }

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const submittedData = {
    email: feedbackForm.elements.email.value.trim(),
    message: feedbackForm.elements.message.value.trim(),
  };

  if (!submittedData.email || !submittedData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(submittedData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  feedbackForm.reset();
});
