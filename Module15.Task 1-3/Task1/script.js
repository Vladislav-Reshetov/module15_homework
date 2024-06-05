const btn = document.querySelector('.j-btn')
const btnIconOne = document.querySelector('.btn-icon-one')
const btnIconTwo = document.querySelector('.btn-icon-two')

btn.addEventListener('click', () => {
    btnIconOne.classList.toggle('btn-icon-two');
    btnIconTwo.classList.toggle('btn-icon-two');
});