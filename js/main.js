window.onload = function(){
  //alert("you clicked");

  var renders = document.getElementsByClassName("render");
  var w = screen.width * 0.8;

  

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
    console.log("checking nav");
    if ( checkForClass(navClass, downClass) == false ) {
      nav.className += " " + downClass;
    }
    console.log("checking logo");
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
    console.log("going down");
    if (y > 200) {
      if ( checkForClass(navClass, hidClass) == false ) {
        nav.className += " " + hidClass;
      }
    }
  }
  else
  {
    console.log("coming up");
    if ( checkForClass(navClass, hidClass) == true ) {
      nav.className = nav.className.replace( /(?:^|\s)hid(?!\S)/ , "");
    }
  }
  yStor = y;
  
}
function checkForClass(classArray, lookingFor) {
  console.log("checking " + classArray.length + ", " + classArray + " & " + lookingFor);
  if (classArray != undefined) {
    for (var i = 0; i <= classArray.length; i++) {
      if (classArray[i] == lookingFor) { return true; }
    }
  }
  return false;
}
