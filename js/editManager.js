/**
 * Created by duck on 15. 12. 3.
 */

function editManager() {
    console.log("create editManager");

    this.totalPage;
    this.visiblePage;
}

editManager.prototype.initMethod = function() {
    this.initEditorSize();
    this.drawTest();
    //this.changePage(1);
}

editManager.prototype.initEditorSize = function() {

    // 미리보기 부분 setting
    var toolsHeight = $("#tools").height() * 1.2;
    var filmstripWidth = window.innerWidth * 0.114;
    var filmstripHeight = window.innerHeight - toolsHeight;

    $(".filmstrip").css("width", filmstripWidth + "px");
    $(".filmstrip").css("height", filmstripHeight + "px");

    // editor 부분 setting
    var editorWidth = $("#canvas-view").width() * 0.95;
    var editorHeight = $("#canvas-view").height() * 0.95;


    $("#editor").css("width", editorWidth + "px");
    $("#editor").css("height", editorHeight + "px");
}

editManager.prototype.setEditorSize = function() {

    var toolsHeight = $("#tools").height() * 0.9;
    var filmstripHeight = window.innerHeight - toolsHeight;

    $(".filmstrip").css("height", filmstripHeight + "px");

    var editorWidth = $("#canvas-view").width() * 0.95;
    var editorHeight = $("#canvas-view").height() * 0.95;


    $("#editor").css("width", editorWidth + "px");
    $("#editor").css("height", editorHeight + "px");

    for (var i = 1; i <= this.totalPage; i++) {
        $("#canvas- + i").css("width", editorWidth + "px");
        $("#canvas- + i").css("height", editorHeight + "px");
    }
}


editManager.prototype.setCanvas = function(pageNum) {
    var canvas = document.createElement("div");

    canvas.setAttribute("id", "canvas-" + pageNum);
    canvas.style.width = $("#editor").width() + "px";
    canvas.style.height = $("#editor").height() + "px";
    canvas.style.visibility = "hidden";
    canvas.style.position = "absolute";

    $("#editor").append(canvas);

    this.visiblePage = pageNum;
}

// 미리보기 그려주는 부분
editManager.prototype.setThumbnails = function(pageNum) {

    // thumbnail 부분 setting
    var thumbnailWidth = $(".filmstrip").width();
    var thumbnailHeight = thumbnailWidth * 0.543;

    var thumbnailContainer = document.createElement("div");
    var pageNumber = document.createElement("div");
    var thumbnail = document.createElement("div");
    var view = document.createElement("div");

    thumbnailContainer.setAttribute("class", "thumbnail-container");
    thumbnailContainer.style.width = thumbnailWidth + "px";
    thumbnailContainer.style.height = thumbnailHeight + "px";


    pageNumber.setAttribute("id", "page-" + pageNum);
    pageNumber.innerHTML = pageNum;
    pageNumber.style.width = (thumbnailWidth * 0.1) + "px";
    pageNumber.style.float = "left";
    thumbnailContainer.appendChild(pageNumber);

    thumbnail.setAttribute("id", "thumbnail-" + pageNum);
    thumbnail.style.width = (thumbnailWidth * 0.9) + "px";
    thumbnail.style.float = "right";

    view.setAttribute("id", "view-" + pageNum);
    view.style.margin = "1%";
    view.style.width = ((thumbnailWidth * 0.9) * 0.85) + "px";
    view.style.height = (thumbnailHeight * 0.9) + "px";
    view.style.border = "1px solid #000000";
    view.style.backgroundColor = "rgb(255,255,255)";
    thumbnail.appendChild(view);

    thumbnailContainer.appendChild(thumbnail);

    $("#filmstrip").append(thumbnailContainer);

    this.totalPage = pageNum;
}

editManager.prototype.drawTest = function() {

    for (var pageNum = 1; pageNum <= 20; pageNum++) {
        this.setThumbnails(pageNum);
    }

    for (var pageNum = 1; pageNum <= 20; pageNum++) {
        this.setCanvas(pageNum);
        this.addContent(pageNum);
    }
}

editManager.prototype.changePage = function(hide, vis) {
    document.getElementById("canvas-" + hide).style.visibility = "hidden";
    document.getElementById("canvas-" + vis).style.visibility = "visible";
}

editManager.prototype.removeContent = function(index) {
    var small = document.getElementById("view-" + this.visiblePage);
    var big = document.getElementById("canvas-" + this.visiblePage);

    small.removeChild(index);
    big.removeChild(index);
}

editManager.prototype.addContent = function() {
    var test = document.createElement("p");
    test.innerHTML = this.visiblePage + " 추가";

    var test2 = document.createElement("p");
    test2.innerHTML = this.visiblePage + " 추가";


    document.getElementById("canvas-" + this.visiblePage).appendChild(test);
    document.getElementById("view-" + this.visiblePage).appendChild(test2);

}
