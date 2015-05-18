(function(){
	document.getElementsByClassName("slides")[0].style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
	window.onresize = function() {
		document.getElementsByClassName("slides")[0].style.height = window.innerHeight-document.getElementById("top_menu").clientHeight + "px";
	}
	document.getElementById("show_hide_panos").addEventListener("click", function(){
		this.classList.toggle('active')
	});
})();