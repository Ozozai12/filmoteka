import { modalMarkUp } from './modal';

const btnClose = document.querySelector('.button__modal-close');
btnClose.addEventListener('click', onModalClose);

function onModalClose() {
    modalBox.innerHTML = '';
}

function onModalCloseEsc(evt) {
    if (evt.code === 'Escape' &&  modalBox.innerHTML === '') {     
        return
    } else if (evt.code === 'Escape') {
        onModalClose();
    }
}