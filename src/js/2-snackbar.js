import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Получаем элементы формы
const form = document.querySelector('.form');

// Обработчик отправки формы
form.addEventListener('submit', event => {
  event.preventDefault();

  // Получаем данные из формы
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Создаём промис
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обрабатываем промис
  promise
    .then(delay => {
      iziToast.success({
        title: '✅ Success!',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Error!',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });

  // Очищаем форму
  form.reset();
});
