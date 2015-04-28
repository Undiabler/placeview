/**
 * @author Undiabler   Undiabler@gmail.com
 * http://www.rainbowcore.it
 *
 *
 * Mouse bindings for Engine.js
 */

var panoN;

function Navigate(mlink,container){

    this.engine=mlink;
    this.firstmove=false;
    this.intervalid=-1;
    this.speedfm={lon:136.6/screen.width,speed:60};
    this._inertia_x=0;
    this._inertia_y=0;
    this._inertia_move=false;

    var self=this;

    $('.gyroscope-m').css('display',((Modernizr.touch&&window.DeviceOrientationEvent&&window.DeviceMotionEvent)?'block':'none'));

    panoN=this;

        container.addEventListener( 'mousedown' ,    function(e) {panoN.onMouseDown(e);}   ,    false );
        container.addEventListener( 'mousemove' ,    function(e) {panoN.onMouseMove(e);}   ,    false );
        container.addEventListener( 'mouseup'   ,    function(e) {panoN.onMouseUp(e);}   ,    false );
        // container.addEventListener( 'mouseout'  ,    function(e) {panoN.onMouseOut(e);}   ,    false );
        container.addEventListener( 'mousewheel',    function(e) {panoN.onMouseWheel(e);}   ,    false );
        container.addEventListener( 'DOMMouseScroll',function(e) {panoN.onMouseWheel(e);}   ,    false );

        //document.onkeydown=onKeyPress;

        window.addEventListener('resize',function(e) {panoN.onOrientation(e);},  false);

        window.addEventListener("orientationchange", function(e) {panoN.onOrientation(e);}, false);

        if (Modernizr.touch) {
            container.addEventListener( 'touchstart',   function(e) {panoN.onTouchStart(e);}   ,    false );
            container.addEventListener( 'touchmove' ,   function(e) {panoN.onTouchMove(e);}    ,    false );
        }

      this.inertia_move=function(){
        this._inertia_x=0;
        this._inertia_y=0;
        if (this._inertia_int==undefined) 

        this._inertia_int=setInterval(function(){ 
         
          if ((Math.abs(panoN._inertia_x)+Math.abs(panoN._inertia_y))<5) {panoN._inertia_x=panoN._inertia_y=0; 
            // this.coef=1; 
            panoN._inertia_move=false;}
          if (panoN._inertia_move){
            // if (panoN.coef==undefined) panoN.coef=1;
            panoN._inertia_x*=0.9;
            panoN._inertia_y*=0.9;
            // if (panoN.coef>=0.2)
                // panoN.coef-=0.005;
            panoN.engine.setLonLat(panoN._inertia_x*0.2 + panoN.engine.lon,panoN._inertia_y*0.2 + panoN.engine.lat);
          }

        },20);
      }

      this.firstmoveme=function(e) {
        self.engine.setLonLat(self.engine.lon+self.speedfm.lon,self.engine.lat);
      }
      this.setfirstmovement=function(){
        self.firstmove=true;
        if (self.intervalid==-1)
        self.intervalid=window.setInterval(function(){self.firstmoveme();},self.speedfm.speed);
      //  console.log('interval setted');
      }
      this.clearfirstmovement=function(){
        if (self.firstmove) {
        self.firstmove=false;
        window.clearInterval(self.intervalid);
        self.intervalid=-1;
      //  console.log('interval cleared');
        }
      }
      
}

Navigate.prototype.setspeedX=function(intval){
   // this.mspeed*=intval;
}    

Navigate.prototype.getspeedX=function(){
  if (this.mspeed==undefined || this.mspeed==Infinity) 
    return this.mspeed=0.12*1364/$('#container').width();
  else return this.mspeed;
}


Navigate.prototype.onKeyPress=function( event ){
  //   38: 0, // Up
  //   39: 1, // Right
  //   40: 2, // Down
  //   37: 3, // Left
    switch (event.which){
        case 87: this.lat+=3;break;
        case 83: this.lat-=3;break;
        case 68: this.lon+=3;break;
        case 65: this.lon-=3;break;
    }
}

