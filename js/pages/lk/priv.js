function priv() {
    $("#cont").html('\
        <center style="margin-top: 15px">\
            <div class="privin">\
                <span style="font-size: 20px;">ВЫБЕРИТЕ СЕРВЕР, ГДЕ ХОТИТЕ СТАТЬ ЛУЧШЕ:</span>\
            </div>\
            <div id="listserver" style="margin-top: 15px;"></div>\
            <div id="choosepriv" class="choosepriv none"></div>\
        </center>\
    ');
    $.ajax({
        type: "POST",
        url: '/?api=getservers',
        dataType : 'json',
        success: function(rsp){
            $("#listserver").html('\
                <select class="selectserver" style="margin-left: -4px" id="changeserver" onchange="changeserver()">\
                    <option id="server" class="profinf" value="0" selected="selected" disabled>Выберите сервер</option>\
                </select>\
            ');
            $.each(rsp.arr, (i, server) => {
                $("#changeserver").append('\
                    <option id="server" class="profinf" value="'+server.id+'">'+server.name+'</option>\
                ');
            });
        }
    });
}

function changeserver() {
    $('#choosepriv').removeClass('none');
    $("#choosepriv").html('\
    <span style="font-size: 22px;">Какую привилегию хочешь?</span>\
    <div class="flex grid grid-cols-6" style="margin-top: 15px;">\
        <div priv="1" class="noselect up-btn chooseprivis" onclick="choosetime(choosetime.a = 1)">\
            <img src="/img/icons/coal.webp" width="50px" alt="">\
            <span>Вип</span>\
        </div>\
        <div priv="2" class="noselect up-btn chooseprivis" onclick="choosetime(choosetime.a = 2)">\
            <img src="/img/icons/iron.webp" width="50px" alt="">\
            <span>Премиум</span>\
        </div>\
        <div priv="3" class="noselect up-btn chooseprivis" onclick="choosetime(choosetime.a = 3)">\
            <img src="/img/icons/gold.webp" width="50px" alt="">\
            <span>Гранд</span>\
        </div>\
        <div priv="4" class="noselect up-btn chooseprivis" onclick="choosetime(choosetime.a = 4)">\
            <img src="/img/icons/emer.webp" width="50px" alt="">\
            <span>Элита</span>\
        </div>\
        <div priv="5" class="noselect up-btn chooseprivis" onclick="choosetime(choosetime.a = 5)">\
            <img src="/img/icons/diamond.webp" width="50px" alt="">\
            <span>Делюкс</span>\
        </div>\
        <div priv="6" class="noselect up-btn chooseprivis" onclick="choosetime(choosetime.a = 6)">\
            <img src="/img/icons/star.webp" width="50px" alt="">\
            <span>Легенда</span>\
        </div>\
    </div>\
    <div id="choosetime" style="margin-top: 35px"></div>\
    ');
}

function choosetime() {
    $('[priv]').removeClass('chooseprivisselect');
    $('[priv='+choosetime.a+']').addClass('chooseprivisselect');
    $.ajax({
        type: "POST",
        url: '/?api=getprivis',
        data: {val:choosetime.a},
        dataType : 'json',
        success: function(rsp){
            if (rsp.type == 'arr') {
                $("#choosetime").html('\
                    <span style="font-size: 22px;">Выбери на сколько хочешь привилегию!</span>\
                    <div style="margin-top: 25px">\
                        <input type="range" min="1" max="3" value="1" step="1" class="timebuy" id="changeper" onchange="changeper(changeper.a = '+rsp.arr.price+')" />\
                        <div class="flex timesbuy">\
                            <span style="margin-left: -2em;" class="noselect">1 месяц</span>\
                            <span style="margin-left: 96px;" class="noselect">2 месяца</span>\
                            <span style="margin-left: 91px;" class="noselect">3 месяца</span>\
                        </div>\
                        <div class="pricebuy">\
                            <div class="flex">\
                                <span>Цена:</span>\
                                <span id="pricepriv" class="pricecount">'+rsp.arr.price+' Монет</span>\
                            </div>\
                            <div class="flex">\
                                <span>Баланс:</span>\
                                <span class="pricecount">'+prof.a.donate+' Монет</span>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="buypriv" id="btnbuy" onclick="buypriv()">Купить</div>\
                ');
            } else {
                alertsucc(alertsucc.a = rsp);
            }
        }
    });
}

function changeper() {
    if ($('#changeper').val() == 1) {
        var pri = Math.round(changeper.a*$('#changeper').val());
        $("#pricepriv").html(pri+' Монет');
    } else if ($('#changeper').val() == 2) {
        var pri = Math.round(changeper.a*$('#changeper').val());
        var prinew = Math.round(changeper.a*$('#changeper').val()/100*95);
        $("#pricepriv").html('<strike>'+pri+'</strike> '+prinew+' Монет (-5%)');
    } else if ($('#changeper').val() == 3) {
        var pri = Math.round(changeper.a*$('#changeper').val());
        var prinew = Math.round(changeper.a*$('#changeper').val()/100*85);
        $("#pricepriv").html('<strike>'+pri+'</strike> '+prinew+' Монет (-15%)');
    }
}

function buypriv() {
    var val = {
        server: $('#changeserver').val(),
        priv: choosetime.a, 
        time: $('#changeper').val()
      };

    $('#btnbuy').addClass('none');

    setTimeout(
        () => {
            $('#btnbuy').removeClass('none');
        },
        1 * 1000
    );

    $.ajax({
        type: "POST",
        url: '/?api=buyprivis',
        data: val,
        dataType : 'json',
        success: function(rsp){
            if (rsp.type == 'arr') {
                lk();
                alertsucc(alertsucc.a = rsp);
            } else {
                alertsucc(alertsucc.a = rsp);
                $('#btnbuy').removeClass('none');
            }
        }
    });
}