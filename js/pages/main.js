
function main() {
    history.pushState(null, null, '/');
    pagefound = true;
    $("#content").html('\
        <div class="preloader">\
            <div class="preloader__row">\
                <div class="preloader__item"></div>\
                <div class="preloader__item"></div>\
            </div>\
        </div>\
    ');
    $.ajax({
        type: "POST",
        url: '/?api=main',
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            $("#content").html('');
            $.each(rsp.arr, (i, news) => {
                $("#content").append('\
                <div class="news-items">\
                <div>\
                    <img class="news-img" src="/img/news/'+news.img+'">\
                    <div class="news-hat">\
                        <div class="news-hat-one">\
                            <div class="news-type">'+news.category+'</div>\
                        </div>\
                        <svg class="_9_bs" viewBox="0 0 20 20">\
                            <path id="_9_bs" d="M 19.99997711181641 20 L 0 19.99633598327637 L 0 0 C 0.1884539723396301 10.92631244659424 9.158596992492676 19.89646148681641 20 19.99592971801758 L 19.99997711181641 20 Z">\
                            </path>\
                        </svg>\
                        <svg class="_6_br" viewBox="0 0 20 20">\
                            <path id="_6_br" d="M 19.99997711181641 20 L 0 19.99633598327637 L 0 0 C 0.1884539723396301 10.92631244659424 9.158596992492676 19.89646148681641 20 19.99592971801758 L 19.99997711181641 20 Z">\
                            </path>\
                        </svg>\
                    </div>\
                    <div class="news-name">'+news.name+'</div>\
                </div>\
                <div class="news-text">'+news.text+'</div>\
                <div class="news-footer">\
                    <div class="my-auto">'+news.views+' просмотров</div>\
                    <div class="news-footer-info space-x-4 my-auto">\
                        <div>'+news.author+'</div>\
                        <div>'+news.date+'</div>\
                    </div>\
                </div>\
            </div>\
            ');
            });
        }
    });
}

$("#main").click(main);

var isResizeble = false;

if ((!isResizeble) && (window.location.pathname == '/')) {
    main();
    isRezeble = true;
}

if ((!isResizeble) && (window.location.pathname == '')) {
    main();
    isRezeble = true;
}