Navigate.prototype.onTouchStart=function( e ) {


    e.preventDefault();
   // e.returnValue = false; 
   this.clearfirstmovement();

    if ( e.touches.length == 1 ) {

        this.sPX = e.touches[ 0 ].pageX;
        this.sPY = e.touches[ 0 ].pageY;

        this.sPLn = this.engine.lon;
        this.sPLt = this.engine.lat;
        this.eventsize=false;
    } else

    if ( e.touches.length == 2 ) {
    
        this.eventsize=true;

        this.onsizeX = Math.pow(e.touches[ 0 ].pageX-e.touches[ 1 ].pageX,2);
        this.onsizeY = Math.pow(e.touches[ 0 ].pageY-e.touches[ 1 ].pageY,2);

        //	onPointerDownLon = lon;
        //	onPointerDownLat = lat;
    }
}

Navigate.prototype.onTouchMove=function(e) {

    e.preventDefault();
    //event.returnValue = false; 

    if (( e.touches.length == 1 )&&(!this.eventsize)) {

        this.engine.setLonLat(
            ( this.sPX - e.touches[0].pageX ) * this.getspeedX() + this.sPLn,
            ( e.touches[0].pageY - this.sPY ) * this.getspeedX() + this.sPLt
            );


    } else
    //Zoom move
    if (( e.touches.length == 2 )&&(this.eventsize)) {
        if (Math.sqrt(this.onsizeX+this.onsizeY)>(Math.sqrt(Math.pow(e.touches[ 0 ].pageX-e.touches[ 1 ].pageX,2)+ Math.pow(e.touches[ 0 ].pageY-e.touches[ 1 ].pageY,2))))
            this.engine.setFov( 2 ); 
          else 
            this.engine.setFov( -2 );
    }
    //this.engine.saferender();
}


Navigate.prototype.onMouseDown=function(e) {

    e.preventDefault();
    this.clearfirstmovement();    
    this._inertia_move=false;
   // if (mousemove) return movebymouse(e) || true;



    this.isUsI = true;

    this.sPX = e.clientX;
    this.sPY = e.clientY;


    this.sPLn = this.engine.lon;
    this.sPLt = this.engine.lat;

    this._inert_time=new Date().getTime();

}

Navigate.prototype.onMouseMove=function(e) {
    if ( !this.isUsI ) return; 
  this.engine.setLonLat(
                            ( this.sPX - e.clientX ) * this.getspeedX() + this.sPLn,
                            ( e.clientY - this.sPY ) * this.getspeedX() + this.sPLt
                        );
  this._inertia_x=( this.sPX - e.clientX ) * this.getspeedX();
  this._inertia_y=( e.clientY - this.sPY ) * this.getspeedX();
  
}

Navigate.prototype.onMouseUp=function(e) {  
  this.isUsI = false; this.engine.hashUPD();
  this._inert_time=(new Date().getTime()-this._inert_time)/1000;

  if ((Math.abs(this._inertia_x)>10||Math.abs(this._inertia_y)>10) && this._inert_time<0.5) {
    // console.log(this._inertia);
    this._inertia_x*=(0.5-this._inert_time)/0.5;
    this._inertia_y*=(0.5-this._inert_time)/0.5;
    // console.log(this._inertia);
    this._inertia_move=true;
  } 
}

Navigate.prototype.onMouseOut=function(e) { this.isUsI = false;
    e.preventDefault();
    return false;
    //var rec=renderer.domElement.getBoundingClientRect();

    //if ((event.clientX<rec.left)||(event.clientY<rec.top)||(event.clientX<0)||(event.clientY<0)||(event.clientX>(CWIDTH-10))||(event.clientY>(CHEIGHT-10)))  this.isUsI = false; 
}

