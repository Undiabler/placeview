$(function() {
	function view_tags(tags){
		res = '';
		for(var i = 0; i < tags.length; i++) {
			res += '<a href="#">'+tags[i]+'</a>'
		}
		return res;
	}
	function add_pano_feed(pano,social,author) {
		var min = 0;
		var min_el = null;
		$(".pano_feed .pano_container").each(function(){
			if(min >= $(this).height()) {
				min_el = $(this);
				min = $(this).height();
			}
		})
		var res = '<div class="pano_item"><div class="pano_previe"><img src="img/livadia.jpg"></div><div class="info"><div class="description">'+pano.description+'</div><div class="social"><a href="#"><i class="fa fa-heart"></i> '+social.liks+'</a><a href=""><i class="fa fa-clock-o"></i> '+social.last_online+'</a><a href=""><i class="fa fa-picture-o"></i> '+social.photos+'</a></div></div><div class="clearfix"></div><div class="author"><div class="avatar"><img src="'+author.avatar+'"></div><div class="name"><sub>Автор</sub><br/><a href="#">'+author.name+'</a></div><div class="tags">'+view_tags(pano.tags)+'</div></div></div>';
		min.append(res);
	}
	$(".me").click(function(){
		$(this).toggleClass("active");
	});
	$(".hover_menu button.hide_show").click(function(){
		$(this).parent().toggleClass("minified");
		$(this).parent().children(".menu_body").fadeToggle();
	});
});