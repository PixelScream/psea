window.onload = function(){
  var renders = document.getElementsByClassName("render");
  var w = screen.width * 0.8;

  //alert("you clicked");

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