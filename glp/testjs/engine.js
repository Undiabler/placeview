/**
 * @author Undiabler   Undiabler@gmail.com
 * http://www.rainbowcore.it
 */
 "use strict";
var 
    lastpoint, 
    points = [],
    reklammapoints = [],
    btexture = 0,
    adminmode = false,
    debuginfo = true,


    rightstab, leftstab, valstab = 40,
    reklamma = false,
    downmin = 70,
    upmin = 70,
    flaginvite = false;


var panoJsonSavers = {
    hotspotsaver: '',
    loadmodule: '',
    reklamasaver: ''
}

var loadedN=0;
var target = new THREE.Vector3(); //target for camera view

//end main var ----------------

if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

            window.setTimeout( callback, 1000 / 60 );

        };

    } )();
}

function makesavers(htsaver, rksaver, loadmodule) {

    panoJsonSavers.hotspotsaver = htsaver;
    panoJsonSavers.loadmodule = loadmodule;
    panoJsonSavers.reklamasaver = rksaver;
}

function makeviews(down, up) {
    downmin = down;
    upmin = up;
}

function makeimages(sizesmall,idtour,idpano) {
    var path='http://img.placeview.in/tours/'+idtour+'/'+ idpano+'/',m='mobile',p='pano';
    if (sizesmall) {
        return {
                ECLmain : path+'Eclsmall.jpg',
                Cface   : path+m+'_f.jpg',
                Cback   : path+m+'_b.jpg',
                Cright  : path+m+'_r.jpg',
                Cleft   : path+m+'_l.jpg',
                Cup     : path+m+'_u.jpg',
                Cdown   : path+m+'_d.jpg'
            }
    } else {
        return {
                ECLmain : path+'Eclbig.jpg',
                Cface   : path+p+'_f.jpg',
                Cback   : path+p+'_b.jpg',
                Cright  : path+p+'_r.jpg',
                Cleft   : path+p+'_l.jpg',
                Cup     : path+p+'_u.jpg',
                Cdown   : path+p+'_d.jpg'
            }
    }
}

function Addlog(e) {
    //if (debuginfo==true) document.getElementById('debuginfo').innerHTML += e + '<br>';
}
var rotrare;

