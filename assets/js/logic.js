const findMusicBtn = document.querySelector('#findMusic');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');

findMusicBtn.addEventListener ('click', () => {
 modal.classList.add('is-active');

} );

modalBg.addEventListener('click', () => {

    modal.classList.remove('is-active');
});