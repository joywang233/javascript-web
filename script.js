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
const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContsiner = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const h1 = document.querySelector('h1');
//console.log(h1.querySelectorAll('.highlight'));

/*
console.log(h1.childNodes);
console.log(h1.children); //only works for direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';

//going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.backgroundColor = 'var(--gradient-primary)';

//work with sibling,children elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.tranform = 'scale(0.5)';
});

*/
/////////////////////////////////////////////////
//Tapped components

//use closest to
tabsContsiner.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);
  //Guard clause
  if (!clicked) return;
  //clear all active first then add it when click
  //remove the active class for both tab and content
  tabs.forEach(t => t.classList.remove('operation__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active'); //classlist is to manipulate the classname
  //active the content area
  console.log(clicked.dataset.tab);

  //active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation (don't understand)

// const handleHover = function (e) {
//   console.log(this, e.currentTarget);

//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('.img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };

// //passing argument into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseover', handleHover.bind(1));

/////////////////////////////////////////////
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

///////////////////////////////////////
//implement sticky navigation
//first practice: with scroll but it's a bad practice

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Sticky implement with Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],//how many percent of the target is visible
// };

// //when observe section 1 innteract with

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //rootMargin: `-${navHeight}px`,
});

//approach add the hidden section to each to section then remove when scroll
//reveal sections

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries; //deconstructuion
  //console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////implement lazy loading img(good for performance)
//concept: display the lazy img first, when user scoll down to the certain part, replace the lazy img with high resulution one

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //make the img load ealier than user scroll to the position
});
imgTargets.forEach(img => imgObserver.observe(img));
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
