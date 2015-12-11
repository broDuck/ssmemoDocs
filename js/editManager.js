/**
 * Created by duck on 15. 12. 3.
 */

function editManager() {
    console.log("create editManager");
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

    var toolsHeight = $("#tools").height();
    var filmstripHeight = window.innerHeight - toolsHeight;

    $(".filmstrip").css("height", filmstripHeight + "px");

    var editorWidth = $("#canvas-view").width() * 0.95;
    var editorHeight = $("#canvas-view").height() * 0.95;


    $("#editor").css("width", editorWidth + "px");
    $("#editor").css("height", editorHeight + "px");
}

editManager.prototype.drawThumbnails = function(pageNum) {
    // thumbnail 부분 setting
    var thumbnailWidth = $(".filmstrip").width();
    var thumbnailHeight = thumbnailWidth * 0.543;

    var thumbnailContainer = document.createElement("div");
    var pageNumber = document.createElement("div");
    var thumbnail = document.createElement("div");
    var view = document.createElement("div");

    thumbnailContainer.setAttribute("id", "thumbnail-container-" + pageNum);
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
    thumbnail.appendChild(view);

    thumbnailContainer.appendChild(thumbnail);

    $("#filmstrip").append(thumbnailContainer);
}

editManager.prototype.drawTest = function() {

    for (var pageNum = 1; pageNum <= 20; pageNum++) {
        this.drawThumbnails(pageNum);
    }
}