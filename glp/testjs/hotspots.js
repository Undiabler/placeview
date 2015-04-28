function getTexture(e, eid) {
    var rez = "vtourskin_hotspot.png";
    switch (e) {
        case 0:
            rez = 'vtourskin_hotspot.png';
            if (eid != undefined)
                if (!verifycolor(eid))
                    rez = 'vtourskin_hotspot_out.png';
            break;
        case 1:
            rez = 'info.png';
            break;
        case 2:
            rez = 'info_photo.png';
            break;
        case 3:
            rez = 'info_video.png';
            break;
        case 4:
            rez = 'info_audio.png';
            break;
        case 11:
            rez = 'flag.png';
            break;
    }
    return rez;
}



$(function() {
    $('#add_transition').click(addHotspot);  //добавить переход
    $('#del_arrow').click(function() {  //удалить переход
        removelast();
        savePointsJ();
        $('.transition_arrow').hide();
    });

    $('.add_blocks').children('li').click(addHotspot);


    /**
        Функция создает точку, отправляет координаты на сервер, в замен получает хтмл структуру блока
        делает точку движимой и сохраняет в точку последний идентификатор
        */


    function addHotspot() {
        var idblock = $(this).attr('id');
        
        
        if (idblock == 1 || idblock == 2 || idblock == 3 || idblock == 4) {

            var block_container = ".infoblocks_from_server";
            $('.add_blocks').hide();
            createpoint(Number(idblock));
            lastpointmoveOK();

        } else if (idblock == undefined || idblock == null || idblock == NaN) {
            Notify("Undefined type of block");
        } else {
            createpoint(0);
            $('.add_blocks, .add-block-center, .add_advertising').hide();
            lastpointmoveOK();
            var block_container = ".transition_arrow";
        }

        $.ajax({
            url: "/hotspots/hotspots/addHotspot",
            type: 'post',
            data: {
                x: lastpoint.position.x,
                y: lastpoint.position.y,
                z: lastpoint.position.z,
                pano_id: _plvE.pid,
                type: lastpoint.data.type,
            },
            success: function(data) {
                $(block_container).append(data);
                $(block_container).show();
                var id = data.match(/hotspot_id_\d+/);
                id = String(id).match(/\d+/);
                lastpoint.data.id = Number(id);
                movelast = true;
                
                //При клике вне блока
                hideClickBody($('.add-edit-video'), '.add-edit-video,.add-foto-video');

                //ЦЕНТЕР ИНФО-БЛОКИ
                 centerHotspot($('.all_blocks_inf'));
            },
            error: function(data) {
                Notify("Ошибка добавления блока");
                console.error(data.responseText);
            }
        });
    }
});


function savepoint(id) {
    if (movelast) lastpointmoveOK();

    var pointdata = {
        id: id,
        x: lastpoint.position.x,
        y: lastpoint.position.y,
        z: lastpoint.position.z,
        angle_rotation: lastpoint.data.rotangle,
        type: lastpoint.data.type,
        pano_id: _plvE.pid,
        content: {
            title: "",
            description: "",
            url: "",
            media: "",
            back_id: lastpoint.data.back_id,
            hview: "",
            vview: "",

        },
        chview: _plvE.lon,
        cvview: _plvE.lat,
        module: 0,
        status: 0
    }
    var validate = true;
    var hotspot_data = $("#hotspot_id_" + id);
    /**
Если тип хотспота стрелка, тогда указывает класс стрелок перехода,
забираем панораму в которую будет переход или введенный вручную урл панорамы
*/
    if (hotspot_data.attr("data-type") == "0") {
        var block_container = ".transition_arrow";
        var other_url = hotspot_data.find("input[name='transition_url']").val();
        var transition_pano = hotspot_data.find("select[name='transition_pano']").val();
        /**
Если есть ракурс панорамы, проверяем наличие вручную вписанного урла панорамы,
 тогда забираем номер панорамы этого урла,
 иначе забираем номер панорамы из списка.
 Если ракурс не выбран - ругаемся
*/
        if (hotspot_data.attr('data-hview') && hotspot_data.attr('data-vview')) {
            var transition_url = (other_url.length > 3) ? other_url.match(/\d+/)[0] : transition_pano;
            pointdata.content.url = transition_url;
            pointdata.content.hview = hotspot_data.attr('data-hview');
            pointdata.content.vview = hotspot_data.attr('data-vview');
        } else {
            validate = false;
            var errorMessage = "Выберите ракурс перехода";
        }
    }

    /**
Следующий код действует, для инфоблоков с текстом, фото или видео
*/
    if ((hotspot_data.attr("data-type") == "1") || (hotspot_data.attr("data-type") == "2") || (hotspot_data.attr("data-type") == "3") || (hotspot_data.attr("data-type") == "4")) {

        var block_container = ".infoblocks_from_server";
        pointdata.content.title = hotspot_data.children("input[name='title']").val() || "";
        pointdata.content.description = hotspot_data.children("textarea[name='description']").val() || "";
        /**
Скрипт проходится по Лишка и забирает беграунд урл
 и при помощи регулярки парсит урл картинок,
 пишет в стек
*/
        if (hotspot_data.attr("data-type") == "2") {
            // var photo_reg_pattern = /(.*?)\/panos\/pic\/(\d+)_(\d+)(\.min)?\.(.*?)\)(.*?)/;
            // var photo_replac = "/panos/pic/$2_$3.min.$5";
            var mediatring = [];
            var media = hotspot_data.find("#album_id_"+id).children('li');
            media.each(function(i) {
                var url = $(this).children('img').attr('src');
                if (url) mediatring.push(url);
            });
            pointdata.content.media = mediatring;
        }
        /**
Скрипт проходится по картинкам и забирает урлы видео, пишет в стек
*/
        if (hotspot_data.attr("data-type") == "3") {
            var mediatring = [];
            var media = hotspot_data.find("#album_id_"+id).children('li');
            media.each(function(i) {
                mediatring.push($(this).attr('data-url'));
            });
            pointdata.content.media = mediatring;
        }

        if (hotspot_data.attr("data-type") == "4") {
            var mediatring = [];
            var media = hotspot_data.find("#audio_url_"+id);

            mediatring.push(media.val());

            pointdata.content.media = mediatring;
        }
    }
    //если прошло валидацию шлет данные на сервер
    if (validate) {
        $.ajax({
            url: "/hotspots/hotspots/updateHotspotInfo",
            type: 'post',
            dataType: "json",
            data: {
                hotspot_id: id,
                info: JSON.stringify(pointdata)
            },
            success: function(data) {
                Notify(data.message, "rok");
                lastpoint.data.back_id = data.server.content.back_id;
                $(block_container + ", #hotspot_id_" + id).hide();
            },
            error: function(data) {
                Notify("Ошибка сохранения блока");
                console.error(data.responseText);
            }
        });
    } else {

        Notify("Invalid parameters!");

    }
}

