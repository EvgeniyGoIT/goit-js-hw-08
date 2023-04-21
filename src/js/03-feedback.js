import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form')
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveState = () => {
    const state = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(state));
};

const loadState = () => {
    const stateString = localStorage.getItem('feedback-form-state');
    if (stateString) {
        const state = JSON.parse(stateString);
        emailInput.value = state.email;
        messageInput.value = state.message;
    }
};

const clearState = () => {
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
};

const handleSubmit = (event) => {
    event.preventDefault();
    const state = {
        email: emailInput.value,
        message: messageInput.value,
    };
    console.log(state);
    clearState();
};

form.addEventListener('input', throttle(saveState, 500));
form.addEventListener('load', loadState);
form.addEventListener('submit', handleSubmit);