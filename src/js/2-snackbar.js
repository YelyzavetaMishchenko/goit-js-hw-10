import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#form');
const delayInput = document.querySelector('#delay');
const radios = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(delayInput.value, 10);
  const state = document.querySelector('input[name="state"]:checked').value;

  createPromise(delay, state);
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.success({ title: 'Success', message });
    })
    .catch(message => {
      iziToast.error({ title: 'Error', message });
    });
}
