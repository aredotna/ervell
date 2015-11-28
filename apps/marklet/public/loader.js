var markletFrame;
var markletDiv;
var markletStyle;

function getURL(msg){
  baseUrl = "http://marklet.arena.dev:5000/save/";

  url = baseUrl + encodeURIComponent(msg.url);
  url += "?original_source_url=" + encodeURIComponent(msg.url);
  url += "&original_source_title=" + encodeURIComponent(msg.title);

  return url;
};

function createFrame(){
  console.log('createFrame')
  markletFrame = document.createElement("iframe");
  markletFrame.name = markletFrame.id = "arena_frame";
  markletFrame.src = getURL({
    url: window.location.href,
    title: window.document.title
  });
  document.body.appendChild(markletFrame)
}

function createTarget(){
  bookmarkletDiv = document.createElement("div");
  bookmarkletDiv.id = "arena_div";
  document.body.appendChild(bookmarkletDiv);
}

function createStyle(){
  markletStyle = document.createElement("style");
  markletStyle.type = "text/css";
  markletCSS = "#arena_frame,#arena_div{overflow:hidden;width:300px;height:535px;position:fixed;top:20px;right:20px;border:none}#arena_frame{z-index:9999999998;background:rgba(255,255,255,0.75);box-shadow: 3px 4px 10px rgba(0, 0, 0, .4);}#arena_frame:hover{background:rgba(255,255,255,0.9); box-shadow: 3px 4px 10px rgba(0, 0, 0, .5);}#arena_div{z-index:9999999999;display:none;opacity:0}";

  if (markletStyle.styleSheet) {
    markletStyle.styleSheet.cssText = markletCSS;
  } else {
    markletStyle.appendChild(document.createTextNode(markletCSS));
  }
  document.body.appendChild(markletStyle);
}

document.onkeyup = function(e){
  if (e || window.event) {
    e = window.event;
    if (e.keyCode == 27) closeBookmarklet();
  }
}

window.addEventListener("message", function(e){
  switch (e.data.action) {
    case "close":
      closeBookmarklet();
      break;
  }
});

function closeBookmarklet() {
  if (markletFrame) document.body.removeChild(markletFrame)
  if (markletDiv) document.body.removeNode(markletDiv)
  if (markletStyle) document.body.removeNode(markletStyle)
}

(function(){

  if (!document.getElementById("arena")) {
    initialize()
  }

  function initialize(){
    createFrame();
    createTarget();
    createStyle();

    // setHostEvents();
    // setTargetEvents();
  }
})();
