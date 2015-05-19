(function(){
	var show_hide_panos, multimenu, select_lang;
	show_hide_panos = document.getElementById('show_hide_panos');
	multimenu = document.getElementById('multimenu');
	select_lang = multimenu.getElementsByClassName('lang')[0];
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