Navigate.prototype.onMouseWheel=function(e) {

    e.preventDefault();

    if ( e.wheelDeltaY ) {
        this.engine.setFov( -e.wheelDeltaY * 0.05 );
    } else if ( e.wheelDelta ) { // Opera / Explorer 9
        this.engine.setFov( -e.wheelDelta * 0.05 );
    } else if ( e.detail ) {  // Firefox
        this.engine.setFov(  e.detail * 1.0 );
    }

}


//---------------------------------------------------------END----------------------------------
Navigate.prototype.onOrientation=function() {

    if (this.engine.fullscreenR)
    {
        this.engine.container.style.width=window.innerWidth +'px';
        this.engine.container.style.height=window.innerHeight+'px';

        this.engine.CWIDTH = $(container).width();
        this.engine.CHEIGHT = $(container).height();

        this.engine.camera.projectionMatrix.makePerspective( this.engine.fov, this.engine.CWIDTH / this.engine.CHEIGHT, 1, 1000 );
        this.engine.renderer.setSize( this.engine.CWIDTH, this.engine.CHEIGHT );
    }

    this.engine.saferender();     
}

Navigate.prototype.Acs_nf=function() {
if (Modernizr.touch) {  
    if (window.DeviceOrientationEvent) {
    if (window.DeviceMotionEvent != undefined) {
      if (window.ondevicemotion==undefined) {   
        if(navigator.userAgent.indexOf('Mac')!= -1){ //iOS
          window.moveRate=5;
          window.moveSens=0.052;
          } else{ //not iOS
          window.moveRate=0.1;
          window.moveSens=2.83;
          }
          window.ondevicemotion=function(e){ 
            switch(window.orientation){
              case 0:  
              if(Math.abs(event.rotationRate.alpha)>moveRate) _plvE.lat += moveSens*event.rotationRate.alpha;
              if(Math.abs(event.rotationRate.beta)>moveRate) _plvE.lon -= moveSens*event.rotationRate.beta;
              break;
              case 90:  
              if(Math.abs(event.rotationRate.beta)>moveRate) _plvE.lat -= moveSens*event.rotationRate.beta;
              if(Math.abs(event.rotationRate.alpha)>moveRate) _plvE.lon -= moveSens*event.rotationRate.alpha;
              break;
              case -90: 
              if(Math.abs(event.rotationRate.beta)>moveRate) _plvE.lat += moveSens*event.rotationRate.beta;
              if(Math.abs(event.rotationRate.alpha)>moveRate) _plvE.lon += moveSens*event.rotationRate.alpha;   
              break;
              case 180:   
              if(Math.abs(event.rotationRate.alpha)>moveRate) _plvE.lat -= moveSens*event.rotationRate.alpha;
              if(Math.abs(event.rotationRate.beta)>moveRate) _plvE.lon += moveSens*event.rotationRate.beta;  
              break;
            }
            _plvE.saferender();         
          }   
          if (window.ondevicemotion==undefined) return false; else {console.log('on'); return true;    }     
      } else {window.ondevicemotion=undefined;return false;}
    }
    }                     
    } else return false;
}


function setmousemove(){mousemove=true;}
function movebymouse( event ){
mousemove=false;
if (movelast) {
    var projector = new THREE.Projector();
var elem = renderer.domElement, 
    boundingRect = elem.getBoundingClientRect(),
    x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
    y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);

var vector = new THREE.Vector3( 
    ( x / elem.width ) * 2 - 1, 
    - ( y / elem.height ) * 2 + 1, 
    0.5 
);

projector.unprojectVector( vector, camera );
var ray = new THREE.Ray( camera.position, vector.sub( camera.position ).normalize() );
//var intersects = ray.intersectObjects( scene.children );
//console.log(ray);
//console.log("x: " + 500*0.6*ray.direction.x + ", y: " + 500*0.6*ray.direction.y+", z: " + 500*0.6*ray.direction.z);
    lastpoint.position.x=500*ray.direction.x;
    lastpoint.position.y=500*ray.direction.y;
    lastpoint.position.z=500*ray.direction.z;
    lastpointmoveOK();
    requestAnimationFrame(render);
}

}