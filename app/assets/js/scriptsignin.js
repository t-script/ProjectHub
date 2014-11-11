$(document).ready(function () {
    sizeContent();
    $(window).resize(sizeContent);
    $('.tooltip').popup();
});

function sizeContent() {
    var newHeight = $(window).height() + "px";
    $(".jumbo").css("min-height", newHeight);
    $(".wrapper").css("min-height", newHeight);
    $(".popup").css("min-height", newHeight);
    $(".popupWrapper").height( $(window).height() - 100 );
}

function popup() {
    $(".popup").fadeIn( "slow" );
    $("body").css("overflow-y","hidden");
}

function popupClose() {
    $(".popup").fadeOut( "slow" );
    $("body").css("overflow-y","scroll");
}
