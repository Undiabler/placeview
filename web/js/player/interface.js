function ITour(options){

	var self = this;
	this.tour_id = options.tour_id;
	this.pano_id = options.pano_id;
	this.pano_url = options.pano_url || false;
	this.newurl = options.newurl || false;
	this.elem_id = "krpanoViewer";

	this.history = function(newurl,title){
		title = title || document.title;
		if (window.history && window.history.replaceState)
	        window.history.replaceState( null , title, newurl );
	    else 
	    	console.warn("History: "+newurl);
	}

	this.hash_upd = function(hlookat,vlookat){
		var c = hlookat/360;
		if (Math.abs(c)>1) hlookat=hlookat-Math.ceil(c)*360;
		if (hlookat<-180) hlookat+=360;
		if (hlookat>180) hlookat-=360;	
		var lhr = location.href;
		if (lhr.indexOf("#")>=0) {
			lhr=lhr.substr(0,lhr.indexOf("#"));
		}
		var newurl=lhr+'#h:'+Math.round(hlookat)+'v:'+Math.round(vlookat);
		self.history(newurl);
	}

	embedpano({swf:"/krpano/krpano.swf",
		id:self.elem_id, 
		xml:"/tour-xml/tour_"+self.tour_id+"_"+self.pano_id+".xml", 
		target:"pano", 
		html5:"auto", 
		passQueryParameters:false
	});  

	this.get_krpano = function(){
		return document.getElementById(self.elem_id);
	}
	this.call = function(_eval){
		var krpano = self.get_krpano();
		if (krpano && typeof(krpano.call) == "function") krpano.call(_eval); else console.warn("Failed to execute:",_eval);
	}

	this.block = function(id){
		console.log('Открывается блок : '+id);
		window.ui.show_info_block(id)
	}

	this.scene = function(url){
        var newurl = location.href.replace(/(place\/[a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)/, '$1/'+url);
    	self.history(newurl);
	}
		 
	this.onload = function(){
		temp=location.hash.match(/h:(-?\d+)/);
        var h=parseInt(temp&&temp.length>0?temp[1]:0)||0;
        temp=location.hash.match(/v:(-?\d+)/);
        var v=parseInt(temp&&temp.length>0?temp[1]:0)||0;

        if (self.newurl){
	        var newurl = location.href.replace(/(place\/[a-zA-Z0-9-]+)/, '$1/'+self.newurl)
        	self.history(newurl);
        }

		self.call("set(view.hlookat,"+h+");set(view.vlookat,"+v+");");
	}

		
}