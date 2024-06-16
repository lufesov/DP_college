

function pop() {
    $("#cont").html('\
    <center style="margin-top: 15px">\
        <div class="privin">\
            <span style="font-size: 20px;">Сколько монет хотите получить?</span>\
        </div>\
        <center id="buyfo" class="flex" style="width: 100%;margin-top: 50px;">\
            <input id="popmoney" type="number" value="100" class="perevalut" style="width: 100px;text-align: center;padding-left: 15px">\
            <div class="perevalut-btn noselect" onclick="popmoney()">Пополнить</div>\
        </center>\
        <span style="display: block;margin-top: 10px;">Пополняя баланс вы автоматически соглашаетесь<br>с <a onclick="oferta()">договором оферты</a> HellFox</span>\
    </center>\
    <center style="margin-top: 50px;">\
        <div class="privin"> <span style="font-size: 20px;">Передать монеты игроку:</span> </div>\
        <div style="display: flex;margin-left: auto;width: 100%;text-align: center;margin-top: 40px;">\
            <span style="display: block;margin-top: 20px;margin-left: auto;margin-right: 68px;text-align: right; width: 180px;">ник игрока:</span>\
            <span style="display: block;margin-top: 20px;width: 200px;margin-right: auto;text-align: left;">кол-во:</span>\
        </div>\
        <center id="buyfo" class="flex" style="width: 100%;">\
            <input id="nametransf" type="text" class="perevalut" style="width: 192px;text-align: center;padding-left: 15px;border-radius: 5px 0 0 5px;">\
            <input id="valtransf" type="number" value="100" class="perevalut" style="width: 100px;text-align: center;padding-left: 15px;border-left: 0;border-radius: 0;margin-left: 0;">\
            <div class="perevalut-btn noselect" onclick="transfer()">Передать</div>\
        </center>\
        <span style="display: block;font-size: 16px;margin-top: 10px;">Если передадите монеты не тому игроку, которому хотели. <br>Администрация ни чем вам не поможет!!!</span>\
    </center>\
    ');
}

function transfer() {
    $('[id="buyfo"]').addClass('none');
    var val = [
        $("[id=nametransf]").val(),
        $("[id=valtransf]").val()
        ];
    $.ajax({
        type: "POST",
        url: '/?api=transfer',
        data: {val:val},
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            if (rsp.type == 'arr') {
                alertsucc(alertsucc.a = rsp);
                setTimeout(
                    () => {
                        $('[id="buyfo"]').removeClass('none');
                    },
                    1 * 1000
                );
            } else {
                alertsucc(alertsucc.a = rsp);
                setTimeout(
                    () => {
                        $('[id="buyfo"]').removeClass('none');
                    },
                    1 * 1000
                );
            }
        }
    });
}

function popmoney() {
    $(this).addClass('none');
    $.ajax({
        type: "POST",
        url: '/?api=popmoney',
        data: {val:$('[id="popmoney"]').val()},
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            if (rsp.status == 200) {
                rsp.type = 'arr';
                rsp.arr = 'Сейчас вы перейдете на сайт для оплаты!';
                alertsucc(alertsucc.a = rsp);
                setTimeout(
                    () => {
                        window.open(rsp.data.url, '_blank');
                    },
                    1 * 1000
                );
            } else {
                rsp.type = 'err';
                rsp.err = 'Произошла ошибка!';
                alertsucc(alertsucc.a = rsp);
                setTimeout(
                    () => {
                        $(this).removeClass('none');
                    },
                    1 * 1000
                );
            }
        }
    });
}