(function(){
	var show_hide_panos, multimenu, select_lang, multimenu_controls, select_size, i, length, elems, tutorial, photo_container;
	var multimenu_opened = false;
	var panos_opened = false;
	tutorial = document.getElementById("tutorial");
	show_hide_panos = document.getElementById('show_hide_panos');
	multimenu = document.getElementById('multimenu');
	select_lang = multimenu.getElementsByClassName('lang')[0];
	multimenu_controls = multimenu.getElementsByClassName("icons_minimals")[0];
	photo_container = document.getElementsByClassName("photo_container")[0];

	elem_position();

	window.onresize = function() {
		elem_position()
	}
	window.onload = function () {
		if(!localStorage.getItem('player'))
			tutorial.classList.add("active");
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
			console.log(arr[i]);
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

			}else if(this.classList.contains("phonto_marker")){

			}
			this.classList.add('hide')
		});
	}

	function show_loader() {
		document.getElementById("loader").classList.add("active");
	}
	function hide_loader() {
		document.getElementById("loader").classList.remove("active");
	}

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

	//выбор языка в раскрытом мультименю
	elems = document.getElementById("more_info").getElementsByClassName("lang")[0].getElementsByTagName("a");
	length = elems.length;
	for(i = 0; i < length; i += 1) {
		elems[i].addEventListener("click", function() {
			var buf = this.parentNode.getElementsByTagName("a");
			for(var j = 0; j < buf.length; j += 1) {
				buf[j].classList.toggle("active");
			}
		});
	}

	elems = multimenu_controls.getElementsByClassName("icon");
	multimenu_show(elems);

	elems = document.getElementById("more_info").getElementsByClassName("menu")[0].getElementsByClassName("elem");
	multimenu_show(elems);
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

	//показать влкадку с подписями к иконкам
	document.getElementById("default").getElementsByClassName("info")[0].addEventListener("click", function(){
		multimenu_show_block("more_info");
	});

	select_size = multimenu.getElementsByClassName("check_size")[0].getElementsByClassName("select")[0];

	select_size.getElementsByClassName("title")[0].addEventListener("click", function() {
		select_size.classList.toggle("active");
	});

	elems = select_size.getElementsByClassName("option");
	length = elems.length;

	for(i = 0; i < length; i += 1) {
		elems[i].addEventListener("click", function(){
			select_size.getElementsByClassName("title")[0].getElementsByClassName("txt")[0].innerHTML = this.innerHTML;
			multimenu.getElementsByClassName("html-code")[0].getElementsByClassName("code")[0].innerHTML = '&lt;iframe width="'+this.innerHTML.split("x")[0]/1+'" height="'+this.innerHTML.split("x")[1]/1+'" frameborder="0" src="http://placeview.in/pano/1392"&gt &lt;/iframe&gt';
			select_size.classList.toggle("active");
		});
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
		document.getElementsByClassName("slides")[0].style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
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