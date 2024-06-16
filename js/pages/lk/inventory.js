
function inventory() {
    $("#cont").html('\
        <div class="flex grid grid-cols-2 minhei">\
            <center class="inv-first-block">\
                <div id="invlist" style="padding: 15px;"></div>\
            </center>\
            <center>\
                <div id="invinf" style="margin-top: 25px;">\
                    <span style="font-size: 22px;">Выберите предмет</span>\
                </div>\
            </center>\
        </div>\
    ');

    $.ajax({
        type: "POST",
        url: '/?api=invget',
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            if (rsp.type == 'err') {
                $("#invlist").html(rsp.err);
            } else {
                $("#invlist").addClass('flex grid grid-cols-4');
                $("#invlist").html('');
                $.each(rsp.inventory, (i, inv) => {
                    if (inv.value || inv.refer) {
                        console.log(inv.itminf);
                        $("#invlist").append('<div class="invitem" id="invitem" invid="'+inv.id+'" value="'+inv.value+'" refer="'+inv.refer+'" name="'+inv.itminf.name+'" sitmid="'+inv.itminf.id+'" sname="'+inv.itminf.sname+'" onclick="selectitm(selectitm.id = '+inv.id+')"><img src="/img/items/'+inv.itminf.sname+'.png" class="invimg"></div>');
                    }
                });
            }
        }
    });
}

function selectitm() {

    var valu = $('[invid='+selectitm.id+']').attr('value');
    var refer = $('[invid='+selectitm.id+']').attr('refer');
    var summ = Number(parseInt(valu)+parseInt(refer));

    selectitm.sum = summ;

    $('[id=invitem]').removeClass('invitem-select');
    $('[invid='+selectitm.id+']').addClass('invitem-select');
    $("#blockname").html($('[invid='+selectitm.id+']').attr('name'));
    $("#invinf").html('\
    <div style="overflow: auto;"><i style="font-size: 24px;">'+$('[invid='+selectitm.id+']').attr('name')+'</i></div>\
    <hr style="margin-top: 20px"><span style="font-size: 22px;" id="value">Ваш инвентарь:</span><hr><br>\
    <span style="font-size: 22px;">В наличии: '+$('[invid='+selectitm.id+']').attr('value')+' шт.</span><br><br>\
    <span style="font-size: 18px;">Передать в игру:</span>\
    <div id="listserver" style="margin-top: 15px;"></div>\
    <div id="choosepriv" class="none"></div>\
    <br>\
    <hr style="margin-top: 20px;">\
    <span style="font-size: 22px;" id="value">Реферальный инвентарь:</span>\
    <hr>\
    <br>\
    <span style="font-size: 22px;">В наличии: '+$('[invid='+selectitm.id+']').attr('refer')+'  шт.</span>\
    <div>\
        <div class="flex timesbuy" style="margin-top: 20px;">\
            <div style="text-align: center;margin-left: -1em;width: 50px;" class="noselect">В инвентарь</div>\
            <div style="text-align: center;margin-left: 13em;width: 50px;" class="noselect">Рефералам</div>\
        </div>\
        <input type="range" min="0" max="'+summ+'" value="'+$('[invid='+selectitm.id+']').attr('value')+'" step="1" class="timebuy" id="changeinvandref">\
        <div class="flex timesbuy" style="margin-top: 5px;">\
            <input id="invcounts" style="text-align: center;margin-right: auto;width: 50px;background-color: transparent;" class="noselect" type="number" value="'+$('[invid='+selectitm.id+']').attr('value')+'">\
            <input id="refercounts" style="text-align: center;margin-left: auto;width: 50px;background-color: transparent;" class="noselect" type="number" value="'+$('[invid='+selectitm.id+']').attr('refer')+'">\
        </div>\
    </div>\
    <div id="perevodinrefer" class="perere-btn">Перевести</div>\
    <br>\
    <div></div>\
    ');

    $('#perevodinrefer').click(function() {
        $('#perevodinrefer').addClass('none');
        setTimeout(
            () => {
                $('#perevodinrefer').removeClass('none');
            },
            1 * 1000
        );

        var val = {
            id: selectitm.id,
            inv: $('[id=invcounts]').val(),
            ref: $('[id=refercounts]').val()
          };

        $.ajax({
            type: "POST",
            url: '/?api=perevodinrefers',
            data: val,
            success: function (rsp) {
                var rsp = $.parseJSON(rsp);
                if (rsp.type == 'err') {
                    alertsucc(alertsucc.a = rsp);
                } else {
                    alertsucc(alertsucc.a = rsp);
                    inventory();
                }
            }
        });

    });

    $.ajax({
        type: "POST",
        url: '/?api=getserversinventory',
        data: {val:$('[invid='+selectitm.id+']').attr('sitmid')},
        dataType : 'json',
        success: function(rsp){
            $("#listserver").html('\
                <select class="selectserver" style="margin-left: -4px" id="changeserver">\
                    <option id="server" class="profinf" value="0" selected="selected" disabled>Выберите сервер</option>\
                </select>\
            ');
            $.each(rsp.arr, (i, server) => {
                if (server) {
                    $("#changeserver").append('\
                        <option id="server" class="profinf" value="'+server.id+'">'+server.name+'</option>\
                    ');
                }
            });

            $('[id=changeserver]').on('change', function(){
                $('#choosepriv').removeClass('none');
                $("#choosepriv").html('\
                    <center class="flex" style="width: 100%; margin-top: 15px;">\
                        <input id="countgiveitem" type="number" value="0" class="perevalut">\
                        <div id="giveitem" class="perevalut-btn">Отправить</div>\
                    </center>\
                ');

                $('#giveitem').click(function() {
                    $('#countgiveitem').addClass('none');
                    $('#giveitem').addClass('none');
                    setTimeout(
                        () => {
                            $('#countgiveitem').removeClass('none');
                            $('#giveitem').removeClass('none');
                        },
                        1 * 1000
                    );
            
                    var val = {
                        id: selectitm.id,
                        value: $('[id=countgiveitem]').val(),
                        sid: $('#changeserver').val()
                      };
            
                    $.ajax({
                        type: "POST",
                        url: '/?api=itemgive',
                        data: val,
                        success: function (rsp) {
                            var rsp = $.parseJSON(rsp);
                            if (rsp.type == 'err') {
                                alertsucc(alertsucc.a = rsp);
                            } else {
                                alertsucc(alertsucc.a = rsp);
                                inventory();
                            }
                        }
                    });
            
                });
            });
        }
    });

    $('[id=changeinvandref]').bind('input', function() {
        var ostrefer = parseInt(selectitm.sum)-parseInt($(this).val());
        $('#invcounts').attr('value', $(this).val());
        $('#refercounts').attr('value', ostrefer);
    });

	$('[id=invcounts]').bind('input', function(){
        var ostrefer = parseInt(selectitm.sum)-parseInt($(this).val());
        $('[id=changeinvandref]').val($(this).val());
        $('[id=refercounts]').val(ostrefer);
	});

	$('[id=refercounts]').bind('input', function(){
        var ostrefer = parseInt(selectitm.sum)-parseInt($(this).val());
        $('[id=changeinvandref]').val(ostrefer);
        $('[id=invcounts]').val(ostrefer);
	});
}