function refer() {
    $("#cont").html('\
    <center class="noselect"><hr>Загрузка...<hr></center>\
    ');

    $.ajax({
        type: "POST",
        url: '/?api=checkref',
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            if (rsp.type == 'err') {
                $("#cont").html('\
                <center class="noselect"><hr>'+rsp.err+'<hr></center>\
                ');
            } else {
                $("#cont").html('\
                <div class="start">\
                    <div id="refnameconts"></div>\
                    <center>\
                        <div id="listserver" style="margin-top: 15px; margin-left: 15px;"></div>\
                        <br><hr><br>\
                        <div id="choosepriv" class="none"></div> <span style="white-space: normal;">\
                            С каждого реферала вы будете получать 5% от их доната, которые вы можете вывести на киви, либо обменять на монеты с множителем в 3 раза!!!\
                        </span>\
                        <hr style="margin-top: 15px;"><br> \
                        <span style="white-space: normal;padding: 15px;font-size: 20px;">\
                            Выберите какие предметы получат люди, которые укажут ваш ник:\
                        </span>\
                        <div id="refinv" style="border: 1px solid #0000003d;margin-top: 15px;border-radius: 15px;width: 100%;height: auto;min-height: 200px;padding-left: 15px;padding-right: 15px;padding-bottom: 15px;"></div>\
                        <span id="used" style="font-size: 20px;"></span>\
                        <br><hr><br>\
                        <span style="font-size: 20px;">Ваш реферальный баланс: '+prof.a.rub+' р.</span><br><br>\
                        <hr><br>\
                        <div class="startdownllin noselect" id="rubtransfer" style="margin-top: 15px;width: 250px;font-size: 20px;padding: 10px;margin: auto;height: 50px;">Перевести в '+(prof.a.rub*3).toFixed(2)+' монет</div>\
                        <br><hr><br>\
                        <span>Введите номер кошелька киви начиная с 7 без +</span>\
                        <center id="buyfo" class="flex" style="width: 100%;">\
                            <input id="countvivodmoney" type="text" value="7" class="perevalut" style="width: 165px;text-align: left;padding-left: 15px">\
                            <div id="vivod" class="perevalut-btn noselect">Вывести</div>\
                        </center>\
                    </center>\
                </div>\
                ');

                $("[id='vivod']").click(function() {
                    console.log('123');
                    $.ajax({
                        type: "POST",
                        url: '/?api=vivod',
                        data: {val:$('[id=countvivodmoney]').val()},
                        success: function (rsp) {
                            console.log(rsp);
                            var rsp = $.parseJSON(rsp);
                            if (rsp.type == 'err') {
                                alertsucc(alertsucc.a = rsp);
                            } else {
                                alertsucc(alertsucc.a = rsp);
                                lk();
                            }
                        }
                    });
                });

                if (prof.a.referal){
                    $("#refnameconts").html('\
                    <div class="startdiv" style="width: 100%;">\
                        <center class="startone" style="margin: auto;font-size:22px;">\
                            Вас пригласил:\
                            <br><hr><br>\
                            <input type="text" id="refername" style="text-align: center;border: 1px solid #0000003d;border-radius: 15px;" readonly value="'+prof.a.referal+'">\
                        </center>\
                    </div>\
                    ');
                } else {
                    $("#refnameconts").html('\
                    <div class="startdiv" style="width: 100%;">\
                        <center class="startone" style="margin: auto;font-size:22px;">\
                            Введите ник пригласившего вас человека:\
                            <br><hr><br>\
                            <input type="text" id="refername" style="text-align: center;border: 1px solid #0000003d;border-radius: 15px;">\
                        </center>\
                    </div>\
                    <center class="none" id="refpred">\
                        <br>\
                        <span style="font-size: 20px;" class="none">Вы получите:</span>\
                        <div id="refnamecont" class="none" style="border: 1px solid #0000003d;margin-top: 15px;border-radius: 15px;width: 100%;height: auto;min-height: 200px;padding-left: 15px;padding-right: 15px;padding-bottom: 15px;"></div>\
                        <br>\
                        <div class="startdownllin noselect" id="takeref" style="margin-top: 15px;width: 121px;font-size: 20px;padding: 10px;margin: auto;height: 50px;">Получить</div>\
                    <center>\
                    ');
                }

                $("[id='refername']").on('change',function() {
                    if ($(this).val()) {
                        var vall = $(this).val();
                        $.ajax({
                            type: "POST",
                            url: '/?api=refitemget',
                            data: {name:vall},
                            success: function (rsp) {
                                var rsp = $.parseJSON(rsp);
                                if (rsp.type == 'err') {
                                    alertsucc(alertsucc.a = rsp);
                                } else {
                                    $("#refnamecont").html('');
                                    $("#refpred").removeClass('none');
                                    $("#takeref").attr('val', vall);
                                    $("#refnamecont").removeClass('none');
                                    if (rsp.items) {
                                        $.each(rsp.items, (i, itm) => {
                                            $("#refnamecont").addClass('flex grid grid-cols-8');
                                            $("#refnamecont").append('<div class="invitem"><img src="/img/items/'+itm.sname+'.png" class="invimg noselect"><input class="noselect" style="width: 50px;border: 1px solid #0000003d;border-radius: 10px; margin-top: 4px;text-align: center;" value="'+itm.val+'" type="text" readonly></div>');
                                        });
                                    } else {
                                        $("#refnamecont").html('Вы ни чего не получите, но все равно можете стать рефералом!');
                                    }
                                    $("[id='takeref']").click(function() {
                                        $('#takeref').addClass('none');
                                        setTimeout(
                                            () => {
                                                $('#takeref').removeClass('none');
                                            },
                                            1 * 1000
                                        );
                                        $.ajax({
                                            type: "POST",
                                            url: '/?api=takeref',
                                            data: {name:$(this).attr('val')},
                                            success: function (rsp) {
                                                var rsp = $.parseJSON(rsp);
                                                if (rsp.type == 'err') {
                                                    alertsucc(alertsucc.a = rsp);
                                                } else {
                                                    alertsucc(alertsucc.a = rsp);
                                                    lk();
                                                }
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    } else {
                        $("#refpred").addClass('none');
                        $("#refnamecont").removeClass('flex grid grid-cols-8');
                        $("#refnamecont").html('');
                    }
                });

                $.ajax({
                    type: "POST",
                    url: '/?api=refinv',
                    success: function (rsp) {
                        var rsp = $.parseJSON(rsp);
                        if (rsp.type == 'err') {
                            $("#refinv").html(rsp.err);
                        } else {
                            $("#refinv").addClass('flex grid grid-cols-8');
                            $("#refinv").html('');
                            $.each(rsp.inventory, (i, inv) => {
                                if (inv.refer > 0) {
                                    $("#refinv").append('<div class="invitem noselect" id="invitem" invid="'+inv.id+'" refer="'+inv.refer+'" name="'+inv.itminf.name+'" sname="'+inv.itminf.sname+'"><img src="/img/items/'+inv.itminf.sname+'.png" class="invimg"><input id="changevalref" style="width: 50px;border: 1px solid #0000003d;border-radius: 10px; margin-top: 4px;text-align: center;" itid="'+inv.itminf.id+'" value="'+inv.valref+'" type="text"></div>');
                                    $("#used").html('У вас предметов хватит на '+rsp.nab+' использований');
                                }
                            });

                            if (rsp.nab != 100000) {
                                $("#used").html('У вас предметов хватит на '+rsp.nab+' использований<br>(Если нужно больше, то пополните в инвентаре).');
                            } else {
                                $("#used").html('');
                            }

                            $("[id='rubtransfer']").click(function() {
                                $.ajax({
                                    type: "POST",
                                    url: '/?api=rubtransfer',
                                    success: function (rsp) {
                                        var rsp = $.parseJSON(rsp);
                                        if (rsp.type == 'err') {
                                            alertsucc(alertsucc.a = rsp);
                                        } else {
                                            alertsucc(alertsucc.a = rsp);
                                            lk();
                                        }
                                    }
                                });
                            });

                            $("[id='changevalref']").on('change',function() {
                                var val = {
                                    id: $(this).attr('itid'),
                                    val: $(this).val()
                                  };
                                $.ajax({
                                    type: "POST",
                                    url: '/?api=refitemval',
                                    data: val,
                                    success: function (rsp) {
                                        var rsp = $.parseJSON(rsp);
                                        if (rsp.type == 'err') {
                                            alertsucc(alertsucc.a = rsp);
                                        } else {
                                            alertsucc(alertsucc.a = rsp);
                                            if (rsp.nab != 100000) {
                                                $("#used").html('У вас предметов хватит на '+rsp.nab+' использований<br>(Если нужно больше, то пополните в инвентаре).');
                                            } else {
                                                $("#used").html('');
                                            }
                                        }
                                    }
                                });
                            });

                        }
                    }
                });
            }
        }
    });
}
