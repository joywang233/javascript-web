'use strict';

///////////////////////////////////////
// Modal window

/*

const allSection = document.querySelectorAll('.section');
console.log(allSection);
*/
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //return a node list

//function for open modal
const openModal = function (e) {
  e.preventDefault(); //by default the window will scroll up
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

//function for close modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Manipulate DOM elements

const message = document.createElement('div');
message.classList.add('cookie-message'); //add new class to div element
//message.textContent = 'We use cokkies to improve funcionality and analytics.';

const btns = document.getElementsByClassName('btn');
console.log(btns);

message.innerHTML =
  'We use cokkies to improve funcionality and analytics. <button class = "btn btn--close--cookie">Got it!</button>';
header.append(message); //prepend method add as the first element, append method add as the last element
//header.append(message.cloneNode(true));
//delete elements

document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove(); // same with message.parentElment.removeChild(message)
  });
