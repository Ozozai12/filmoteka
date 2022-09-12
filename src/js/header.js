// (() => {
//   const refs = {
//     openModalBtn: document.querySelector('[data-modal-open]'),
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('[data-modal]'),
//   };

//   refs.openModalBtn.addEventListener('click', onOpenModal);
//   refs.closeModalBtn.addEventListener('click', onCloseModal);

//   function onOpenModal() {
//     refs.modal.classList.add('is-hidden');
//     document.body.style.overflow = "hidden";
//   }
// })();
const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
}

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);

function onOpenModal() {
  refs.modal.classList.remove('is-hidden');
  document.body.style.overflow = "hidden";
}


function onCloseModal() {
  refs.modal.classList.add('is-hidden');
  document.body.style.overflow = "";
}

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
