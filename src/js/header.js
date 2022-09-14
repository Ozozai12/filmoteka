const refs = {
  openModalBtn: document.querySelector('[data-modal-open-autorisation]'),
  closeModalBtn: document.querySelector('[data-modal-close-autorisation]'),
  modal: document.querySelector('[data-modal-autorisation]'),
  btnLibrary: document.querySelector('#btn-library'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);

function onOpenModal() {
  refs.modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onCloseModalEsc);
  window.addEventListener('click', onCloseModalBckdrp);
}

function onCloseModal() {
  refs.modal.classList.add('is-hidden');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onCloseModalEsc);
  window.removeEventListener('click', onCloseModalBckdrp);
}

if (refs.btnLibrary) {
  refs.btnLibrary.addEventListener('click', toggleCurrentActiveBtn);
}

function onCloseModalEsc(evt) {
  if (evt.code === 'Escape' && document.body.style.overflow === '') {
    return;
  } else if (evt.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModalBckdrp(evt) {
  if (evt.target === document.querySelector('.backdrop')) {
    onCloseModal();
  } else {
    return;
  }
}
function toggleCurrentActiveBtn(ev) {
  const currentActiveBtn = document.querySelector(
    '.btn__library.btn__library--current'
  );
  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('btn__library--current');
  }

  const btnEl = ev.target.closest('.btn__library');
  btnEl.classList.add('btn__library--current');
}

// THEME Toggle

const toggle = document.querySelector('.theme-switch__toggle');
const body = document.body;
const footerDarktheme = document.querySelector('.footer');

const modalHeader = document.querySelector('.modal__header');
const wrapperModalLogin = document.querySelector('.wrapper');

const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const savedTheme = localStorage.getItem('theme');

updataTheme();
checkboxChecked();
updataThemeFooter();

toggle.addEventListener('change', toggleTheme);

function toggleTheme() {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    modalHeader.classList.remove('dark-theme');
    wrapperModalLogin.classList.remove('dark-theme');
    body.classList.add('light-theme');
    modalHeader.classList.add('light-theme');
    wrapperModalLogin.classList.add('light-theme');
    footerDarktheme.classList.remove('dark-theme');
  } else {
    body.classList.remove('light-theme');
    modalHeader.classList.remove('light-theme');
    wrapperModalLogin.classList.remove('light-theme');
    body.classList.add('dark-theme');
    modalHeader.classList.add('dark-theme');
    wrapperModalLogin.classList.add('dark-theme');
    footerDarktheme.classList.add('dark-theme');
  }

  localStorage.setItem('theme', body.classList);
}

function updataTheme() {
  if (savedTheme) {
    body.classList = savedTheme;
  }
}

function checkboxChecked() {
  if (savedTheme === 'loaded dark-theme') {
    toggle.setAttribute('checked', true);
  }
}

function updataThemeFooter() {
  if (savedTheme === 'loaded dark-theme') {
    footerDarktheme.classList.add('dark-theme');
    modalHeader.classList.add('dark-theme');
    wrapperModalLogin.classList.add('dark-theme');
  }
}