function ENGINEload(tid,pid,fullscreen) {

    var self=this;
    this.tid=tid;
    this.pid=pid;
    this.framed=(window.location != window.parent.location);
    
    window['_plvE']=this;

this.hashUPD=function(){
    // location.hash='h:'+Math.round(self.lon)+'v:'+Math.round(self.lat);
    var newurl=location.pathname+'#h:'+Math.round(self.lon)+'v:'+Math.round(self.lat);
    if (window.history && window.history.replaceState) 
        window.history.replaceState( null , document.title, newurl );
    // console.log(newurl);
}
this.setLonLat=function(ln,lt){
    if (ln!=undefined) {
        self.lon=ln;
        if (self.lon>360) self.lon-=360;
        if (self.lon<0) self.lon+=360;
    }
    if (lt!=undefined) {
        self.lat=lt;
    }
    if ((ln||lt)!=undefined) {
        self.saferender();
    }          
}

this.setspeedX=function(e){
  self.navigate.setspeedX(e);  
}

this.setFov=function(modifier){
    
    self.fov+=modifier;

    self.fov = Math.max( self.maxfov, Math.min( 70, self.fov ) );

    self.camera.projectionMatrix.makePerspective( self.fov, self.CWIDTH / self.CHEIGHT, 1, 1000 );

    self.camera.fov = self.fov;

    self.saferender();
}

this.init=function(){
  
    self.lon = self.lat = 0;
    self.fov = 70;
    self.idw=50;
    self.maxfov=50;
    self.container = document.getElementById('container');
    self.renderer=false;
    self.mesh=[];
    self.CWIDTH = $(container).width();
    self.CHEIGHT = $(container).height();
}

this.saferender=function(){
    requestAnimationFrame(function(){_plvE.render();});
}

this.initCanvas_Cube=function() {
    
    loadedN=0; loaderStart();
    var materials = [

        self.loadTexture( self.panoimagedata.Cright ) ,// right
        self.loadTexture( self.panoimagedata.Cleft  ) , // left
        self.loadTexture( self.panoimagedata.Cup    ) ,   // top
        self.loadTexture( self.panoimagedata.Cdown  ) , // bottom
        self.loadTexture( self.panoimagedata.Cface  ) , // front
        self.loadTexture( self.panoimagedata.Cback  ) // back

    ];

    self.mesh[0] = new THREE.Mesh( new THREE.BoxGeometry( 50, 50, 50, 10, 10, 10), new THREE.MeshFaceMaterial( materials ) );
    self.mesh[0].scale.x = - 1;
    self.mesh[0].data={materials:materials};
    self.scene.add( self.mesh[0] );

    if (!self.renderer) self.renderer = new THREE.CanvasRenderer();
}

this.init3DCSS=function() {

    Addlog('3D CSS loaded...');

    loadedN=0; loaderStart();
    var sides = [{
        url: self.panoimagedata.Cright,
        position: [-512, 0, 0],
        rotation: [0, Math.PI / 2, 0]
    }, {
        url: self.panoimagedata.Cleft,
        position: [512, 0, 0],
        rotation: [0, -Math.PI / 2, 0]
    }, {
        url: self.panoimagedata.Cup,
        position: [0, 512, 0],
        rotation: [Math.PI / 2, 0, Math.PI]
    }, {
        url: self.panoimagedata.Cdown,
        position: [0, -512, 0],
        rotation: [-Math.PI / 2, 0, Math.PI]
    }, {
        url: self.panoimagedata.Cface,
        position: [0, 0, 512],
        rotation: [0, Math.PI, 0]
    }, {
        url: self.panoimagedata.Cback,
        position: [0, 0, -512],
        rotation: [0, 0, 0]
    }];
    
    for (var i = 0; i < sides.length; i++) {

        var side = sides[i];

        var element = document.createElement('img');
        element.width = 1026; // 2 pixels extra to close the gap.
        element.src = side.url;

        var object = new THREE.CSS3DObject(element);
        object.position.fromArray(side.position);
        object.rotation.fromArray(side.rotation);
        self.scene.add(object);
        self.mesh[i]=object;

        element.onload = function() {
         loadedN++;
            if (loadedN==6) {
                _plvE.saferender();
                self.navigate.setfirstmovement();
                loaderEnd();
            } 
        };
        element.onerror = function() { element.src = side.url; };

        }

    if (!self.renderer) self.renderer = new THREE.CSS3DRenderer();
}

this.initWEBGL_Cube=function() {

    Addlog('WebGL2 loaded...');

    loadedN=0; loaderStart();
    var materials = [

        self.loadTexture( self.panoimagedata.Cright ) ,// right
        self.loadTexture( self.panoimagedata.Cleft  ) , // left
        self.loadTexture( self.panoimagedata.Cup    ) ,   // top
        self.loadTexture( self.panoimagedata.Cdown  ) , // bottom
        self.loadTexture( self.panoimagedata.Cface  ) , // front
        self.loadTexture( self.panoimagedata.Cback  ) // back

    ];

    self.mesh[0] = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000, 0, 0, 0 ), new THREE.MeshFaceMaterial( materials ) );
    self.mesh[0].scale.x = - 1;
    self.mesh[0].data={materials:materials};
    self.scene.add( self.mesh[0] );

   if (!self.renderer) self.renderer = new THREE.WebGLRenderer();
   
    // self.renderer = new THREE.SoftwareRenderer3();

}

