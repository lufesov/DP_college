
function shop() {
    history.pushState(null, null, '/shop');
    pagefound = true;
    $("#content").html('\
        <div class="flex grid grid-cols-2" style="height: 650px;">\
            <center class="inv-first-block" style="border-radius: 30px 0 0 30px; overflow: auto;">\
                <div id="listserver" style="margin-top: 15px;"></div>\
                <div id="invlist" style="padding: 15px;">\
                    <div class="preloader" style="display: flex; position: absolute;height: 56%;width: 18%;">\
                        <div class="preloader__row">\
                            <div class="preloader__item"></div>\
                            <div class="preloader__item"></div>\
                        </div>\
                    </div>\
                </div>\
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
        url: '/?api=getserversshop',
        success: function(rsp){
            var rsp = $.parseJSON(rsp);
            $("#listserver").html('\
                <select class="selectserver" style="margin-left: -4px" id="changeserver">\
                    <option id="server" class="profinf" value="0" selected="selected" disabled>Выберите сервер</option>\
                </select>\
            ');
            $.each(rsp.arr, (i, server) => {
                $("#changeserver").append('\
                    <option id="server" class="profinf" value="'+server.id+'">'+server.name+'</option>\
                ');
            });
            $('[id=changeserver]').on('change', function(){
                $.ajax({
                    type: "POST",
                    url: '/?api=getitems',
                    data: {srv:$('#changeserver').val()},
                    success: function (rsp) {
                        var rsp = $.parseJSON(rsp);
                        if (rsp.type == 'err') {
                            $("#invlist").html(rsp.err);
                        } else {
                            $("#invlist").addClass('flex grid grid-cols-4');
                            $("#invlist").html('');
                            $.each(rsp.items, (i, item) => {
                                $("#invlist").append('<div class="invitem" id="item" itemid="'+item.id+'" name="'+item.name+'" price="'+item.price+'" sname="'+item.sname+'" onclick="selectitem(selectitem.id = '+item.id+')"><img src="/img/items/'+item.sname+'.png" class="invimg"></div>');
                            });
                        }
                    }
                });
            });
        }
    });
}

$("#shop").click(shop);

var isResizeble = false;

if ((!isResizeble) && (window.location.pathname == '/shop')) {
    shop();
    isRezeble = true;
}

function selectitem() {
    $('[itemid]').removeClass('invitem-select');
    $('[itemid='+selectitem.id+']').addClass('invitem-select');
    $("#blockname").html($('[itemid='+selectitem.id+']').attr('name'));
    $("#invinf").html('\
    <div style="overflow: auto;"><i style="font-size: 24px;">'+$('[itemid='+selectitem.id+']').attr('name')+'</i></div>\
    <hr style="margin-top: 20px"><span style="font-size: 22px;" id="value">У вас в наличии: ? шт.</span>\
    <hr><span style="font-size: 22px;" id="colmoney">У вас на счету: ? монет</span><hr><br>\
    <span>При покупке от 32 шт. скидка 15%</span>\
    <br>\
    <span>При покупке от 64 шт. скидка 30%</span>\
    <hr style="margin-top: 20px;">\
    <br>\
    <span>Сколько хотите купить?</span>\
    <center id="buyfo" class="flex" style="width: 100%; margin-top: 15px;">\
        <input id="countgiveitem" type="number" value="1" class="perevalut">\
        <div id="buyitem" class="perevalut-btn">Купить</div>\
    </center>\
    <br>\
    <span id="price">Вы заплатите '+$('[itemid='+selectitem.id+']').attr('price')+' монет</span>\
    <div></div>\
    ');

	$('[id=countgiveitem]').bind('input', function(){
        var price = $('[itemid='+selectitem.id+']').attr('price')*$(this).val();
        var oldprice = price;
        if (parseInt($(this).val()) > 63) {
            price = price*0.7;
            $("#price").html('Вы заплатите <strike>'+oldprice.toFixed(2)+'</strike> '+price.toFixed(2)+' монет');
        } else if (parseInt($(this).val()) > 31){
            price = price*0.85;
            $("#price").html('Вы заплатите <strike>'+oldprice.toFixed(2)+'</strike> '+price.toFixed(2)+' монет');
        } else {
            $("#price").html('Вы заплатите '+price.toFixed(2)+' монет');
        }
	});

    $.ajax({
        type: "POST",
        url: '/?api=getshopinfo',
        data: {id:selectitem.id},
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            $("#value").html('У вас в наличии: '+rsp.items+' шт.');
            $("#colmoney").html('У вас на счету: '+rsp.money+' монет');
        }
    });

    $('#buyitem').click(function() {
        $('#buyfo').addClass('none');
        setTimeout(
            () => {
                $('#buyfo').removeClass('none');
            },
            1 * 1000
        );

        var val = {
            id: selectitem.id,
            val: $('[id=countgiveitem]').val()
          };

        $.ajax({
            type: "POST",
            url: '/?api=buyshop',
            data: val,
            success: function (rsp) {
                var rsp = $.parseJSON(rsp);
                if (rsp.type == 'err') {
                    alertsucc(alertsucc.a = rsp);
                } else {
                    alertsucc(alertsucc.a = rsp);
                    lk();
                    setTimeout(
                        () => {
                            $('.up-btn').removeClass('active-up-btn');
                            $('.up-btn').prop('disabled', false);
                            $('.inventory-btn').prop('disabled', true);
                            $('.inventory-btn').addClass('active-inventory-btn');
                            inventory();
                        },
                        1 * 500
                    );
                }
            }
        });

    });
}