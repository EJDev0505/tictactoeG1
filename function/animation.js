const Firstslide = document.querySelector('.first-slide');
const Secondslide = document.querySelector('.second-slide');
const bar = document.querySelector('#loading-bar');

function handleAnimationEnd1() {
    Firstslide.style.left = "-110%";
}

bar.addEventListener('animationend', handleAnimationEnd1);

function animateSecondPage() {
if (handleAnimationEnd1) {

        Secondslide.style.left = " -110%";
    
}
}

setTimeout(animateSecondPage, 5300);

function preventScroll() {
document.body.classList.add('no-scroll');
}

function allowScroll() {
document.body.classList.remove('no-scroll');
}

preventScroll();


