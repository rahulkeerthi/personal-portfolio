import fullpage from "fullpage.js";

// ABOUT ME TEXT COLOURIZER EFFECT

let hue = 1;

function shiftColour() {
	this.previousElementSibling.classList.add("adjacent-word");
	this.nextElementSibling.classList.add("adjacent-word");
	hue += 5;
	this.style.color = `hsl(${hue}, 100%, 50%)`;
	this.previousElementSibling.style.color = `hsl(${hue}, 100%, 60%)`;
	this.previousElementSibling.previousElementSibling.style.color = `hsl(${hue}, 100%, 70%)`;
	this.nextElementSibling.style.color = `hsl(${hue}, 100%, 60%)`;
	this.nextElementSibling.nextElementSibling.style.color = `hsl(${hue}, 100%, 70%)`;
}

function resetColour() {
	this.previousElementSibling.classList.remove("adjacent-word");
	this.nextElementSibling.classList.remove("adjacent-word");
	this.style.color = "";
	this.previousElementSibling.style.color = "";
	this.previousElementSibling.previousElementSibling.style.color = "";
	this.nextElementSibling.style.color = "";
	this.nextElementSibling.nextElementSibling.style.color = "";
}

// FULLPAGE.JS

new fullpage("#fullpage", {
	navigation: true,
	licenseKey: "DD3255CD-F96B4CB0-AC236BDB-F7FC1126",
	anchors: ["firstPage", "secondPage", "thirdPage", "fourthPage"],
	verticalCentered: false,
  // allow scroll overflow for projects and courses section
  scrollOverflow: true,
	afterLoad: function (origin, destination) {
    // if the section movement originates from any page other than the 2nd then run
		if (origin.anchor != "secondPage") {
      // split paragraphs into words and wrap with span + class
			const paragraphs = document.querySelectorAll(".paragraph");
			paragraphs.forEach((para) => {
				let words = para.innerText.split(" ");
				para.innerHTML = words
					.map((word) => `<span class=\"word\">${word}</span>`)
					.join(" ");
      });
      // select all the spans and add event listeners for touch and mouse events
			const spans = document.querySelectorAll("span");
			spans.forEach((span) => {
				span.addEventListener("mouseover", shiftColour);
				span.addEventListener("touchenter", shiftColour);
				span.addEventListener("mouseout", resetColour);
				span.addEventListener("touchleave", resetColour);
				span.addEventListener("touchcancel", resetColour);
			});
		}
  },
  // function for contact form ajax functionality
	afterLoad: function () {

		// get the form elements
		const form = document.getElementById("ajax-form");
		const button = document.getElementById("form-button");
		const status = document.getElementById("my-form-status");
    const formAlert = document.getElementById("form-alert");
    
    // sets x on form alert to hidden on section load
		formAlert.lastElementChild.hidden = true;

		// Success and Error functions for after the form is submitted

		function success() {
			form.reset();
			button.style = "display: none ";
			status.innerHTML = "Sent, thanks!";
      // adds in alert success bs styling and makes x visible
      formAlert.classList.add("alert-success");
			formAlert.lastElementChild.hidden = false;
			formAlert.lastElementChild.addEventListener("click", closeAlert);
		}

		function error() {
			status.innerHTML = "Oops! There was a problem.";
      // adds in alert success bs styling and makes x visible
			formAlert.classList.add("alert-danger");
			formAlert.lastElementChild.hidden = false;
			formAlert.lastElementChild.addEventListener("click", closeAlert);
		}

    // handle the closing of the alert box
    function closeAlert() {
      formAlert.classList.remove("alert-danger");
			formAlert.classList.remove("alert-success");
			status.innerHTML = "";
			formAlert.lastElementChild.hidden = true;
		}
    
    // handle the form submission event
		form.addEventListener("submit", function (ev) {
			ev.preventDefault();
			const data = new FormData(form);
			ajax(form.method, form.action, data, success, error);
		});
	},
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(xhr.response, xhr.responseType);
		} else {
			error(xhr.status, xhr.response, xhr.responseType);
		}
	};
	xhr.send(data);
}

fullpage_api.setAllowScrolling(true);

// FULLPAGE.JS OPTIONS FOR REFERENCE
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
