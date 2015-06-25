(function(){
	var show_hide_panos, multimenu, select_lang, multimenu_controls, select_size, i, length, elems, tutorial, photo_container, big_menu;
	var multimenu_opened = false;
	var panos_opened = false;
	tutorial = document.getElementById("tutorial");
	show_hide_panos = document.getElementById('show_hide_panos');
	multimenu = document.getElementById('multimenu');
	select_lang = multimenu.getElementsByClassName('lang')[0];
	multimenu_controls = multimenu.getElementsByClassName("icon");
	photo_container = document.getElementsByClassName("photo_container")[0];
	big_menu = multimenu.getElementsByClassName("panels")[0].getElementsByClassName("menu")[0].getElementsByClassName("elem");

	window.onresize = function() {
		elem_position()
	}
	window.onload = function () {
		if(!localStorage.getItem('player'))
			tutorial.classList.add("active");
		elem_position();
	}

	photo_container.getElementsByClassName("control")[0].getElementsByClassName("close")[0].addEventListener('click',function(){
		photo_container.classList.remove("active")
	});

	document.getElementById("module_container").getElementsByClassName("control")[0].getElementsByClassName("close")[0].addEventListener('click',function() {
		var arr = document.getElementById("module_container").classList;
		document.getElementById("module_container").classList.remove(document.getElementById("module_container").classList[0],document.getElementById("module_container").classList[1]);
	})

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

	function hide_panos() {
		show_hide_panos.classList.remove('active');
		panos_opened = false;
		close_all_check();
	}
	show_hide_panos.getElementsByClassName('hide')[0].addEventListener('click', function(){
		hide_panos();
	});
	function show_panos() {
		show_hide_panos.classList.add('active');
		panos_opened = true;
		close_all_check();
	}
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
				this.classList.remove("active");
				multimenu.getElementsByClassName("panels")[0].classList.remove("active");
				return;
			}
			for(var j = 0; j < multimenu_controls.length; j += 1) {
				multimenu_controls[j].classList.remove("active");
			}
			for(var j = 0; j < multimenu.getElementsByClassName("panel").length; j += 1) {
				multimenu.getElementsByClassName("panel")[j].classList.remove("active");
			}
			document.getElementById(this.getAttribute("data-panel")).classList.add("active");
			multimenu.getElementsByClassName("panels")[0].classList.add("active");
			this.classList.add("active");
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
	multimenu_close(elems);

	elems = multimenu.getElementsByClassName("control");
	length = elems.length;
	for(i = 0; i < length; i += 1) {
			elems[i]=elems[i].getElementsByClassName("fa-times")[0];
	}
	multimenu_close(elems);

	tutorial.getElementsByClassName("close")[0].addEventListener('click', function() {
		tutorial.classList.remove("active");
		localStorage.setItem('player', true);
	});

	function multimenu_show_block(block_id) {
		multimenu.classList.remove(multimenu.classList);
		multimenu.classList.add(block_id);
		multimenu_opened = true;
		close_all_check();
	}


	function close_all_check() {
		if((multimenu_opened) && (panos_opened)) {
			document.getElementById("close_all").classList.add("active");
			return;
		}
		document.getElementById("close_all").classList.remove("active");
		return;
	}

	function elem_position() {
		document.getElementsByClassName("slides")[0].style.height = window.innerHeight- document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").style.height = window.innerHeight - document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").getElementsByClassName("menu")[0].style.height = window.innerHeight - document.getElementById("top_menu").clientHeight - 4 + "px";
	}

	function close_all_panels(el) {
		el.addEventListener("click", function() {
			show_hide_panos.classList.remove("active");
			multimenu.classList.remove(multimenu.classList);
			multimenu.classList.add("default");
			multimenu_opened = false;
			panos_opened = false;
			close_all_check();
		});
	}

	function multimenu_close(el) {
		length = el.length;
		for(i = 0; i < length; i += 1) {
			el[i].addEventListener("click", function() {
				multimenu.classList.remove(multimenu.classList);
				multimenu.classList.add("default");
				multimenu_opened = false;
				close_all_check()
			});
		}
	}


	function multimenu_show(el) {
		length = el.length;

		for(i = 0; i < length; i += 1) {
			el[i].addEventListener("click", function() {
				multimenu.classList.remove(multimenu.classList);
				multimenu.classList.add(this.classList[1]);
				multimenu_opened = true;
				close_all_check();
			});
		}
	}
})();