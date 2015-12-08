/**
 * Created by duck on 15. 12. 3.
 */

//document.write("<script type='text/javascript' src='asd.js'><"+"/script>");

function editManager() {
    console.log("create editManager");

    this.svgNS = "http://www.w3.org/2000/svg";
}

editManager.prototype.getSize = function () {
    var width = window.innerWidth * 0.114;
    var height = window.innerHeight;

    width = Math.ceil(width);

    document.getElementById("getWidth").innerHTML = "width : " + width;
    document.getElementById("getHeight").innerHTML = "height : " + height;
}

editManager.prototype.drawFilmstrip = function () {

    var thumbnails = document.createElementNS(this.svgNS, "rect");                   // filmstrip 전체 보여주는 레이아웃
    var cursor = document.createElementNS(this.svgNS, "rect");                       // filmstrip 추가 부분 커서 막대
    var init = 3;
    var addHeight = 89;
    var pageNumber = 1;

    // filmstrip 레이아웃 설정부분
    thumbnails.setAttributeNS(null, "fill", "rgb(255, 255, 255)");
    thumbnails.setAttributeNS(null, "fill-opacity", "0");
    thumbnails.setAttributeNS(null, "width", "100%");
    thumbnails.setAttributeNS(null, "height", "100%");

    // 커서 설정부분
    cursor.setAttributeNS(null, "class", "filmstrip-cursor");
    cursor.setAttributeNS(null, "pointer-events", "none");
    cursor.setAttributeNS(null, "height", "3");
    cursor.setAttributeNS(null, "width", "210");
    cursor.setAttributeNS(null, "x", "5");
    cursor.setAttributeNS(null, "y", "89");
    cursor.setAttributeNS(null, "visibility", "hidden");

    document.getElementById("filmstrip-thumbnails").appendChild(thumbnails);
    document.getElementById("filmstrip-thumbnails").appendChild(cursor);

    for (var i = 0; i < 30; i++) {

        var gThumbnail = document.createElementNS(this.svgNS, "g");                      // thumbnail 그룹
        var gThumbnailRect = document.createElementNS(this.svgNS, "rect");               // 그룹 안의 rect
        var gThumbnailBorder = document.createElementNS(this.svgNS, "rect");             // 그룹 border
        var gThumbnailBorderInner = document.createElementNS(this.svgNS, "rect");        // 그룹 border-inner
        var gThumbnailPageNumber = document.createElementNS(this.svgNS, "text");         // 그룹 page number
        var gSmallCanvas = document.createElementNS(this.svgNS, "g");

        // thumbnail 그룹
        gThumbnail.setAttributeNS(null, "class", "filmstrip-thumbnail");
        gThumbnail.setAttributeNS(null, "pointer-events", "none");
        gThumbnail.setAttributeNS(null, "transform", "translate(0 " + init + ")");
        init += addHeight;

        // thumbnail 그룹 안의 rect
        gThumbnailRect.setAttributeNS(null, "fill", "rgb(127, 127, 127");
        gThumbnailRect.setAttributeNS(null, "x", "0");
        gThumbnailRect.setAttributeNS(null, "y", "-1.5");
        gThumbnailRect.setAttributeNS(null, "width", "100%");
        gThumbnailRect.setAttributeNS(null, "height", "89");

        // 그룹 border
        gThumbnailBorder.setAttributeNS(null, "class", "filmstrip-thumbnail-border");
        gThumbnailBorder.setAttributeNS(null, "x", "57.5");
        gThumbnailBorder.setAttributeNS(null, "y", "4.5");
        gThumbnailBorder.setAttributeNS(null, "width", "133");
        gThumbnailBorder.setAttributeNS(null, "height", "77");

        // 그룹 border inner
        gThumbnailBorderInner.setAttributeNS(null, "class", "filmstrip-thumbnail-border-inner");
        gThumbnailBorderInner.setAttributeNS(null, "stroke-width", "1");
        gThumbnailBorderInner.setAttributeNS(null, "fill", "rgb(255, 255, 255)");
        gThumbnailBorderInner.setAttributeNS(null, "x", "58.5");
        gThumbnailBorderInner.setAttributeNS(null, "y", "5.5");
        gThumbnailBorderInner.setAttributeNS(null, "width", "131");
        gThumbnailBorderInner.setAttributeNS(null, "height", "75");

        // 그룹 page number 설정
        gThumbnailPageNumber.setAttributeNS(null, "class", "filmstrip-thumbnail-pagenumber");
        gThumbnailPageNumber.setAttributeNS(null, "text-anchor", "end");
        gThumbnailPageNumber.setAttributeNS(null, "x", "49");
        gThumbnailPageNumber.setAttributeNS(null, "y", "13");
        gThumbnailPageNumber.innerHTML = pageNumber;
        pageNumber++;

        // canvas 미리보기 설정
        gSmallCanvas.setAttributeNS(null, "id", "page-" + (pageNumber - 1));
        gSmallCanvas.setAttributeNS(null, "transform", "translate(59 6)");

        // 통합 붙이기
        gThumbnail.appendChild(gThumbnailRect);
        gThumbnail.appendChild(gThumbnailBorder);
        gThumbnail.appendChild(gThumbnailBorderInner);
        gThumbnail.appendChild(gThumbnailPageNumber);
        gThumbnail.appendChild(gSmallCanvas);

        document.getElementById("filmstrip-thumbnails").appendChild(gThumbnail);
        document.getElementById("filmstrip-thumbnails").style.height = init + "px";
    }
}

editManager.prototype.drawCanvas = function () {
    this.drawSVG("pages");
}

editManager.prototype.drawSVG = function (id) {
    var svg = document.createElement("svg");
    var testText = document.createElementNS(this.svgNS, "rect");
    var rect = document.createElementNS(this.svgNS, "rect");
    var gg = document.createElementNS(this.svgNS, "g");

    // svg 설정
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("fill-rule", "evenodd");
    svg.setAttribute("stroke", "none");
    svg.setAttribute("stroke-linecap", "square");
    svg.setAttribute("stroke-miterlimit", "10");
    svg.setAttribute("overflow", "hidden");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("width", "127px");
    svg.setAttribute("height", "72px");
    svg.style.lineHeight = "normal";

    // test로 띄워볼 text
    testText.setAttributeNS(null, "x", "10");
    testText.setAttributeNS(null, "y", "10");
    testText.setAttributeNS(null, "fill", "red");
    testText.setAttributeNS(null, "width", "100");
    testText.setAttributeNS(null, "height", "100");

    // rect 설정
    rect.setAttributeNS(null, "fill", "rgb(5, 5, 5)");
    rect.setAttributeNS(null, "fill-opacity", "0");
    rect.setAttributeNS(null, "width", "100%");
    rect.setAttributeNS(null, "height", "100%");

    gg.setAttributeNS(null, "transform", "translate(0 0) scale(1)");

    gg.appendChild(testText);

    svg.appendChild(rect);
    svg.appendChild(gg);

    document.getElementById(id).appendChild(svg);
}