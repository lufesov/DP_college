
function oferta() {
    history.pushState(null, null, '/oferta');
    pagefound = true;
    $("#content").html('\
    <div class="news-text" style="padding: 50px">\
    <p class="c5"><span class="c2">Договор оферты</span></p>\
    <p class="c3"><span class="c2"></span></p>\
    <p class="c0"><span class="c1">Пользуясь продуктами проекта “HellFox”, вы автоматически соглашаетесь со всем что указано ниже и не имеете никаких претензий к проекту или его администрации.</span></p>\
    <p class="c0 c4"><span class="c1"></span></p>\
    <p class="c0"><span class="c1">Все покупки в каком виде они не были представлены, они не являются реальными, а также любая валюта не является реальной и никакого отношения не имеет с настоящей валютой какой-либо страны или государства.</span>\
    </p>\
    <p class="c0 c4"><span class="c1"></span></p>\
    <p class="c0"><span class="c1">Используя страницу пополнения вы не совершаете покупку, а лишь жертвуете проекту “HellFox” на дальнейшее его развитие в добровольном порядке, а мы за данное действие вас благодарим в виде монет на нашем проекте, которые в можете обменивать на какие-либо привилегии, бонусы, предметы и иные виды поощрений.</span></p>\
    <p class="c0 c4"><span class="c1"></span></p>\
    <p class="c0"><span class="c1">Также так, как вы ничего не покупаете, возможность возврата валюты, денег или чего-либо еще отсутствует (За исключением проблем со стороны проекта).</span>\
    </p>\
    </div>\
    ');
}

$("#oferta").click(oferta);

var isResizeble = false;

if ((!isResizeble) && (window.location.pathname == '/oferta')) {
    oferta();
    isRezeble = true;
}