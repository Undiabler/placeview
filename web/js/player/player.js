(function(){
	elem_position();
	
	window.onresize = function() {
		elem_position()
	}
	document.getElementById('show_hide_panos').getElementsByClassName('hide')[0].addEventListener('click', function(){
		this.parentNode.classList.remove('active');
	})
	document.getElementById('show_hide_panos').getElementsByClassName('show')[0].addEventListener('click', function(){
		this.parentNode.classList.add('active');
	});
	function elem_position() {
		document.getElementsByClassName("slides")[0].style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
	}
})();