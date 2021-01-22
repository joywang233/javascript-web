'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //return a node list
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

//implement smooth scroll

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   // console.log(s1coords), console.log(e.target.getBoundingClientRect());
//   // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
//   // console.log(
//   //   'height/width viewport',
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );

//   //the conventional way of scrolling
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

/////////page navigation
//implement scrool smoothly with foreach loop

document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault(); //not scroll down
    const id = el.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

//improve navigation smooth scroll by delegation
//1.add event listener to common node parent element
//2. determine what elment originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Implement cookie messages:

const message = document.createElement('div');
message.classList.add('cookie-message'); //add new class to div element
//message.textContent = 'We use cokkies to improve funcionality and analytics.';

const btns = document.getElementsByClassName('btn');
//console.log(btns);

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

/*

//mouse enter events
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addeventlistenerworks!');
// });

const alertH1 = function (e) {
  alert('Event listerner works for h1111');
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

//remove the eventlistener after 3s
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//event bubbling
//1.create random color

/*
//function to create random integers between min and max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 155)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target);
  //e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  //console.log('LINK');
});
*/
