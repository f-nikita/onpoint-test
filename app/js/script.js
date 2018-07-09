(function(){

	let slideWindow = document.querySelector('.slide-window'),
		controlsBtn = document.querySelectorAll('.controls-btn'),
		scrollBottom = document.querySelector('.scroll-bottom'),
		slidecontainer = document.querySelector('.slidecontainer'),
		slideActive = document.querySelector('.slide-window .active');

	for(let i = 0; i < controlsBtn.length; i++) {
		controlsBtn[i].addEventListener('click', controlsBtnClick);
	}

	myRange.addEventListener('input', rangeValueChange);

	function controlsBtnClick() {
		let thisBtn = this,
			slideActive = document.querySelector('.slide-window .active');
		if(slideActive.nextElementSibling !== null) {
			for(let i = 0; i < controlsBtn.length; i++) {
				controlsBtn[i].classList.remove('active');
			}
			this.classList.add('active');
			scrollToVerticalSlide(thisBtn);
		} else {
			return;
		}
	}

	function rangeValueChange(e) {
		let slideWindowItems = slideWindow.children,
			slideActive = document.querySelector('.slide-window .active'),
			slide3 = document.querySelector('.slide-3'),
			slidePosTop = slide3.offsetTop,
			slide4 = document.querySelector('.slide-4'),
			slide5 = document.querySelector('.slide-5'),
			min = e.target.min,
			max = e.target.max,
			value = e.target.value;

		if(this.value >= 0 && this.value <= 30) {
			for(let i = 0; i < slideWindowItems.length; i++) {
				slideWindowItems[i].classList.remove('active');
			}
			slide3.classList.add('active');
			slideWindow.style.transform = 'translate(' + -slide3.offsetLeft + 'px' + ', ' + -slidePosTop + 'px)';
		} else if(this.value >= 31 && this.value <= 60) {
			for(let i = 0; i < slideWindowItems.length; i++) {
				slideWindowItems[i].classList.remove('active');
			}
			slide4.classList.add('active');
			slideWindow.style.transform = 'translate(' + -slide4.offsetLeft + 'px' + ', ' + -slidePosTop + 'px)';
		} else if(this.value >= 61 && this.value <= 100) {
			for(let i = 0; i < slideWindowItems.length; i++) {
				slideWindowItems[i].classList.remove('active');
			}
			slide5.classList.add('active');
			slideWindow.style.transform = 'translate(' + -slide5.offsetLeft + 'px' + ', ' + -slidePosTop + 'px)';
		}

		this.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';

	}

	function scrollToVerticalSlide(btn) {
		let slideWindow = document.querySelector('.slide-window'),
			slideWindowItems = slideWindow.children,
			thisBtnData = btn.dataset.class;
		for(let i = 0; i < slideWindowItems.length; i++) {
			if(slideWindowItems[i].classList.contains(thisBtnData)) {
				if(slideWindowItems[i].offsetTop === 0) {
					slideWindowItems[i].classList.add('active');
					slideWindow.style.transform = 'translateY(' + -slideWindowItems[i].offsetTop + 'px' + ')';
					scrollBottom.style.display = 'block';
					slidecontainer.style.display = 'none';
				} else if(-slideWindowItems[i].offsetTop === slideWindowItems[0].offsetHeight - slideWindow.offsetHeight) {
					slideWindowItems[i].classList.add('active');
					slideWindow.style.transform = 'translateY(' + -slideWindowItems[i].offsetTop + 'px' + ')';
					scrollBottom.style.display = 'none';
					slidecontainer.style.display = 'block';
				} else {
					slideWindowItems[i].classList.add('active');
					slideWindow.style.transform = 'translateY(' + -slideWindowItems[i].offsetTop + 'px' + ')';
					scrollBottom.style.display = 'none';
					slidecontainer.style.display = 'none';
				}
			} else {
				slideWindowItems[i].classList.remove('active');
			}	
		}
	}

	var startPoint = {}, nowPoint, ldelay;

	slideWindow.addEventListener('touchstart', function(event) {
		event.preventDefault();
		event.stopPropagation();
		startPoint.x=event.changedTouches[0].pageX;
		startPoint.y=event.changedTouches[0].pageY;
		ldelay=new Date(); 
	}, false);
	
	slideWindow.addEventListener('touchmove', function(event) {
		var pdelay=new Date(); 
		nowPoint=event.changedTouches[0];
		var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
		
		if ((xAbs > 150 || yAbs > 150) && (pdelay.getTime()-ldelay.getTime())<200) {
			if (xAbs < yAbs) {
				if (nowPoint.pageY < startPoint.y) {
					swipeSlide('next');
				} else {
					swipeSlide('prev');
				}
			}
		}
	}, false);

	function swipeSlide(slide) {
		let btn = document.querySelector('.controls .active'),
			slideActive = document.querySelector('.slide-window .active');

		if(slide === 'next') {
			if(btn.nextElementSibling !== null) {
				for(let i = 0; i < controlsBtn.length; i++) {
					controlsBtn[i].classList.remove('active');
				}
				slideActive.nextElementSibling.classList.add('active');
				btn.nextElementSibling.classList.add('active');
				scrollToVerticalSlide(btn.nextElementSibling);
			}
		} else {
			if(btn.previousElementSibling !== null) {
				for(let i = 0; i < controlsBtn.length; i++) {
					controlsBtn[i].classList.remove('active');
				}
				slideActive.previousElementSibling.classList.add('active');
				btn.previousElementSibling.classList.add('active');
				scrollToVerticalSlide(btn.previousElementSibling);
			}
		}
	}

})();