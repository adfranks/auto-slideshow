/* Create a responsive slide show in a modal.  Criteria is it takes both
portrait and landscape orientations and does not overflow screen
triggering the scroll bar. IIFE used to create the slideshow
within the modal.  */
(function () {
    var modal = document.getElementById("slide-modal"),
    modalImage = document.getElementById("modal-content"),
    wrap = document.getElementById("wrap"),
    x = document.getElementById("close"),
    a = document.getElementById("automatic"),
    n = document.getElementById("next"),
    p = document.getElementById("previous"),
    st = document.getElementById("stop"),
    exp = document.getElementById("expand"),
    slides = document.getElementsByClassName("slide"),
    slideNumber = 1,
    beginning, ending, s, t, i;
    
    // Make a click on the gallery image open the modal and display the image.
    for (i = 0; i < slides.length; i++) {
        slides[i].addEventListener("click", openModal); 
    }

    function openModal(event) {
        modal.style.display = "block";
        modalImage.src = event.target.src;
        slideNumber = parseInt(event.target.id);
    }

    // Allow the user to close the modal easily.
    window.addEventListener("click", clickClose);
    function clickClose(event) {
        if (event.target === modal || event.target === x) {
            modal.style.display = "none";
            st.style.display = "none";
            a.style.display = "inline";
            clearTimeout(t);
            if (document.fullscreenElement) {
                closeFullScreen();
            }
        }
    }

    // Show and hide the next and previous buttons.
    window.addEventListener("mouseover", showControls);
    window.addEventListener("mouseout", hideControls);

    function showControls() {
        wrap.style.fontSize = "100%";
        wrap.style.visibility = "visible";
    }

    function hideControls() {
        wrap.style.fontSize = "0%";
        wrap.style.visibility = "hidden";
    }

    // Activate the next and previous buttons.
    window.addEventListener("click", addE);
    function addE(event) {
        if (event.target === n) {
            changeSlide(1);
        } else if (event.target === p) {
            changeSlide(-1);
        }
    }

    // Make another image appear with effects. 
    function changeSlide(d) {
        if (slideNumber == 1 && d === -1) {
            slideNumber = slides.length;
        } else if (slideNumber == slides.length && d === 1) {
            slideNumber = 1;
        } else {
            slideNumber += d;
        }
        modalImage.style.opacity = "0";
        modalImage.style.transform = "rotateY(90deg)";
        modalImage.style.WebkitTransform = "rotateY(90deg)";
        modalImage.style.msTransform = "rotateY(90deg)";
        s = setTimeout(newSource, 500);
    }

    function newSource() {
        modalImage.src = slides[slideNumber - 1].src;
        modalImage.style.opacity = "1";
        modalImage.style.transform = "rotateY(0deg)";
        modalImage.style.WebkitTransform = "rotateY(0deg)";
        modalImage.style.msTransform = "rotateY(0deg)";
        clearTimeout(s);
    }

    //  Allow for a moblie friendly swipe instead of left & right buttons.
    modalImage.addEventListener("touchstart", getLoc);
    function getLoc(event) {
        beginning = event.touches[0].clientX;
    }

    modalImage.addEventListener("touchmove", getMoveLoc);
    function getMoveLoc(event) {
        ending = event.touches[0].clientX;
    }
    
    modalImage.addEventListener("touchend", dirTouch);
    function dirTouch(event) {
	if (ending === null) {return;}
	if (ending < (beginning - 50)) {
	    changeSlide(1);
	} else if (ending > (beginning + 50)) {
	    changeSlide(-1);
	}
	ending = null;
    }

    // Have the play and pause buttons display and work properly.
    a.addEventListener("click", auto);
    function auto() {
        a.style.display = "none";
        st.style.display = "inline";
        changeSlide(1);
        t = setTimeout(auto, 4000);
    }

    st.addEventListener("click", pauseAuto);
    n.addEventListener("click", pauseAuto);
    p.addEventListener("click", pauseAuto);
    function pauseAuto() {
        st.style.display = "none";
        a.style.display = "inline";
        clearTimeout(t);
    }

    // Enable for full screen capability.
    exp.addEventListener("click", fullScreen);
    function fullScreen() {
        if (document.fullscreenElement ||
	    document.webkitFulscreenElement ||
	    document.mozFullScreenElement ||
	    document.msFullscreenElement) {
            closeFullScreen();
        } else if (modal.requestFullscreen) {
            modal.requestFullscreen();
        } else if (modal.mozRequestFullScreen) {
            modal.mozRequestFullScreen();
        } else if (modal.webkitRequestFullscreen) {
            modal.webkitRequestFullscreen();
        } else if (modal.msRequestFullscreen) {
            modal.msRequestFullscreen();
        }
    }

    function closeFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}()); 
