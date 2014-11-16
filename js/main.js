var contentWidth = document.getElementById("content").offsetWidth;
var rendersLarge = false;
var scrollTopOffset = -100;

window.onload = function () {
  //alert("you clicked");

  var renders = document.getElementsByClassName("render");
  var w = screen.width * 0.8;
  var menuOut = false;

  var figs = document.getElementsByClassName("effect-hera");

/*

    Menu button

*/

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

  var mobileMenuOut = false;
  var mobileButton = document.getElementById("small-menu-button");
  console.log(mobileButton);
  
  mobileButton.onclick = function () {
    console.log("yippie");
    if (mobileButton.classList.contains('out') == false) {
      this.classList.add('out');
      this.parentNode.style.maxWidth = "3000px";
    } else {
      this.classList.remove('out');
      this.parentNode.style.maxWidth = "";
    }
  }

/*

  Page links

*/
  
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    ref = "" + links[i].getAttribute("href");
    if( ref.charAt(0) == "#") {
      var r = links[i];
      //console.log(ref.slice(1) + " is an anchor, scrolls to :" + newY);
      if(ref.charAt(1) == "-") {
        r.onclick = function() {
          var im = this.parentNode.parentNode.parentNode.getElementsByTagName("img")[0];  
          //console.log("render link -" + this);
          a = this.getAttribute("href").slice(2);
          if (a == "expand") {
            console.log("expanding yo");
            console.log(im.parentNode.offsetTop);
            var h = window.pageYOffset - im.offsetTop;
            toggleBigSmall(figs, rendersLarge, im);
            rendersLarge = !rendersLarge;
            
          } else if (a == "open") {
            console.log("opening yo");
            var win = window.open(im.src, '_blank');
            win.focus();
          }
          return false;
        }
      } else {
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
  }
  
/*
  
   Render Toggling

*/
  var renders = document.getElementsByClassName("render");
  var renderWidth = renders[1].offsetWidth;
  for (var i = 0; i < renders.length; i++) {
    var ren = renders[i];
    ren.onclick = function () {
      if (event.button == 0) {
        var h = window.pageYOffset - this.offsetTop;
        toggleBigSmall(renders, rendersLarge, this);
        rendersLarge = !rendersLarge;
        //TweenLite.delay(0.5);
        //TweenLite.delayedCall (0.5, refocusViewport, [this]);
        
        //, delay:0.5
        return false;
      }
    }
  }
  /*

    break down show more

  */

  var downArrows = document.getElementsByClassName("down-arrow");
  for (var i = 0; i < downArrows.length; i++) {
    var da = downArrows[i]
    da.onclick = function () {
      var showMore = this.parentNode.getElementsByClassName("show-more")[0];
      if (showMore.style.maxHeight == "" ) {
        showMore.style.maxHeight = "2000px";
        this.classList.remove("fa-angle-double-down");
        this.classList.add("fa-angle-double-up");
      } else {
        showMore.style.maxHeight = "";
        this.classList.remove("fa-angle-double-up");
        this.classList.add("fa-angle-double-down");
      }
      var lazyImages = showMore.getElementsByClassName('lazy');
      var split = lazyImages[0].src.split('/');
      if (split[split.length - 1] == 'clear.gif') {
        for ( var im = 0; im < lazyImages.length; im++) {
          console.log(lazyImages[im].src);
          lazyImages[im].src = lazyImages[im].getAttribute('data-src');
        }
      }
      //showMore.classList.add("down");
    }
  }

  /*

      Menu interaciton

  */
  var scrollBuffer = 5
  var logo = document.getElementById("logo");
  var nav = document.getElementById("nav-container");
  var menuContainer = document.getElementById("menu-container");

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
      if (menuContainer.style.marginLeft != "0px") {
        menuContainer.style.marginLeft = "0px";
        menuContainer.style.bottom = "-5px";
      }
    }
    else {
      if ( checkForClass(navClass, downClass) == true ) {
        nav.className = nav.className.replace( /(?:^|\s)down(?!\S)/ , "");
      }
      if ( checkForClass(logoClass, downClass) == true) {
        logo.className = "";
      }
      if (menuContainer.style.marginLeft != "") {
        menuContainer.style.marginLeft = "";
        menuContainer.style.bottom = "";
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

  /*

    Produral nav

  */
  var newStyle = "<style> ";
  var contentChildren = document.getElementById("content").children;
  var proNav = document.getElementById("pro-nav");
  for (var i = 0; i < contentChildren.length; i++) {
    var tooltip = contentChildren[i].getElementsByTagName('h1')[0].textContent;
    var icon = "<i class=\"fa fa-menu-o pro-i " + i + "\" title=\"" + tooltip + "\"></i>";
    proNav.innerHTML += icon;
    console.log(tooltip);
    newStyle += "\n." + i + ":after { content: \"" + tooltip + "\"\; \}";
  }
  newStyle += "</style>";
  console.log(newStyle);
  document.getElementsByTagName('head')[0].innerHTML += newStyle;

  var proNavChildren = proNav.children;

  for (var i = 2; i < proNavChildren.length; i++) {
    var r = proNavChildren[i]
    proNavChildren[i].onclick = function () {
      console.log(this);
      var v = this.className
      v = v.charAt(v.length - 1);
      v = parseInt(v);
      var newY = contentChildren[v].offsetTop;
      TweenLite.to(window, 2, {scrollTo:{y:(newY - scrollTopOffset)}, ease:Power2.easeOut});
    }
  }
  proNavChildren[1].onclick = function () {
    TweenLite.to(window, 2, {scrollTo:{y:0}, ease:Power2.easeOut});
  }
  var lightsOn = true;
  document.styleSheets[0].disabled = true;
  proNavChildren[0].onclick = function () {
    if ( lightsOn == true ) {
      this.classList.remove("fa-toggle-off");
      this.classList.add("fa-toggle-on");
      document.styleSheets[1].disabled = true;
      document.styleSheets[0].disabled = false;
    } else {
      this.classList.remove("fa-toggle-on");
      this.classList.add("fa-toggle-off");
      document.styleSheets[1].disabled = false;
      document.styleSheets[0].disabled = true;
    }

    lightsOn = !lightsOn;
  }
}

/*

    Check for class function

*/
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

/*

    Render toggle functions

*/
function toggleBigSmall(el, toggle, toFocus) {
  if (!toggle) {
    var s = (window.innerWidth * 0.6) ;
  
    for (var e = 0; e < el.length; e++) {
      m = -( (s - contentWidth + 80) / 2)  + "px";
      //el[e].getElementsByTagName('img')[0].style.width = s + "px";
      //el[e].getElementsByTagName('img')[0].style.marginLeft = m;
      TweenLite.to(el[e].getElementsByTagName('img')[0], 0.4, {width:(s + "px"), marginLeft:m, ease:Power2.easeOut, onComplete:refocusViewport, onCompleteParams:[toFocus]});
    }
  }
  else {
    for (var e = 0; e < el.length; e++) {
      TweenLite.to(el[e].getElementsByTagName('img')[0], 0.4, {width:"100%", marginLeft:"0", ease:Power2.easeOut, onComplete:refocusViewport, onCompleteParams:[toFocus]});
      //el[e].getElementsByTagName('img')[0].style.width =  "";
      //el[e].getElementsByTagName('img')[0].style.marginLeft = "";
    }
  }
}

function refocusViewport(toFocus) {
  if (toFocus != undefined) {
    var h = findY(toFocus);
    console.log("element to focus :" + toFocus  + ", at height :" + toFocus.offsetTop + ", abs height : " + h);
    TweenLite.to(window, 0.4, {scrollTo:{y:(toFocus.offsetTop - scrollTopOffset)}, ease:Power2.easeOut});
  }
}

function findY(el) {
  var curtop = 0;
  if (el.offsetParent) {
    while (el = el.offsetParent){
      curtop += el.offsetTop;
    } 
    return curtop;
  }
}