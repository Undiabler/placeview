$(function() {
	$(".hover_menu button.hide_show").click(function(){
		$(this).parent().toggleClass("minified");
		$(this).parent().children(".menu_body").fadeToggle();
	})
});