this.render=function() {
    if (loadedN<6) return;
    //-----------------camera render------------------
    self.lat = Math.max(-downmin, Math.min(upmin, self.lat));
    if ((reklamma) && (movelast)) self.lat = 0;
    var phi = THREE.Math.degToRad(90 - self.lat);
    var theta = THREE.Math.degToRad(self.lon);

    target.x = 500 * Math.sin(phi) * Math.cos(theta);
    target.y = 500 * Math.cos(phi);
    target.z = 500 * Math.sin(phi) * Math.sin(theta);

     self.camera.lookAt(target);
    //----------------end-camera-render-------------

    if (movelast) {

        lastpoint.position.x = target.x;
        lastpoint.position.y = target.y;
        lastpoint.position.z = target.z;

    }

    if ((reklamma) && (movelast)) {


        rightstab.position.x = 0.99 * 500 * Math.sin(phi) * Math.cos(THREE.Math.degToRad(lon + valstab));
        rightstab.position.z = 0.99 * 500 * Math.sin(phi) * Math.sin(THREE.Math.degToRad(lon + valstab));
        rightstab.position.y = 0.99 * 500 * Math.cos(phi);;


        leftstab.position.x = 0.99 * 500 * Math.sin(phi) * Math.cos(THREE.Math.degToRad(lon - valstab));
        leftstab.position.z = 0.99 * 500 * Math.sin(phi) * Math.sin(THREE.Math.degToRad(lon - valstab));
        leftstab.position.y = 0.99 * 500 * Math.cos(phi);;

        rightstab.lookAt(camera.position);
        leftstab.lookAt(camera.position);
        renderAxispos();
    }

    self.renderer.render(self.scene, self.camera);
    self.renderPointPos();
    // renderReklammaPos();
    //if (typeofENGINE==1) camera.updateProjectionMatrix();
}

this.removeobj=function(e){
    self.scene.remove(e);
}

this.loadTexture=function(path, extracallback) {
    // THREE.ImageUtils.crossOrigin = "anonymous";
    // var texture_placeholder;
    // var texture = new THREE.Texture(texture_placeholder);
    var material = new THREE.MeshBasicMaterial({
        // map: texture,
        overdraw: true
    });

    var image = document.createElement('img');
    image.crossOrigin = 'Anonymous';
    image.onload = function() {
        var texture = new THREE.Texture(this);
        texture.needsUpdate = true;
        material.map = texture; 
        material.data={texture:texture};
        // texture.needsUpdate = true;
        // material.map.image = this;
        loadedN++;
         
            if (loadedN==6) {
                self.saferender();
                self.navigate.setfirstmovement();
                loaderEnd();
            }
    };
    var errload=0;
    image.onerror = function(){
        console.warn('Looks like crossOrigin error. Reload...');
        if (errload<3)
            image.src = path;
        errload++;
    }

    image.src = path;


    return material;
}

this.renderPointPos=function() {
    function testangle(p1, p2) {
        var angle = (p1.x * p2.x + p1.z * p2.z) / (Math.pow((Math.pow(p1.x, 2) + Math.pow(p1.z, 2)), 0.5) * Math.pow((Math.pow(p2.x, 2) + Math.pow(p2.z, 2)), 0.5));
        return Math.acos(angle) < 1.5707963267948966; //MAGIC!!!!
    }
    var len = points.length;

    for (var i = 0; i < len; i++) {

        if (testangle(points[i].position, target) || (movelast && points.indexOf(lastpoint) == i)) {

            var width = self.CWIDTH,
                height = self.CHEIGHT;
            var widthHalf = width / 2,
                heightHalf = height / 2;

            var vector = new THREE.Vector3();
            var projector = new THREE.Projector();

            projector.projectVector(vector.setFromMatrixPosition(points[i].matrixWorld), self.camera);

            vector.x = (vector.x * widthHalf) + widthHalf;
            vector.y = -(vector.y * heightHalf) + heightHalf;

            var sdvig = 0;

            if (((vector.x > self.CWIDTH) || (vector.x < 0)) || ((vector.y > self.CHEIGHT) || (vector.y < 0)) || (points[i].data.flag == 3)) {
                document.getElementById('idiv' + i).style.left = -50 + 'px';
                document.getElementById('idiv' + i).style.top = -50 + 'px';
                document.getElementById('idiv' + i).style.display = 'none';


            } else {
                document.getElementById('idiv' + i).style.display = 'block';
                document.getElementById('idiv' + i).style.left = (vector.x + sdvig - (self.idw / 2)) + 'px';
                document.getElementById('idiv' + i).style.top = (vector.y + sdvig - (self.idw / 2)) + 'px';
            }


        } else document.getElementById('idiv' + i).style.display = 'none';
    }
}

