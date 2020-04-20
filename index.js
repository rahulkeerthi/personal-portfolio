import fullpage from 'fullpage.js';
let hue = 1;

function shiftColour() {
  this.previousElementSibling.classList.add('adjacent-word')
  this.nextElementSibling.classList.add('adjacent-word')
  hue += 5
  this.style.color = `hsl(${hue}, 100%, 50%)`
  this.previousElementSibling.style.color = `hsl(${hue}, 100%, 60%)`
  this.previousElementSibling.previousElementSibling.style.color = `hsl(${hue}, 100%, 70%)`
  this.nextElementSibling.style.color = `hsl(${hue}, 100%, 60%)`
  this.nextElementSibling.nextElementSibling.style.color = `hsl(${hue}, 100%, 70%)`
} 

function resetColour() {
  this.previousElementSibling.classList.remove('adjacent-word')
  this.nextElementSibling.classList.remove('adjacent-word')
  this.style.color = ""
  this.previousElementSibling.style.color = ""
  this.previousElementSibling.previousElementSibling.style.color = ""
  this.nextElementSibling.style.color = ""
  this.nextElementSibling.nextElementSibling.style.color = ""
} 

new fullpage('#fullpage', {
  navigation: true,
  licenseKey: 'DD3255CD-F96B4CB0-AC236BDB-F7FC1126',
  anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
  verticalCentered: false,
  scrollOverflow: true,
  afterLoad: function(origin, destination){
    var loadedSection = this;
		if(origin.anchor != 'secondPage'){
      const paragraphs = document.querySelectorAll('.paragraph');
      paragraphs.forEach(para => {
        let words = para.innerText.split(" ")
        para.innerHTML = words.map(word => 
          `<span class=\"word\">${word}</span>`
        ).join(" ")
      })
      const spans = document.querySelectorAll('span');
      spans.forEach(span => {
        span.addEventListener('mouseover', shiftColour);
        span.addEventListener('touchenter', shiftColour);
        span.addEventListener('mouseout', resetColour)
        span.addEventListener('touchleave', resetColour)
        span.addEventListener('touchcancel', resetColour)
      })
    }
	}
});

//methods
fullpage_api.setAllowScrolling(true);

// //Navigation
// menu: '#menu',
// lockAnchors: false,
// anchors:['firstPage', 'secondPage'],
// navigation: false,
// navigationPosition: 'right',
// navigationTooltips: ['firstSlide', 'secondSlide'],
// showActiveTooltip: false,
// slidesNavigation: false,
// slidesNavPosition: 'bottom',

// //Scrolling
// css3: true,
// scrollingSpeed: 700,
// autoScrolling: true,
// fitToSection: true,
// fitToSectionDelay: 1000,
// scrollBar: false,
// easing: 'easeInOutCubic',
// easingcss3: 'ease',
// loopBottom: false,
// loopTop: false,
// loopHorizontal: true,
// continuousVertical: false,
// continuousHorizontal: false,
// scrollHorizontally: false,
// interlockedSlides: false,
// dragAndMove: false,
// offsetSections: false,
// resetSliders: false,
// fadingEffect: false,
// normalScrollElements: '#element1, .element2',
// scrollOverflow: false,
// scrollOverflowReset: false,
// scrollOverflowOptions: null,
// touchSensitivity: 15,
// bigSectionsDestination: null,

// //Accessibility
// keyboardScrolling: true,
// animateAnchor: true,
// recordHistory: true,

// //Design
// controlArrows: true,
// verticalCentered: true,
// sectionsColor : ['#ccc', '#fff'],
// paddingTop: '3em',
// paddingBottom: '10px',
// fixedElements: '#header, .footer',
// responsiveWidth: 0,
// responsiveHeight: 0,
// responsiveSlides: false,
// parallax: false,
// parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
// cards: false,
// cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

// //Custom selectors
// sectionSelector: '.section',
// slideSelector: '.slide',

// lazyLoading: true,

// //events
// onLeave: function(origin, destination, direction){},
// afterLoad: function(origin, destination, direction){},
// afterRender: function(){},
// afterResize: function(width, height){},
// afterReBuild: function(){},
// afterResponsive: function(isResponsive){},
// afterSlideLoad: function(section, origin, destination, direction){},
// onSlideLeave: function(section, origin, destination, direction){}