
function lk() {
    history.pushState(null, null, '/lk');
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
        url: '/?api=authcheck',
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            if (rsp.type == 'err') {
                auth();
            } else {
                prof.a = rsp.cont;
                lkcont();
            }
        }
    });

    function lkcont() {
        $("#content").html('\
            <div class="up-btns flex grid grid-cols-5">\
                <div class="noselect up-btn prof active-up-btn">Профиль</div>\
                <div class="noselect up-btn priv">Привилегии</div>\
                <div class="noselect up-btn pop">Пополнить</div>\
                <div class="noselect up-btn bon">Бонусы</div>\
                <div class="noselect up-btn refer">Рефералы</div>\
            </div>\
            <div id="cont" class="minhei bgcont"></div>\
            <div class="noselect inventory-btn">Инвентарь</div>\
        ');

        prof();


        $('.inventory-btn').click(function() {
            $('.up-btn').removeClass('active-up-btn');
            $('.up-btn').prop('disabled', false);
            $(this).prop('disabled', true);
            $(this).addClass('active-inventory-btn');
            inventory();
        });

        $('.prof').click(function() {
            $('.inventory-btn').removeClass('active-inventory-btn');
            $('.up-btn').removeClass('active-up-btn');
            $('.up-btn').prop('disabled', false);
            $(this).prop('disabled', true);
            $(this).addClass('active-up-btn');
            prof();
        });
        
        $('.priv').click(function() {
            $('.inventory-btn').removeClass('active-inventory-btn');
            $('.up-btn').removeClass('active-up-btn');
            $('.up-btn').prop('disabled', false);
            $(this).prop('disabled', true);
            $(this).addClass('active-up-btn');
            priv();
        });
        
        $('.pop').click(function() {
            $('.inventory-btn').removeClass('active-inventory-btn');
            $('.up-btn').removeClass('active-up-btn');
            $('.up-btn').prop('disabled', false);
            $(this).prop('disabled', true);
            $(this).addClass('active-up-btn');
            pop();
        });
        
        $('.bon').click(function() {
            $('.inventory-btn').removeClass('active-inventory-btn');
            $('.up-btn').removeClass('active-up-btn');
            $('.up-btn').prop('disabled', false);
            $(this).prop('disabled', true);
            $(this).addClass('active-up-btn');
            bon();
        });
        
        $('.refer').click(function() {
            $('.inventory-btn').removeClass('active-inventory-btn');
            $('.up-btn').removeClass('active-up-btn');
            $('.up-btn').prop('disabled', false);
            $(this).prop('disabled', true);
            $(this).addClass('active-up-btn');
            refer();
        });
    }
}

function inventory() {
    $("#cont").html(' ');
    $('#inventory-btn').addClass('inventory-btn-active');
}

$("#lk").click(lk);

var isResizeble = false;

if ((!isResizeble) && (window.location.pathname == '/lk')) {
    lk();
    isRezeble = true;
}
