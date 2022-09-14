import { members} from './project-members';
import Glide from '@glidejs/glide';
import { glideFooter, options } from './glide-settings';
import memberTpl from './templates/members.hbs';
import { onClickEscape, closeModal } from './footer-modal';

const refs = {
  footerModal: document.querySelector('.footer-modal'),
  openModalLink: document.querySelector('[data-footer-open]'),
  modal: document.querySelector('[data-modal-footer]'),
  backdrop: document.querySelector('.js-backdrop'),
  addBodyClass: document.querySelector('body'),
};

export function openModal() {
  refs.modal.classList.remove('is-hidden');
  refs.addBodyClass.classList.add('modal-open');
  document.addEventListener('keydown', onClickEscape);
  refs.footerModal.innerHTML = '';

  const markup = `
  <div class="glide_footer">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides--footer"></ul>
      </div>
      <div class="glide__arrows" data-glide-el="controls">
            <button style="padding: 10px;
      box-shadow: none;
      border: none; left: 10px" class="glide__arrow glide__arrow--left arrow__footer" data-glide-dir="<">&#x21e6;</button>
            <button style="padding: 10px;
      box-shadow: none;
      border: none; right: 10px" class="glide__arrow glide__arrow--right arrow__footer" data-glide-dir=">">&#x21e8;</button>
        </div>
        <button class="button__modal-close" data-footer-close>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            class="bi bi-x-lg"
            viewBox="0 0 32 32"
          >
            <path d="M32 3.223l-3.223-3.223-12.777 12.777-12.777-12.777-3.223 3.223 12.777 12.777-12.777 12.777 3.223 3.223 12.777-12.777 12.777 12.777 3.223-3.223-12.777-12.777 12.777-12.777z"></path>
          </svg>
        </button>
    </div>
    `;

  refs.footerModal.insertAdjacentHTML('beforeend', markup);

  const slide = document.querySelector('.glide__slides--footer');
  const closeModalBtn = document.querySelector('[data-footer-close]');



  slide.insertAdjacentHTML('beforeend', memberTpl(members));

  glideFooter.destroy();
  let glidFooter = new Glide('.glide_footer', options);
  glidFooter.mount();

  closeModalBtn.addEventListener('click', closeModal);
}