function deletepoint(id) {
    var hotspot_data = $("#hotspot_id_" + id);
    var block_container = (hotspot_data.attr("data-type") == "0") ? ".transition_arrow" : ".infoblocks_from_server";
    $.ajax({
        url: "/hotspots/hotspots/deleteHotspot",
        type: 'get',
        data: {
            hotspot_id: id
        },
        success: function(data) {
            removelast();
            $("#hotspot_id_" + id).remove();
            $(block_container).hide();
        },
        error: function(data) {
            Notify("Error");
            console.error(data.responseText);
        }
    });
}


//----------------User-hotspots!------------------
function ClickFU(iy) {
    if (iy < points.length) {
        switch (points[iy].data.type) {
            case 0:
                // location.href = "/pano/" + points[iy].data.url;
                // console.log(points[iy].data.url.match(/(\d+)/)[1]);
                var id=points[iy].data.url;
                var h=points[iy].data.h;
                var v=points[iy].data.v;

                if ( window.history && history.pushState && verifycolor(id) && !_plvE.framed) {
                    _plvE.gotopano(id,h,v);
                    var nwt=document.title.replace(/(— )([^—]*?)$/,'$1'+$('#listpano'+id+' .title-all-pano').html());
                    document.title=nwt;
                    history.pushState(null,nwt,'/pano/'+id+'#h:'+h+'v:'+v);
                    loadDynamic(id);
                } else {
                   if (!_plvE.framed) 
                        location.href = "/pano/"+id+"#h:"+h+"v:"+v;
                    else
                        location.href = "/framepano/"+id+"#h:"+h+"v:"+v;
                }
                break;

            case 1:
                pv.callIBtext(points[iy].data.id);
            break;

            case 2:
                pv.callIBfoto(points[iy].data.id);
                break;

            case 3:
                pv.callIBvideo(points[iy].data.id);
                break;

            case 4:
                pv.callIBaudio(points[iy].data.id);
                break;
                
            case 11:
                if (!movelast) pv.openItemMenu(11);
                break;
            default:
                console.error('error engine clickfu type not found');
                break;


        }

    }
}

//----------------Admin-hotspots!------------------
function ClickFU_admin(iy) {
    if (iy < points.length) {
        lastpoint = points[iy];
        var hotspot_id = points[iy].data.id;
        switch (points[iy].data.type) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                var block_container = (points[iy].data.type == 0) ? ".transition_arrow" : ".infoblocks_from_server";
                var isContent = $("#hotspot_id_" + hotspot_id).html();
                if (isContent) {
                    $(block_container).show();
                    $("#hotspot_id_" + hotspot_id).show();
                } else {
                    //todo поменять на загрузчик
                    $.get("/hotspots/hotspots/getHotspotData", {
                            hotspot_id: hotspot_id
                        },
                        function(html) {
                            //todo поменять на загрузчик
                            $(block_container).append(html);
                            $(block_container + ", #hotspot_id_" + hotspot_id).show();
                            shiftFotoVideo(hotspot_id);
                        });
                }
                movelast = true;
                break;
            default:
                alert("error engine.js switch lastpoint = " + lastpoint.data.type)
                break
        }
    }

}