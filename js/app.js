/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll("section");
const navUl = document.getElementById("navbar__list");
const pageHeader = document.getElementsByClassName("page__header");

/**
 * End Global Variables
 * Start Main Functions
 * 
*/

// build the nav
function buildNav() {
    for (const section of sections) {
        sectionId = section.getAttribute("id");
        const navLiElementText = `<li id=nav__${sectionId}><a href=#${sectionId} onClick=scrollToTarget(${sectionId}) class=menu__link>${section.getAttribute("data-nav")}<li>`;
        navUl.insertAdjacentHTML("beforeend", navLiElementText);
    };
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Set sections as active
function setActiveClass(section, selecter, className) {
    if (document.querySelector(selecter)) {
        document.querySelector(selecter).classList.remove(className);
    }
    section.classList.add(className);
}

// Check if section is in the vieport, return true, Otherwise, return false
function isInViewPort(section) {
    return (section.offsetTop >= window.scrollY && section.getBoundingClientRect().bottom < window.innerHeight) ? true : false;
}

// Set a section and navigation is active when a section is in a viewport
window.addEventListener("scroll", function() {
    for (const section of sections) {
        if (isInViewPort(section)) {
            navElement = document.getElementById("nav__"+ section.getAttribute("id"));
            setActiveClass(navElement, ".nav__active", "nav__active");
            setActiveClass(section, ".active", "active");
        }
    };
})

// Scroll to section on link click
function scrollToTarget(target) {
    navUl.addEventListener("click", function(e) {
        e.preventDefault();
        let scrollOptions = {
            top: target.offsetTop, 
            left: target.getBoundingClientRect().left,
            behavior: "smooth"
        };
        window.scrollTo(scrollOptions);
    });  
}

// Scroll to top button will show up as the user scrolls down 20px from the top of the document
var goToTopbutton = document.getElementById("goToTopBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopbutton.style.display = "block";
    } else {
    goToTopbutton.style.display = "none";
    };
}

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Hidden the navbar when the user is not scrolling
let isScrolling;
window.addEventListener("scroll", function() {
    pageHeader[0].style.top = "0";
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    // Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function hideNavbar() {
        pageHeader[0].style.top = "-50px";
        }, 3000);
})