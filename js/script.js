// Feedback modal

const feedbackModal = document.querySelector('.modal-feedback');
const overlay = document.querySelector('.overlay');
const feedbackButton = document.querySelector('.contacts__btn');
const feedbackForm = document.querySelector('.modal-feedback__form')

const feedbackClose = feedbackModal.querySelector('.modal-feedback__close');
const emailInput = feedbackModal.querySelector('[name=user-email]');
const userNameInput = feedbackModal.querySelector('[name=feedback-name]');
const messageInput = feedbackModal.querySelector('[name=feedback-message]');

let inStorageSupport = true;
let userNameStorage;
let emailStorage;
let messageStorage;

try {
  userNameStorage = localStorage.getItem('user-name')
  emailStorage = localStorage.getItem('user-email')
  popupEmailStorage = localStorage.getItem('popup-user-email')
  messageStorage = localStorage.getItem('user-message')
} catch (err) {
  inStorageSupport = false;
}

feedbackButton.addEventListener("click", (evt) => {
  feedbackModal.classList.add('modal-feedback--show')
  overlay.classList.add('overlay--show')

  if (userNameStorage) {
    userNameInput.value = userNameStorage
    emailInput.focus()
  } else {
    userNameInput.focus()
  }
  if (emailStorage) {
    emailInput.value = emailStorage
    messageInput.focus()
  } else {
    emailInput.focus()
  }
  if (messageStorage) {
    messageInput.value = messageStorage
    userNameInput.focus()
  }
});

feedbackClose.addEventListener("click", () => {
  localStorage.setItem('user-name', userNameInput.value)
  localStorage.setItem('user-email', emailInput.value)
  localStorage.setItem('user-message', messageInput.value)

  feedbackModal.classList.remove('modal-feedback--show')
  overlay.classList.remove('overlay--show')
  feedbackModal.classList.remove('modal-feedback--error')
});

feedbackForm.addEventListener('submit', (evt) => {
  if (!userNameInput.value || !emailInput.value || !messageInput.value) {
    evt.preventDefault()
    feedbackModal.classList.remove('modal-feedback--error')
    feedbackModal.offsetWidth = feedbackModal.offsetWidth
    feedbackModal.classList.add('modal-feedback--error')
  }

  localStorage.removeItem('user-name')
  localStorage.removeItem('user-email')
  localStorage.removeItem('user-message')
});

window.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 27) {
    if (feedbackModal.classList.contains('modal-feedback--show') && overlay.classList.contains('overlay--show')) {
      evt.preventDefault()
      feedbackModal.classList.remove('modal-feedback--show')
      overlay.classList.remove('overlay--show')
    }
  }
});

// Popup login

const popupLoginBtn = document.querySelector('.usermenu__link--login');
const popupLogin = document.querySelector('.popup-login');

const loginForm = popupLogin.querySelector('.popup-login__form');
const popupEmailInput = popupLogin.querySelector('[name=user-email]');
const passwordInput = popupLogin.querySelector('[name=password]');

popupLoginBtn.addEventListener('mousemove', () => {
  if (popupEmailStorage) {
    popupEmailInput.value = popupEmailStorage
    passwordInput.focus()
  } else {
    popupEmailInput.focus()
  }
});

loginForm.addEventListener('submit', (evt) => {
  if (!popupEmailInput.value || !passwordInput.value) {
    evt.preventDefault()
    console.log('Ошибка! Есть незаполненные поля')
  } else {
    localStorage.setItem('popup-user-email', popupEmailInput.value)
  }
});

popupLogin.addEventListener('mouseout', () => {
  localStorage.setItem('popup-user-email', popupEmailInput.value)
  popupEmailInput.blur()
  passwordInput.blur()
});

popupLoginBtn.addEventListener('mouseout', () => {
  popupEmailInput.blur()
  passwordInput.blur()
});

// Map

ymaps.ready(init);

function init() {
  const map = new ymaps.Map('map', {
    center: [59.939420, 30.329657],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  const placemark = new ymaps.Placemark([59.938635, 30.323118], {
      hintContent: '<div class="contacts__hint">ул. Большая Конюшенная, 19/8</div>',
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/pin-map.svg',
      iconImageSize:  [80, 140],
      iconImageOffset: [-30, -153]
    });

  map.geoObjects.add(placemark);
}
