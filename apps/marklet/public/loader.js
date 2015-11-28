(function(){

  var markletFrame;
  var markletDiv;
  var markletStyle;

  if (!document.getElementById("arena")) {
    initialize()
  }

  function initialize(){
    createFrame();
    createTarget();
    createStyle();

    document.addEventListener('dragstart', startDrag, true);
    document.addEventListener('dragend', stopDrag, true);
    document.addEventListener('mousedown', sendClick, true);

    markletDiv.addEventListener("dragover", dragOver, true);
    markletDiv.addEventListener("dragenter", dragEnter, false);
    markletDiv.addEventListener("dragleave", dragLeave, false);
    markletDiv.addEventListener("drop", drop, false);
  }

  function getURL(msg){
    baseUrl = "http://marklet.arena.dev:5000/save/";

    url = baseUrl + encodeURIComponent(msg.url);
    url += "?original_source_url=" + encodeURIComponent(msg.url);
    url += "&original_source_title=" + encodeURIComponent(msg.title);

    return url;
  };

  function createFrame(){
    markletFrame = document.createElement("iframe");
    markletFrame.name = markletFrame.id = "arena_frame";
    markletFrame.src = getURL({
      url: window.location.href,
      title: window.document.title
    });
    document.body.appendChild(markletFrame)
  }

  function createTarget(){
    markletDiv = document.createElement("div");
    markletDiv.id = "arena_div";
    document.body.appendChild(markletDiv);
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

  function startDrag(e) {
    var targetParent;

    if (typeof e.dataTransfer.getData("text/html") == "undefined"
      || e.target.tagName == "IMG") {

      targetParent = closest(e.target, "A") || document.createElement('A')

      parentHTML = targetParent.cloneNode(false);
      parentHTML.href = parentHTML.href;

      targetImage = e.target.cloneNode(false);
      targetImage.src = targetImage.src;
      parentHTML.appendChild(targetImage);
      e.dataTransfer.setData("text/html", parentHTML.outerHTML);
    }

    markletDiv.style.display = "block";
  };

  function stopDrag(e) {
    markletDiv.style.display = "none";
  };

  function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  function dragEnter(e) {
    sendMessage({
      action: "dragenter"
    })
    return false
  }

  function dragLeave(e) {
    sendMessage({
      action: "dragleave"
    })
    return false
  }

  function sendClick() {
    sendMessage({
      action: "click"
    })
  }

  function drop(e) {
    var data = {
      source: location.href,
      title: document.title
    }

    for (var i in e.dataTransfer.types) {
      data[e.dataTransfer.types[i]] = e.dataTransfer.getData(e.dataTransfer.types[i]);
    }

    sendMessage({
      action: "drop",
      value: data
    });

    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  function sendMessage(data) {
    markletFrame.contentWindow.postMessage(data, "*")
  }

})();