this.getAngleX=function() {
    return Math.round(self.lon);
}

this.getAngleY=function() {
    return Math.round(self.lat);
}

this.gotopano=function(id,h,v){

    bindonce();

    if (h!=undefined && v!=undefined){
        self.lon=parseInt(h)||0;
        self.lat=parseInt(v)||0;
    }


    for (var i = 0; i < self.mesh.length; i++) {
      self.scene.remove(self.mesh[i]);
      if (self.mesh[i].geometry) {                                                                                    
            self.mesh[i].geometry.dispose();
        } 
      if (self.mesh[i].data&&self.mesh[i].data.materials)
      for (var j = 0; j < self.mesh[i].data.materials.length; j++) {
          self.mesh[i].data.materials[j].dispose();
          self.mesh[i].data.materials[j].data.texture.dispose();
      };
    }
      self.panoimagedata=makeimages(self.smallimage,self.tid,self.pid=id);
      switch (self.loadedtype) {
                    case 2:
                        self.initWEBGL_Cube();
                        break;
                    case 1:
                        self.init3DCSS();
                        break;
                    case 0:
                        self.initCanvas_Cube();
                        break;
                } 
        
}

this.changequality=function(){

    if (Modernizr.localstorage){
        localStorage["newview"]=!self.smallimage;
        location.reload();
    }
}
this.setquality=function(rez){
    var itb=0;
    var maxrez=(screen.width+screen.height);

    var mainrule=(maxrez>=2100 && rez/maxrez>=0.91);
    var subrule=(maxrez>=1600 && rez/maxrez>=0.85);
    if (Modernizr.localstorage){
        if (localStorage["newview"] == "true") itb=2;
        if ((localStorage["newview"] == "false") && subrule) itb=1;
    }
    switch (itb){
        case 0:
            if ( mainrule )
                self.smallimage = false;
             else
                self.smallimage = true;
        break;
        
        case 1:
            self.smallimage = false;
        break;
        
        case 2:
            self.smallimage = true;
        break;
    }
    self.panoimagedata=makeimages(self.smallimage,self.tid,self.pid);
    if (self.smallimage==true) self.maxfov=50; else self.maxfov=35; 
    //console.log(self.smallimage);
}

//-------------------Start--loadngine------------------------------------

    this.init();
    if (tid==undefined||pid==undefined) return;

    if (fullscreen) {
        this.fullscreenR = fullscreen;
        // this.container.style.width = window.innerWidth + 'px';
        // this.container.style.height = window.innerHeight + 'px';
        // this.container.style.left = '0px';
        // this.container.style.top = '0px';
    }


    this.detectplace=((navigator.userAgent.indexOf('Mac')!= -1)?['css3D','webgl','canvas']:
        [
        'webgl',
        'css3D',
        'canvas',
        ]);
    this.detectme={
        canvas:"getContext" in document.createElement("canvas"),
        css3D:Modernizr.csstransforms3d && Modernizr.csstransforms && Modernizr.cssreflections,
        webgl:Detector.webgl && agentwebgl()
    }
    console.log(this.detectme);
        if (this.detectme.css3D==false&&this.detectme.webgl==false) oldBrowser(1); 
    {
        var temp=0;
        temp=location.hash.match(/h:(-?\d+)/);
        // console.log(temp);
        var h=parseInt(temp&&temp.length>0?temp[1]:0)||0;
        temp=location.hash.match(/v:(-?\d+)/);
        // console.log(temp);
        var v=parseInt(temp&&temp.length>0?temp[1]:0)||0;
        this.lon += h;
        this.lat += v;
    }

    this.setquality(self.CWIDTH+self.CHEIGHT);

    //load module------------------------------------
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(this.fov, self.CWIDTH / self.CHEIGHT, 1, 1000);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    //endloadmodule----------------------------------


        for (var i = 0; i < 3; i++) {
            if (this.detectme[this.detectplace[i]]==true){   
                switch (this.detectplace[i]) {
                    case 'webgl':
                        this.loadedtype=2;
                        this.initWEBGL_Cube();
                        break;
                    case 'css3D':
                        this.loadedtype=1;
                        this.init3DCSS();
                        break;
                    case 'canvas':
                        this.loadedtype=0;
                        this.initCanvas_Cube();
                        break;
                } 
                break;           
            }
        };


        this.renderer.setSize( self.CWIDTH, self.CHEIGHT );
        this.container.appendChild( this.renderer.domElement );
