var contentWidth = document.getElementById("content").offsetWidth;
var rendersLarge = false;

window.onload = function () {
  //alert("you clicked");

  var renders = document.getElementsByClassName("render");
  var w = screen.width * 0.8;
  var menuOut = false;

  var menuButton =  document.getElementById('menu-button');
  menuButton.onclick = function () {
    console.log('clicked');
    if (menuOut) {
      document.getElementById('menu-container').style.maxHeight = "";
    } else {
      document.getElementById('menu-container').style.maxHeight = "500px";
    }
    menuOut = !menuOut;
  };
/*
  for (var i = 0; i < renders.length; i++) {
    //alert(i);
    var r = renders[i];
    style = window.getComputedStyle(r),
    curW = style.getPropertyValue('width');
    alert(curW);

    r.onclick = function() {
      var tempW;
      style = window.getComputedStyle(r),
      curW = style.getPropertyValue('width');
      if (r.width != w + "px") {
        tempW = w + "px";
      }
      else {
        tempW = "100%";
      }
      TweenLite.to(this, 0.5, {width:tempW});
    }

  }
  */
  var scrollTopOffset = 0;
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    ref = "" + links[i].getAttribute("href");
    if( ref.charAt(0) == "#") {
      var r = links[i];
      //console.log(ref.slice(1) + " is an anchor, scrolls to :" + newY);
      r.onclick = function() {
        console.log( this);
        
        var newY = document.getElementById(this.getAttribute("href").slice(1)).offsetTop;
        console.log("scrolling to " + newY);
        TweenLite.to(window, 2, {scrollTo:{y:(newY - scrollTopOffset)}, ease:Power2.easeOut});
        if (document.getElementById('menu-container').style.maxHeight != 0 ) {
          document.getElementById('menu-container').style.maxHeight = "";
          menuOut = false;
        } 
        return false;
      }
    }
  }
  
  
// Render Toggling
  
  var renders = document.getElementsByClassName("render");
  var renderWidth = renders[1].offsetWidth;
  for (var i = 0; i < renders.length; i++) {
    var ren = renders[i];
    ren.onclick = function () {
      var h = window.pageYOffset - this.offsetTop;
      toggleBigSmall(renders, rendersLarge);
      rendersLarge = !rendersLarge;
      //TweenLite.delay(0.5);
      TweenLite.to(window, 0.4, {scrollTo:{y:(this.offsetTop)}, ease:Power2.easeOut});
      //, delay:0.5
      return false;
    }
  }
  
  
  var scrollBuffer = 5
  var logo = document.getElementById("logo");
  var nav = document.getElementById("nav-container");
  window.onscroll = scroll;
  var downClass = 'down';
  var hidClass = 'hid';


  var yStor = window.pageYOffset;
  var lastDown = yStor;
  var lastUp = yStor;

  function scroll () {
    var y = window.pageYOffset;
    var navClass = nav.className.split(" ");
    var logoClass = logo.className.split(" ");
    // nav tweening
    if (y > scrollBuffer) {
      if ( checkForClass(navClass, downClass) == false ) {
        nav.className += " " + downClass;
      }
      if (checkForClass(logoClass, downClass) == false) {
        logo.className = downClass;
      }
    }
    else {
      if ( checkForClass(navClass, downClass) == true ) {
        nav.className = nav.className.replace( /(?:^|\s)down(?!\S)/ , "");
      }
      if ( checkForClass(logoClass, downClass) == true) {
        logo.className = "";
      }
    }

    var curMargin = nav.style.marginTop;
    if (curMargin == "") {
      curMargin = 0;
    }
    //console.log("lastUp :" + lastUp + ", lastDown :" + lastDown + ", y :" + y, ", deltas :" + (lastDown - y) + " " + (lastUp - y));
    //console.log(parseInt(curMargin) + " " + (-nav.offsetHeight));
    
    if (yStor - y < 0) {
      //console.log("going down");
      if (y > 200) {
        if ( checkForClass(navClass, hidClass) == false ) {
          nav.className += " " + hidClass;
        }
      }
      if (document.getElementById('menu-container').style.maxHeight != 0 ) {
        document.getElementById('menu-container').style.maxHeight = "";
        menuOut = false;
      } 
    }
    else
    {
      //console.log("coming up");
      if ( checkForClass(navClass, hidClass) == true ) {
        nav.className = nav.className.replace( /(?:^|\s)hid(?!\S)/ , "");
      }
    }
    yStor = y;
    
  }

}
  function checkForClass(classArray, lookingFor) {
    //console.log("checking " + classArray.length + ", " + classArray + " & " + lookingFor);
    if (classArray != undefined) {
      for (var i = 0; i <= classArray.length; i++) {
        if (classArray[i] == lookingFor) { return true; }
      }
    }
    return false;
  }
/*
  var logo = document.getElementById("logo");

  function scrollFunction() {
    alert(window.pageYOffset);
    if (window.pageYOffset > 5) {
      logo.className += 'down';
    } else {
      if (logo.className != undefined) {
        logo.className -= 'down';
      }
    }
  }

  window.onscroll = scrollFunction();

*/

// Here be the toggling of renders
function toggleBigSmall(el, toggle) {
  if (!toggle) {
    var s = (window.innerWidth * 0.6) ;
    console.log(s);
    //this.className.style.width = s;
    //this.style.width = s;
    
    for (var e = 0; e < el.length; e++) {
      m = -( (s - contentWidth) / 2)  + "px";
      el[e].getElementsByTagName('img')[0].style.width = s + "px";
      el[e].getElementsByTagName('img')[0].style.marginLeft = m;
      //TweenLite.to(el[e], 0.5, {width:(s + "px"), marginLeft:m, ease:Power2.easeOut});
    }
  }
  else {
    for (var e = 0; e < el.length; e++) {
      //TweenLite.to(el[e], 0.5, {width:"100%", marginLeft:"0", ease:Power2.easeOut});
      el[e].getElementsByTagName('img')[0].style.width =  "";
      el[e].getElementsByTagName('img')[0].style.marginLeft = "";
    }
  }
}
