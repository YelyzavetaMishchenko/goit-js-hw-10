import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const timer = {
  intervalID: null,
  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start(deadline) {
    this.intervalID = setInterval(() => {
      const ms = deadline - Date.now();

      if (ms <= 0) {
        this.stop(); // Зупиняю таймер
        this.updateUI(0, 0, 0, 0); // ппісля того як зупиниця таймер оновлюю інтерфейс
        return;
      }

      const timeComponents = this.convertMs(ms);
      this.updateUI(
        timeComponents.days,
        timeComponents.hours,
        timeComponents.minutes,
        timeComponents.seconds
      );
    }, 1000);

    startBtn.disabled = true;
    startBtn.classList.remove('active');
    startBtn.classList.add('disabled');

    inputEl.disabled = true;
  },

  stop() {
    clearInterval(this.intervalID);
    this.intervalID = null;

    inputEl.disabled = false;

    startBtn.disabled = true;
    startBtn.classList.add('disabled');
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },

  updateUI(days, hours, minutes, seconds) {
    this.elements.days.textContent = this.addLeadingZero(days);
    this.elements.hours.textContent = this.addLeadingZero(hours);
    this.elements.minutes.textContent = this.addLeadingZero(minutes);
    this.elements.seconds.textContent = this.addLeadingZero(seconds);
  },
};

let userSelectedDate = null;

startBtn.disabled = true;
startBtn.classList.add('disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        timeout: 3500,
        position: 'topRight',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        close: false,
        closeIcon: false,
        closeOnEscape: true,
        closeOnClick: true,
        icon: 'font-icon',
        iconUrl: closeModalIcon,
      });

      console.log(new URL('../img/close-modal-btn.svg', import.meta.url).href); // проверял коректно ли адресс указываю для iconUrl

      startBtn.disabled = true;
      startBtn.classList.add('disabled');
      userSelectedDate = null;
    } else {
      startBtn.disabled = false;
      startBtn.classList.remove('disabled');
      startBtn.classList.add('active');
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  timer.start(userSelectedDate);

  startBtn.disabled = true;
  startBtn.classList.add('disabled');
});