//---------------------End--loadngine------------------------------------

        this.navigate=new Navigate(this,this.container);
        if (this.smallimage==false && this.loadedtype!=0) this.navigate.inertia_move();

        return this;
}


var movelast = false;

function rotatePointL() {
    if (points.length > 0 || movelast) {
        lastpoint.data.rotangle -= 40;
        rotatePointR();
    }
}

function rotatePointR() {
    if (points.length > 0 || movelast) {
        lastpoint.data.rotangle += 20;
        if (lastpoint.data.rotangle > 360) lastpoint.data.rotangle -= 360;
        if (lastpoint.data.rotangle < 0) lastpoint.data.rotangle += 360;

        updateidiv(lastpoint);
    }
}

function createpoint(e) {
    if (e == undefined) return;
    btexture = getTexture(e);
    movelast = true;

    lastpoint = new THREE.Mesh(new THREE.PlaneGeometry(0, 0));

    lastpoint.position.x = target.x;
    lastpoint.position.y = target.y;
    lastpoint.position.z = target.z;

    lastpoint.data = {
        url: '',
        type: e,
        flag: 1,
        id: 0,
        rotangle: 0,
        hint: '',
        back_id:0,

        text_title: '',
        text_description: '',
        text_info: '',
        text_phone: '',
        text_email: '',
        user_action: '',
        block_status: '',
        media: ''

    };

    _plvE.scene.add(lastpoint);
    points.push(lastpoint);

    createidiv(lastpoint);
}

function updateidiv(p) {

    var index = points.indexOf(lastpoint);
    var iDiv = document.getElementById('idiv' + index);
    iDiv.setAttribute('data-name', p.data.url);
    iDiv.setAttribute('class', 'icon deselect');
    iDiv.setAttribute('title', p.data.hint);

    iDiv.innerHTML = '<img src="/img/' + getTexture(p.data.type,p.data.url) + '" border="0" alt="" style="margin: 0; padding: 0; width:100%;\
            behavior:url(-ms-transform.htc);\
            -moz-transform:rotate(' +
        lastpoint.data.rotangle + 'deg);\
            -webkit-transform:rotate(' + lastpoint.data.rotangle + 'deg);\
            -o-transform:rotate(' + lastpoint.data.rotangle +
        'deg);\
            -ms-transform:rotate(' + lastpoint.data.rotangle + 'deg);\
            "  />';
}

function createidiv(p) {

    var iDiv = document.createElement('div');
    iDiv.id = 'idiv' + (points.length - 1);
    iDiv.setAttribute('style', 'position:absolute;z-index:9 !important;opacity:1;cursor:pointer;width:' + _plvE.idw + 'px;height:' + _plvE.idw + 'px;display:block;');
    iDiv.setAttribute('data-num', (points.length - 1));

    function click() {

        // event.preventDefault();


        if (adminmode) {
            if ((movelast) || is_any_block_visible())

                startshow('Error');

            else {

                ClickFU_admin($(this).data('num'));

            }

        } else {
            ClickFU($(this).data('num'));
        }

    };

    // iDiv.ontouchend=click;
    iDiv.ontouchstart=click;
    iDiv.onclick=click;

    _plvE.container.appendChild(iDiv);
    updateidiv(p);
    _plvE.saferender();
}

