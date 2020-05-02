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
				span.addEventListener("mouseover", shiftColour, {passive: true});
				span.addEventListener("touchenter", shiftColour, {passive: true});
				span.addEventListener("mouseout", resetColour, {passive: true});
				span.addEventListener("touchleave", resetColour, {passive: true});
				span.addEventListener("touchcancel", resetColour, {passive: true});
			});
		}
	  // function for contact form ajax functionality
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
			formAlert.lastElementChild.addEventListener("click", closeAlert, {passive: true});
		}

		function error() {
			status.innerHTML = "Oops! There was a problem.";
      // adds in alert success bs styling and makes x visible
			formAlert.classList.add("alert-danger");
			formAlert.lastElementChild.hidden = false;
			formAlert.lastElementChild.addEventListener("click", closeAlert, {passive: true});
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
