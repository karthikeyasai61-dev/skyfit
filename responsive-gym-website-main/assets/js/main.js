/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Close menu when clicking outside on mobile */
document.addEventListener('click', (e) => {
    if(navMenu && navMenu.classList.contains('show-menu')) {
        if(!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu')
        }
    }
})

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the bg-header class to the header tag
    window.scrollY >= 50 ? header.classList.add('bg-header') 
                         : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(sectionsClass) {
			if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
				sectionsClass.classList.add('active-link')
			}else{
				sectionsClass.classList.remove('active-link')
			}                                                    
		}
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUpElement = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	window.scrollY >= 350 ? scrollUpElement.classList.add('show-scroll')
						  : scrollUpElement.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__images`, {delay: 700, origin: 'bottom'})
sr.reveal(`.program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__content, .calculate__images, .contact__content`, {origin: 'left'})
sr.reveal(`.choose__images, .calculate__content`, {origin: 'right'})

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
      calculateHeight = document.getElementById('calculate-height'),
      calculateWeight = document.getElementById('calculate-weight'),
      calculateMessage = document.getElementById('calculate-message')

const calculateBmi = (e) => {
    e.preventDefault()

    // Check if the fields have a value
    if (calculateHeight.value === '' || calculateWeight.value === '') {
        // Add color and show message
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')
        calculateMessage.textContent = 'Fill in the Height and Weight ⚠️'

        // Remove message three seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 3000)
    } else {
        // BMI Formula
        const height = parseFloat(calculateHeight.value) / 100,
              weight = parseFloat(calculateWeight.value),
              bmi = Math.round(weight / (height * height))

        // Show your health status
        if (bmi < 18.5) {
            // Add color and display message
            calculateMessage.classList.add('color-green')
            calculateMessage.classList.remove('color-red')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny 😔`
        } else if (bmi < 25) {
            calculateMessage.classList.add('color-green')
            calculateMessage.classList.remove('color-red')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy 😄`
        } else {
            calculateMessage.classList.add('color-red')
            calculateMessage.classList.remove('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight 😔`
        }

        // To clear the input field
        calculateHeight.value = ''
        calculateWeight.value = ''

        // Remove message four seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 4000)
    }
}

if(calculateForm) {
    calculateForm.addEventListener('submit', calculateBmi)
}

/*=============== EMAIL JS ===============*/
const footerForm = document.getElementById('footer-form'),
      footerEmail = document.getElementById('footer-email'),
      footerMessage = document.getElementById('footer-message')

const sendEmail = (e) => {
    e.preventDefault()

    // Check if the field has a value
    if (footerEmail.value === '') {
        // Add and remove color
        footerMessage.classList.remove('color-green')
        footerMessage.classList.add('color-red')

        // Show message
        footerMessage.textContent = 'You must enter your email ⚠️'

        // Remove message three seconds
        setTimeout(() => {
            footerMessage.textContent = ''
        }, 3000)
    } else {
        // Show message and add color
        footerMessage.classList.add('color-green')
        footerMessage.classList.remove('color-red')
        footerMessage.textContent = 'You registered successfully! 🎉'

        // Clear input field
        footerEmail.value = ''

        // Remove message three seconds
        setTimeout(() => {
            footerMessage.textContent = ''
        }, 3000)
    }
}

if(footerForm) {
    footerForm.addEventListener('submit', sendEmail)
}

/*=============== TRANSFORMATIONS SLIDER ===============*/
const transformSlides = document.querySelectorAll('.transform__slide')
const transformDots   = document.querySelectorAll('.transform__dot')
const transformPrev   = document.getElementById('transform-prev')
const transformNext   = document.getElementById('transform-next')

let currentSlide = 0
let autoSlideInterval

const goToSlide = (index) => {
    transformSlides[currentSlide].classList.remove('active')
    transformDots[currentSlide].classList.remove('active')
    currentSlide = (index + transformSlides.length) % transformSlides.length
    transformSlides[currentSlide].classList.add('active')
    transformDots[currentSlide].classList.add('active')
}

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 4000)
}

const stopAutoSlide = () => clearInterval(autoSlideInterval)

if(transformPrev && transformNext) {
    transformPrev.addEventListener('click', () => { stopAutoSlide(); goToSlide(currentSlide - 1); startAutoSlide() })
    transformNext.addEventListener('click', () => { stopAutoSlide(); goToSlide(currentSlide + 1); startAutoSlide() })

    transformDots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoSlide()
            goToSlide(parseInt(dot.dataset.index))
            startAutoSlide()
        })
    })

    const sliderEl = document.getElementById('transform-slider')
    if(sliderEl) {
        sliderEl.addEventListener('mouseenter', stopAutoSlide)
        sliderEl.addEventListener('mouseleave', startAutoSlide)
    }

    startAutoSlide()
}
