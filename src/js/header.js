(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();

// const loginText = document.querySelector(".title-text .login");
//          const loginForm = document.querySelector("form.login");
//          const loginBtn = document.querySelector("label.login");
//          const signupBtn = document.querySelector("label.signup");
//          const signupLink = document.querySelector("form .signup-link a");
//          signupBtn.onclick = (()=>{
//            loginForm.style.marginLeft = "-50%";
//            loginText.style.marginLeft = "-50%";
//          });
//          loginBtn.onclick = (()=>{
//            loginForm.style.marginLeft = "0%";
//            loginText.style.marginLeft = "0%";
//          });
//          signupLink.onclick = (()=>{
//            signupBtn.click();
//            return false;
// });
