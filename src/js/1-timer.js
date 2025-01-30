import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Инициализация flatpickr для выбора даты
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('#startBtn');

let userSelectedDate = null;

// Настройки для flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Обработчик нажатия на кнопку start
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  const timerInterval = setInterval(() => {
    const timeRemaining = userSelectedDate - new Date();
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      document.querySelector('#days').textContent = '00';
      document.querySelector('#hours').textContent = '00';
      document.querySelector('#minutes').textContent = '00';
      document.querySelector('#seconds').textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    document.querySelector('#days').textContent = addLeadingZero(days);
    document.querySelector('#hours').textContent = addLeadingZero(hours);
    document.querySelector('#minutes').textContent = addLeadingZero(minutes);
    document.querySelector('#seconds').textContent = addLeadingZero(seconds);
  }, 1000);
});

// Функция для преобразования времени
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функция для добавления ведущего нуля
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
