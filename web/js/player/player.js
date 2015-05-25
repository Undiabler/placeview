(function(){
	var show_hide_panos, multimenu, select_lang, multimenu_controls, select_size, i, length, elems;
	show_hide_panos = document.getElementById('show_hide_panos');
	multimenu = document.getElementById('multimenu');
	select_lang = multimenu.getElementsByClassName('lang')[0];
	multimenu_controls = multimenu.getElementsByClassName("icons_minimals")[0];

	elem_position();
	
	window.onresize = function() {
		elem_position()
	}
	show_hide_panos.getElementsByClassName('hide')[0].addEventListener('click', function(){
		this.parentNode.classList.remove('active');
	})
	show_hide_panos.getElementsByClassName('show')[0].addEventListener('click', function(){
		this.parentNode.classList.add('active');
	});
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

	multimenu_controls.getElementsByClassName("show_on_map")[0].addEventListener("click", function() {
		multimenu.classList.remove(multimenu.classList);
		multimenu.classList.add("show_on_map");
	});

	elems = multimenu_controls.getElementsByClassName("icon");

	length = elems.length;

	for(i = 0; i < length; i += 1) {
		elems[i].addEventListener("click", function() {
			multimenu.classList.remove(multimenu.classList);
			multimenu.classList.add(this.classList[1]);
		});
	}
	
	elems = document.getElementById("more_info").getElementsByClassName("menu")[0].getElementsByClassName("elem");

	length = elems.length;

	for(i = 0; i < length; i += 1) {
		elems[i].addEventListener("click", function() {
			multimenu.classList.remove(multimenu.classList);
			multimenu.classList.add(this.classList[1]);
		});
	}

	elems = multimenu.getElementsByClassName("back_button");

	length = elems.length;	 

	for(i = 0; i < length; i += 1) {
		elems[i].addEventListener("click", function() {
			multimenu.classList.remove(multimenu.classList);
			multimenu.classList.add("default");
		});
	}

	elems = multimenu.getElementsByClassName("control");

	length = elems.length;	 

	for(i = 0; i < length; i += 1) {
		elems[i].getElementsByClassName("fa-times")[0].addEventListener("click", function() {
			multimenu.classList.remove(multimenu.classList);
			multimenu.classList.add("default");
		});
	}

	document.getElementById("default").getElementsByClassName("info")[0].addEventListener("click", function(){
		multimenu.classList.remove(multimenu.classList);
		multimenu.classList.add("more_info");
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

/*
	.addEventListener('click',function(){
		alert(this.innerHTML)
	});
*/
	function elem_position() {
		document.getElementsByClassName("slides")[0].style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
	}
})();