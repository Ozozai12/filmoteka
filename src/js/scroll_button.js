const btnToUp = document.querySelector('.to-top');
btnToUp.addEventListener('click', () => {
    window.scrollTo(0, 0);
});

const btnScroll = document.querySelector('.to-top');
window.onscroll = () => {
    //Якщо прокручено більше 700, кнопка з'являється
    if(window.scrollY > 700){
    btnScroll.classList.remove('to-top--hide');
    //Якщо прокручено менше 700, кнопка зникає
    } else if(window.scrollY < 700){
    btnScroll.classList.add('to-top--hide');
    }
}