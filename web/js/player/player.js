(function(){
	var show_hide_panos, multimenu, select_lang, multimenu_controls, select_size, i, length, elems, tutorial, photo_container, big_menu;
	var multimenu_opened = true;
	var panos_opened = true;


	window.onresize = function() {
		elem_position();
	}
	window.onload = function () {
		tutorial = document.getElementById("tutorial");
		show_hide_panos = document.getElementById('show_hide_panos');
		multimenu = document.getElementById('multimenu');
		select_lang = multimenu.getElementsByClassName('lang')[0];
		multimenu_controls = multimenu.getElementsByClassName("icon");
		photo_container = document.getElementsByClassName("photo_container")[0];
		big_menu = multimenu.getElementsByClassName("panels")[0].getElementsByClassName("menu")[0].getElementsByClassName("elem");
		select_size = document.getElementById("share").getElementsByClassName("select")[0];

		select_size.addEventListener("click", function(){
			this.classList.toggle("active");
		});

		window.Slider = {
			cur: 0, //текущий слайд
			len: 0, // всего слайда
			album: null, //ссылка на альбом слайдов
			marker: null, //ссылка на маркер нажатием на который был вызван салйдер
			/**
			 * [nextSlide переход на следующий слайд]
			 * @return {[type]} [description]
			 */
			nextSlide: function() {
				this.hideSlide();
				this.cur += 1;
				if (this.cur > this.len-1) this.cur = 0;
				this.showSlide();
			},
			/**
			 * [prevSlide переход на предыдуший слайд]
			 * @return {[type]} [description]
			 */
			prevSlide: function() {
				this.hideSlide();
				this.cur -= 1;
				if (this.cur < 0) this.cur = this.len - 1;
				this.showSlide();
			},
			/**
			 * [showSlide показывает текущий слайд]
			 * @return {[type]} [description]
			 */
			showSlide: function() {
				photo_container.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("cur")[0].innerText = this.cur + 1;
				photo_container.getElementsByClassName("photo")[this.cur].classList.add("active");
			},
			/**
			 * [hideSlide прячет текущий слайд(картинку)]
			 * @return {[type]} [description]
			 */
			hideSlide: function() {
				photo_container.getElementsByClassName("photo")[this.cur].classList.remove("active");
			},
			/**
			 * [close функция для закрытия альбома и всего слайдер]
			 * @return {[type]} [description]
			 */
			close: function() {
				this.hideSlide();
				this.album.classList.remove("active");
				document.getElementsByClassName("photo_container")[0].classList.remove("active");
				this.marker.classList.remove("hide");
			},
			/**
			 * [init функия инициализации слайдера]
			 * @param  {[html елемент]} album  [в нем находятся фото]
			 * @param  {[html елемент]} marker [маркер нажатием на который был вызван альбом]
			 * @return {[type]}        [не ретюрнит ничего плохо но как есть]
			 */
			init: function(album, marker) {
				this.marker = marker;
				this.album = album;
				this.cur = 0;
				//показываем полотно на котором будут отображаны слайды
				document.getElementsByClassName("photo_container")[0].classList.add("active");
				//показываем контейнер всех слайдов
				this.album.classList.add("active");
				var elem = document.getElementsByClassName("photo_container")[0].getElementsByClassName("cont");
				for (var i = 0; i < elem.length; i += 1) {
					if(elem[i].classList.contains("active")) {
						this.len = elem[i].getElementsByClassName("photo").length;
					}
				}
				photo_container.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("cur")[0].innerText = this.cur + 1;
				photo_container.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("len")[0].innerText = this.len;
				var albums = document.getElementsByClassName("photo_container")[0].getElementsByClassName("cont");
				for (var i = 0; i < albums.length; i += 1) {
					albums[i].getElementsByClassName("len")[0].innerText = albums[i].getElementsByTagName("img").length;
				}
				this.showSlide();
			}
		};

		var photos = photo_container.getElementsByClassName("photos")[0].getElementsByClassName("photo");
		//инициализация фотоплеера
		for(var i = 0; i < photos.length; i += 1) {
			photos[i].getElementsByTagName("img")[0].addEventListener("click", function() {
				Slider.nextSlide();
			});
			if(photos[i].getElementsByTagName("img")[0].height > photos[i].getElementsByTagName("img")[0].width*1.5) {
				photos[i].classList.add("horizontal");
			}
		}

		var elems = select_size.getElementsByClassName("option");
		for(var i = 0; i < elems.length; i += 1) {
			elems[i].addEventListener('click', function() {
				select_size.getElementsByClassName("title")[0].getElementsByClassName("txt")[0].innerText = this.innerText;
				var size = select_size.getElementsByClassName("title")[0].getElementsByClassName("txt")[0].innerText;
				document.getElementById("share").getElementsByClassName("code")[0].innerText = '<iframe width="'+size.split(" x ")[0]+'" height="'+size.split(" x ")[1]+'" frameborder="0" src="http://placeview.in/pano/1392"></iframe>';
			});
		}

		if(!localStorage.getItem('player'))
			tutorial.classList.add("active");
		elem_position();
		close_all_check();
		photo_container.getElementsByClassName("control")[0].getElementsByClassName("close")[0].addEventListener('click',function(){
			Slider.close();
		});

		photo_container.getElementsByClassName("control")[0].getElementsByClassName("back")[0].addEventListener('click',function(){
			//prev slide
			Slider.prevSlide();
		});

		//показать модуль
		document.getElementById("module_container").getElementsByClassName("control")[0].getElementsByClassName("close")[0].addEventListener('click',function() {
			var arr = document.getElementById("module_container").classList;
			document.getElementById("module_container").classList.remove(document.getElementById("module_container").classList[0],document.getElementById("module_container").classList[1]);
		});
		var arr = document.getElementsByClassName("modules")[0].getElementsByClassName("elem");
		for(var i = 0; i< arr.length; i += 1) {
			arr[i].addEventListener('click', function() {
				if(!document.getElementById("module_container").classList.contains("active"))
					document.getElementById("module_container").classList.add('active');
				if(!document.getElementById("module_container").classList.contains(this.getAttribute('data-module')))
				document.getElementById("module_container").classList.add(this.getAttribute('data-module'));
			});
		}
		document.getElementsByClassName('info_container')[0].getElementsByClassName('close')[0].addEventListener('click',function() {
			var arr = document.getElementsByClassName('marker');
			for(var i = 0; i < arr.length; i += 1) {
				arr[i].classList.remove('hide');
			}
			document.getElementsByClassName('info_container')[0].classList.remove('active');
		});
		var arr = document.getElementsByClassName("marker");
		for (var i = 0; i < arr.length; i += 1) {
			arr[i].addEventListener('click', function(){
				var arr2 = document.getElementsByClassName('marker');
				for(var i = 0; i < arr2.length; i += 1) {
					arr2[i].classList.remove('hide');
				}
				var arr2 = document.getElementsByClassName("block_container")[0].getElementsByClassName("cont");
				for(var j = 0; j < arr2.length; j += 1) {
					arr2[j].classList.remove("active");
				}
				if(this.classList.contains("info_marker")){
					document.getElementsByClassName('info_container')[0].classList.add('active');
					document.getElementsByClassName("info_container")[0].getElementsByClassName(this.getAttribute('data-info'))[0].classList.add("active");
					if(this.offsetLeft > document.getElementById("player").clientWidth/2)
						document.getElementsByClassName("info_container")[0].style.left = this.offsetLeft - document.getElementsByClassName("info_container")[0].clientWidth + "px";
					else
						document.getElementsByClassName("info_container")[0].style.left = this.offsetLeft + "px";
					if(this.offsetTop > document.getElementById("player").clientHeight/2)
						document.getElementsByClassName("info_container")[0].style.top = this.offsetTop - document.getElementsByClassName("info_container")[0].clientHeight + "px";
					else
						document.getElementsByClassName("info_container")[0].style.top = this.offsetTop + "px";

				}else if(this.classList.contains("photo_marker")){
					var elems = document.getElementsByClassName("photo_container")[0].getElementsByClassName("cont");
					for (var i = 0; i < elems.length; i += 1) {
						if(elems[i].classList.contains(this.getAttribute("data-info"))) {
							break;
						}
					}
					Slider.init(elems[i], this);
				}
				this.classList.add('hide')
			});
		}
		window.loader = new (function () {
			this.show_loader = function () {
				document.getElementById("loader").classList.add("active");
			}
			this.hide_loader = function() {
				document.getElementById("loader").classList.remove("active");
			}
		})();
		show_hide_panos.getElementsByClassName('hide')[0].addEventListener('click', function(){
			hide_panos();
		});
		show_hide_panos.getElementsByClassName('show')[0].addEventListener('click', function(){
			show_panos();
		});
		//выбор языка в нераскрытом мультименю
		select_lang.getElementsByClassName('cur')[0].addEventListener('click', function(){
			this.parentNode.classList.toggle('active');
		});

		var arr = select_lang.getElementsByClassName('list')[0].getElementsByTagName("div");
		for(var i = 0; i < arr.length; i += 1) {
			arr[i].addEventListener('click',function(){
				this.parentNode.parentNode.getElementsByClassName('cur')[0].innerHTML = this.innerHTML;
				this.parentNode.parentNode.classList.remove('active');
			});
		}

		for(var i = 0; i < multimenu_controls.length; i += 1) {
			multimenu_controls[i].addEventListener("click", function() {
				if(this.classList.contains("active")) {
					multimenu_close();
					return;
				}
				multimenu_open(this);
			});
		}

		for(var i = 0; i < big_menu.length; i += 1) {
			big_menu[i].addEventListener("click", function () {
				for(var j = 0; j < multimenu_controls.length; j += 1) {
					if(multimenu_controls[j].classList.contains(this.getAttribute("data-panel"))) {
						multimenu_controls[j].click();
					}
				}
			});
		}
		close_all_panels(document.getElementById("close_all").getElementsByTagName("span")[0]);
		elems = multimenu.getElementsByClassName("back_button");
		//multimenu_close();
		multimenu.getElementsByClassName("panels")[0].getElementsByClassName("back_button")[0].addEventListener("click", function () {
			multimenu.getElementsByClassName("menu")[0].getElementsByClassName("ask")[0].click();
		});

		elems = multimenu.getElementsByClassName("control");
		length = elems.length;
		for(i = 0; i < length; i += 1) {
				elems[i]=elems[i].getElementsByClassName("fa-times")[0];
		}
		//multimenu_close();

		tutorial.getElementsByClassName("close")[0].addEventListener('click', function() {
			tutorial.classList.remove("active");
			localStorage.setItem('player', true);
		});
	}

	function hide_panos() {
		show_hide_panos.classList.remove('active');
		panos_opened = false;
		close_all_check();
	}

	function show_panos() {
		show_hide_panos.classList.add('active');
		panos_opened = true;
		close_all_check();
	}

	function multimenu_show(panel) {
		if(elem) {
			var elems = multimenu.getElementsByClassName("icon");
			for(var i = 0; i < elems.length; i += 1) {
				if(elems[i].getAttribute("data-panel") == panel) {
					elems[i].click();
					return 1;
				}
			}
		}
		return 0;
	}

	function close_all_check() {
		if((multimenu_opened) && (panos_opened)) {
			document.getElementById("close_all").classList.add("active");
			return 1;
		}
		document.getElementById("close_all").classList.remove("active");
		return 0;
	}

	function elem_position() {
		document.getElementsByClassName("slides")[0].style.height = window.innerHeight- document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").style.height = window.innerHeight - document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").getElementsByClassName("menu")[0].style.height = window.innerHeight - document.getElementById("top_menu").clientHeight - 4 + "px";
		var photos = document.getElementsByClassName("photos")[0].getElementsByClassName("horizontal");
		for(var i = 0; i < photos.length; i += 1) {
			photos[i].getElementsByClassName("im_cont")[0].style.height = window.innerHeight - document.getElementById("top_menu").clientHeight - 14 + "px";
			photos[i].getElementsByClassName("descr")[0].style.height = window.innerHeight - document.getElementById("top_menu").clientHeight - 14 + "px";
		}
	}

	function close_all_panels(el) {
		el.addEventListener("click", function() {
			show_hide_panos.classList.remove("active");
			multimenu_close()
			multimenu_opened = false;
			panos_opened = false;
			close_all_check();
		});
	}

	function multimenu_close() {
		if(multimenu_opened){
			document.getElementById("multimenu").getElementsByClassName("menu")[0].getElementsByClassName("active")[0].classList.remove("active");
			document.getElementById("multimenu").getElementsByClassName("panels")[0].classList.remove("active");
			multimenu_opened = false;
			close_all_check();
		}
	}
	function multimenu_open (el) {
		for(var j = 0; j < multimenu_controls.length; j += 1) {
			multimenu_controls[j].classList.remove("active");
		}
		for(var j = 0; j < multimenu.getElementsByClassName("panel").length; j += 1) {
			multimenu.getElementsByClassName("panel")[j].classList.remove("active");
		}
		document.getElementById(el.getAttribute("data-panel")).classList.add("active");
		multimenu.getElementsByClassName("panels")[0].classList.add("active");
		el.classList.add("active");
		multimenu_opened = true;
		close_all_check();
	}
})();