function addreklamapoint() {
    //point--------

    var itemGeometry = new THREE.PlaneGeometry(0, 0);

    lastpoint = new THREE.Mesh(itemGeometry);

    lastpoint.position.x = (target.x * 0.99);
    lastpoint.position.y = (target.y * 0.99);
    lastpoint.position.z = (target.z * 0.99);
    lastpoint.data = {
        type: 3,
        flag: 1,
        Vwangle: 0,
        Vangle: 0
    };
    lastpoint.lookAt(camera.position);
    scene.add(lastpoint);
    //points.push(lastpoint);
    //----------------


    var itemGeometry = new THREE.PlaneGeometry(0, 0);

    rightstab = new THREE.Mesh(itemGeometry);

    rightstab.position.x = (target.x * 0.99);
    rightstab.position.y = (target.y * 0.99);
    rightstab.position.z = (target.z * 0.99);
    rightstab.data = {
        url: '',
        type: 3,
        rotangle: 0,
        Vangle: 0
    };
    rightstab.lookAt(camera.position);
    scene.add(rightstab);

    leftstab = new THREE.Mesh(itemGeometry);

    leftstab.position.x = (target.x * 0.99);
    leftstab.position.y = (target.y * 0.99);
    leftstab.position.z = (target.z * 0.99);
    leftstab.data = {
        url: '',
        type: 3,
        rotangle: 0,
        Vangle: 0
    };
    leftstab.lookAt(camera.position);
    scene.add(leftstab);
    movelast = true;
    reklamma = true;
}

function removelast() {

    _plvE.removeobj(lastpoint);

        var index = points.indexOf(lastpoint);

        var len = points.length;

        if (movelast) movelast = false;
           if (reklamma){
                        _plvE.removeobj(leftstab);
                        _plvE.removeobj(rightstab);
                        document.getElementById('rview').style.left = -50 + 'px';
                        document.getElementById('rview').style.display = 'none';
                        document.getElementById('lview').style.left = -50 + 'px';
                        document.getElementById('lview').style.display = 'none';
                        reklamma=false;
                   }

        for (var i = index + 1; i < len; i++) {

            document.getElementById('idiv' + i).setAttribute('data-num', (i - 1));
            document.getElementById('idiv' + i).id = 'idiv' + (i - 1);

        }

        var elem = document.getElementById('idiv' + index);
        if (elem) elem.parentNode.removeChild(elem);


        // if (typeofENGINE == 1) lastpoint.element.parentNode.removeChild(lastpoint.element);


        points.splice(index, 1);

    _plvE.saferender();
}


function removeall() {

        if (movelast) movelast = false;
           if (reklamma){
                        _plvE.removeobj(leftstab);
                        _plvE.removeobj(rightstab);
                        document.getElementById('rview').style.left = -50 + 'px';
                        document.getElementById('rview').style.display = 'none';
                        document.getElementById('lview').style.left = -50 + 'px';
                        document.getElementById('lview').style.display = 'none';
                        reklamma=false;
                   }
        var len = points.length;

        for (var i = 0; i < len; i++) {

            $('#idiv'+i).unbind();
            $('#idiv'+i).remove();
            _plvE.removeobj(points[i]);

            // var elem = document.getElementById('idiv' + i);
            // if (elem) elem.parentNode.removeChild(elem);

        }
    points=[];

    _plvE.saferender();
}

function lastpointmoveOK() {

    if (lastpoint.data.flag == 0) lastpoint.data.flag = 2;

    if (movelast) {

        movelast = false;


        if (reklamma) {
            var pointr = {
                url: lastpoint.data.url,
                Vwangle: valstab,
                Vangle: lastpoint.data.Vangle
            };
            reklammapoints.push(pointr);

            if (points.length > 0)
                lastpoint = points[points.length - 1];
            else lastpoint = {};
            reklamma = false;
            scene.remove(leftstab);
            scene.remove(rightstab);
        } else {

            updateidiv(lastpoint);

        }

    }

    _plvE.saferender();
}

