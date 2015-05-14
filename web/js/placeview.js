$(function() {
	function view_tags(tags){
		res = '';
		for(var i = 0; i < tags.length; i++) {
			res += '<a href="'+tags.link+'">'+tags[i].name+'</a>'
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
		});
		var res = '<div class="pano_item item"><div class="preview"><img src="'+pano.preview_url+'">              </div><div class="info"><div class="description">'+pano.descr+' </div><div class="social"><a href="#"><i class="fa fa-heart"></i> '+social.liks+'</a><a href=""><i class="fa fa-clock-o"></i> '+social.last_online+'</a><a href=""><i class="fa fa-picture-o"></i> '+social.pano_amount+'</a></div></div><div class="clearfix"></div><div class="author"><div class="avatar"><img src="img/avatar.jpg"></div><div class="name"><sub>Автор</sub><br/><a href="'+author.link+'">'+author.name+'</a></div><div class="tags">'+view_tags(pano.tags)+'</div></div></div>';
		min.append(res);
	}
	$(".me").click(function(){
		$(this).toggleClass("active");
	});
	$(".hover_menu button.hide_show").click(function(){
		$(this).parent().toggleClass("minified");
		$(this).parent().children(".menu_body").fadeToggle();
	});
	$(".toombler .elem").click(function(){
		$(".toombler .elem").each(function(){
			$(this).toggleClass("active");
		});
		$(".pers_data_block").toggleClass("active");
		$(".portfolio").toggleClass("active");
	});
	$(".checkbox_cont").click(function(){
		$(this).children("input[type='checkbox']").click();
	});
	$(".checkbox_cont input[type='checkbox']").click(function(){
		$(this).click();
	})
});