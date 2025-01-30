import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import closeModalIcon from '/img/close-modal-btn.svg';
import okModalIcon from '/img/ok-modal-btn.svg';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const formDate = new FormData(formEl);

  const delay = Number(formDate.get('delay'));
  const state = formDate.get('state');

  console.log('Delay:', delay);
  console.log('State:', state);

  console.log(formDate);

  formEl.reset();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Ok',
        message: `Fulfilled promise in ${delay}ms`,
        timeout: 5000,
        position: 'topRight',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        backgroundColor: '#59a10d',
        close: false,
        closeIcon: false,
        closeOnEscape: true,
        closeOnClick: true,
        iconUrl: okModalIcon,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        timeout: 5000,
        position: 'topRight',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        close: false,
        closeIcon: false,
        closeOnEscape: true,
        closeOnClick: true,
        iconUrl: closeModalIcon,
      });
    });
});
