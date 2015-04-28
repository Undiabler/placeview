function loadPointsJ(server) {
    for (var i = 0; i < server.length; i++) {
        createpoint(server[i].type);
        movelast = false;
        lastpoint.position.x = Number(server[i].x);
        lastpoint.position.y = Number(server[i].y) ;
        lastpoint.position.z = Number(server[i].z) ;
       
        lastpoint.data.url = server[i].content.url;
        lastpoint.data.h = server[i].content.hview;
        lastpoint.data.v = server[i].content.vview;
        lastpoint.data.rotangle = Number(server[i].angle_rotation);
        // lastpoint.data.Vangle = server[i].Vangle;
        lastpoint.data.type = Number(server[i].type);
        lastpoint.data.flag = 0;
        lastpoint.data.id = server[i].id;
        lastpoint.data.back_id = server[i].content.back_id;
        lastpoint.data.hint = server[i].content.hint;

        lastpoint.data.text_title = server[i].text_title;
        lastpoint.data.text_description = server[i].text_description;
        lastpoint.data.text_info = server[i].text_info;
        lastpoint.data.text_phone = server[i].text_phone;
        lastpoint.data.text_email = server[i].text_email;
        lastpoint.data.user_action = server[i].user_action;
        lastpoint.data.block_status =  server[i].block_status
        lastpoint.data.media = server[i].media;

        lastpoint.lookAt(_plvE.camera.position);
        updateidiv(lastpoint);
        // lastpoint.rotation.z += THREE.Math.degToRad(-lastpoint.data.rotangle);
    }
}

function loadmeet(x,y,z,loon,laat,title,text,image) {

                createpoint(11);
                movelast = false;
                lastpoint.position.x = x ;
                lastpoint.position.y = y ;
                lastpoint.position.z = z ;
                lastpoint.data.type = 11;
                lastpoint.data.flag = 0;
                lastpoint.data.hint = title;
                lon=loon;
                lat=laat;

                updateidiv(lastpoint);
                target.x=x;
                target.y=y;
                target.z=z;

                var ttitle=document.getElementById("showmeettitle");
                var ttext=document.getElementById("showmeettext");
                ttitle.innerHTML=title;
                ttext.innerHTML=text;
                if (image!="Null") ttext.innerHTML="<img src="+image+" alt=\"\" />"+ttext.innerHTML;
                pv.openItemMenu(11);
}
var cachedpanodata=[];
function loadDynamic(id){

    $('.container-all-pano li').removeClass('active');
    $('#listpano'+id).addClass('active');
    removeall();

    if (cachedpanodata[id]!=undefined){
            console.log('load from cache!');
            loadPointsJ(cachedpanodata[id].hotspots);
            $('#allhotspots').html(cachedpanodata[id].rendered);
            makeviews(cachedpanodata[id].angle[0],cachedpanodata[id].angle[1]);
    } else {
        $.ajax({
            url:'/panos/panoView/GetHotspots?pano_id='+id,
            dataType:'json',
            success:function(data){
                loadPointsJ(data.hotspots);
                $('#allhotspots').html(data.rendered);
                makeviews(data.angle[0],data.angle[1]);

                cachedpanodata[id]=data;
            }
        });
    }
}