function loadReklammaPointsJ() {

    $.ajax({
        url: panoJsonSavers.reklamasaver + _plvE.pid,
        //   type: 'post',
        dataType: 'json',
        success: function(data) {

            var json = data;

            if (!json) {
                console.log("NULL");
                return;
            }
            //alert(json.length);

            for (var i = 0; i < json.length; i++) {

                var rpoint = {
                    id: json[i].id,
                    Vwangle: json[i].Vwangle,
                    Vangle: json[i].Vangle
                };

                reklammapoints.push(rpoint);

            }
        }
    });
}


function checkangle(dangl, dangleval) {

    var Vval = 100;
    if (dangleval) Vval = dangleval;

    var rx1 = 0,
        lx1 = 0;
    var lx = dangl - Vval,
        rx = dangl + Vval;
    if (rx > 360) {
        rx1 = (rx - 360);
        rx = 360;
    }
    if (lx < 0) {
        lx1 = 360 + lx;
        lx = 0;
    }

    if (((lon >= dangl) && (lon <= rx)) || ((lon <= dangl) && (lon >= lx))) return true;
    if ((rx1 > 0) && (lon >= 0) && (lon <= rx1)) return true;
    if ((lx1 > 0) && (lon <= 360) && (lon >= lx1)) return true;

    return false;
}


function renderReklammaPos() {

    var len = reklammapoints.length;
    if ((!movelast) && (!reklamma)) {

        for (var i = 0; i < len; i++) {

            if (checkangle(reklammapoints[i].Vangle, reklammapoints[i].Vwangle)) {
                //alert('reklamma');
                document.getElementById('rekl' + reklammapoints[i].id).style.display = "block";
            } else document.getElementById('rekl' + reklammapoints[i].id).style.display = "none";
        }

    }
}

function renderAxispos() {

    var width = CWIDTH,
        height = CHEIGHT;
    var widthHalf = width / 2,
        heightHalf = height / 2;

    var vector = new THREE.Vector3();
    var projector = new THREE.Projector();

    projector.projectVector(vector.setFromMatrixPosition(rightstab.matrixWorld), camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    if (((vector.x > CWIDTH) || (vector.x < CLeft))) {

        document.getElementById('rview').style.left = -50 + 'px';
        document.getElementById('rview').style.display = 'none';


    } else {
        document.getElementById('rview').style.display = 'block';
        document.getElementById('rview').style.left = (vector.x - (idw / 2)) + 'px';
    }

    projector.projectVector(vector.setFromMatrixPosition(leftstab.matrixWorld), camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    if (((vector.x > CWIDTH) || (vector.x < CLeft))) {

        document.getElementById('lview').style.left = -50 + 'px';
        document.getElementById('lview').style.display = 'none';


    } else {
        document.getElementById('lview').style.display = 'block';
        document.getElementById('lview').style.left = (vector.x - (idw / 2)) + 'px';
    }
}

function getmeetpos() {
    var len = points.length;
    for (var i = 0; i < len; i++) {
        if (points[i].data.type == 11) return _plvE.pid+"&x=" + points[i].position.x + "&y=" + points[i].position.y + "&z=" + points[i].position.z + "&lon=" + _plvE.lon + "&lat=" + _plvE.lat;
    }
    return false;
}

function loaderStart(){
    $("#loader-pl-view").show();
}

function loaderEnd(){
    $("#loader-pl-view").fadeOut(1000);
}
function bindonce(){
 if (window.__bindonce==undefined) {
    $(window).bind('popstate', function(e){
      if (typeof e['originalEvent'] !== 'undefined') {
        if (window.location.href.indexOf("pano/"+_plvE.pid)<0)
        // console.log('reload');
        window.location.reload();
      }
    });
    window.__bindonce=true;
 }   
}