window.addEventListener('DOMContentLoaded', function() {
	//TABS
	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParrent = document.querySelector('.tabheader__items');
	
	function  hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}
	
	function  showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
	
	hideTabContent();
	showTabContent();
	
	tabsParrent.addEventListener('click', (event) => {
		const target = event.target;
		
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
	
	//TIMER
	
	const deadline = '2021-05-9';
	
	function  getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			  days = Math.floor(t / (1000 * 60 * 60 *24)),
			  hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			  minutes = Math.floor((t / 1000 / 60) % 60),
			  seconds = Math.floor((t / 1000) % 60);
		
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
	
	function getZero(num){
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  timeInterval = setInterval(updateClock, 1000);
		
		updateClock();
		
		function updateClock() {
			const t = getTimeRemaining(endtime);
			
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}	
		}
	}
	
	setClock('.timer', deadline);
	
	//MODAL
	
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		  modal = document.querySelector('.modal'); 
	
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});	
	
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow= '';
	}

	function openModal() {
		modal.classList.remove('hide');
		modal.classList.add('show');
		document.body.style.overflow= 'hidden';
		clearInterval(modalTimerId);
	}
	
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
			closeModal();
		}
	});
	
	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);
	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	
	window.addEventListener('scroll', showModalByScroll);
	
	//MENU CARD created by class
	
	class MenuCard {
		constructor (src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.change = 2.57;
			this.changeToBYN ();
		}
		changeToBYN () {
			this.price = +this.price * this.change;
		}
		render () {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
				
			element.innerHTML = `
                <img src=${this.src} alt="${this.all}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
				`;
			this.parent.append(element);
		}
	}
	
	
	getResourse('http://localhost:3000/menu')                // с помощью конструктора
	.then(data => {
		data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
		});
	});
	
	
	
	//FORMS
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'icons/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};
	
	forms.forEach(item => {
		bindPostData(item);
	});
	
	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'       
			}, 
			body: data				 
		});
		return await res.json();
	};
	
	async function getResourse(url) {
		let res = await fetch(url);
	
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}	
		return await res.json();
	}

	// 1 variant XMLHttpRequest 
	/* function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage)
			
			const request = new XMLHttpRequest ();
			request.open('POST','server.php');
			
			request.setRequestHeader('Content-type', 'application/json')
			const formData = new FormData(form);
			
			const object = {};
			formData.forEach(function(value, key){
				object[key] = value;
			});
			const json = JSON.stringify(object);
			
			request.send(object);
			//request.send(formData);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset();
					statusMessage.remove();
					
				} else {
					showThanksModal( message.failure);
				}
			});
			
		})
	} */
	
	// 2 variant Fetch API 
	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			
			let statusMessage = document.createElement('img');  
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);
			
			const formData = new FormData(form);
			
			const json = JSON.stringify(Object.fromEntries(formData.entries()));  // массив в json
			
			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(() => {
				showThanksModal( message.failure);
			}).finally(() => {
				form.reset();
			});			
		});
	}
		
	function showThanksModal (message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		
		prevModalDialog.classList.add('hide');
		openModal();
		
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class = "modal__content">
				<div class = "modal__close" data-close>x</div>
				<div class = "modal__title">${message}</div>
			</div>
		`;
		
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// //SLIDER first variant

	// const slides = document.querySelectorAll('.offer__slide'),
    // 	  prev = document.querySelector('.offer__slider-prev'),
    // 	  next = document.querySelector('.offer__slider-next'),
    // 	  total = document.querySelector('#total'),
    // 	  current = document.querySelector('#current');
	
	// let slideIndex = 1;
	// showSlide(slideIndex);
	
	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }
	
	// function  showSlide(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	} 
	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	} 
		
	// 	slides.forEach(item => item.style.display ='none');
	// 	slides[slideIndex - 1].style.display = 'block';
		
	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }
	
	// function plusSlide(n) {
	// 	showSlide(slideIndex += n);
	// }
	
	// prev.addEventListener('click', () => {
	// plusSlide(-1);
	// });
	
	// next.addEventListener('click', () => {
	// 	plusSlide(+1);
	// });



	// SLIDER 

	const slider = document.querySelector('.offer__slider'),
		  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		  slidesField = document.querySelector('.offer__slider-inner'),
		  slides = document.querySelectorAll('.offer__slide'),
		  prev = document.querySelector('.offer__slider-prev'),
		  next = document.querySelector('.offer__slider-next'),
		  total = document.querySelector('#total'),
		  current = document.querySelector('#current'),
		  width = window.getComputedStyle(slidesWrapper).width; 
	
	slider.style.position = 'relative';
	slidesWrapper.style.overflow = 'hidden';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesField.style.width = 100 * slides.length + '%';
	slides.forEach(slide => slide.style.width = width);
	
	let slideIndex = 1,
		offset = 0;
	
	if (slides.length < 10)	{
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = `${slideIndex}`;
	}
		
	function changeSlide() {
		slidesField.style.transform = `translateX(-${offset}px)`;
		
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
		
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	const indicators = document.createElement('ol'),
		  dots = [];
 
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);


	for (let i =0; i < slides.length; i++) {
		let dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0){
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}
	
	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}
	
	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}	
		
		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		
		changeSlide();
	}); 
	
	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}
		
		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
		
		changeSlide();
	}); 
	
	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			let offset = deleteNotDigits(width) * (slides.length - 1);
			changeSlide();
		});
	});

});