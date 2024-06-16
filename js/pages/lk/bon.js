function bon() {
    $("#cont").html('\
    <div class="start">\
        <div class="startdiv">\
            <img class="startimg" style="margin-top: 50px;" src="/img/start/lis01.png" alt="">\
            <div class="startone" style="font-size:22px;">\
                <span>Забусти наш <a href="http://dis.hellfox.ru" class="noselect munus-link startonelink" target="blank">Discord</a></span><br>\
                <span>и напиши там в чат команду: /check_boost</span><br><br><hr><br>\
                <span>За это простое действие ты получишь:</span><br>\
                <span>1. Возможность установить HD скин.</span><br>\
                <span>2. Возможность установить HD плащ.</span><br>\
                <span>3. /kit grand независимо от наличия привилегии.</span><br>\
                <span style="white-space: normal;overflow-wrap: break-word;">(Eсли у вас есть привилегия, то вы просто получите еще один!)</span><br>\
            </div>\
        </div>\
        <center>\
            <div id="listserver" style="margin-top: 15px; margin-left: 15px;"></div>\
            <div id="choosepriv" class="none"></div>\
            <span>В вашем инвентаре должно быть свободно 27 мест!</span>\
            <hr style="margin-top: 15px;">\
            <br>\
            <span style="white-space: normal;padding: 15px;font-size: 20px;">Либо вы можете купить возможность на сутки без ограничений устанавливать HD скин и HD плащ за 50 монет (По истечении суток, установленный плащ и скин остаются с вами).</span>\
            <div class="startdownllin" id="buyskin" style="margin-top: 15px;width: 200px;font-size: 20px;padding: 8px;height: 50px;">Купить за 50 монет</div>\
        </center>\
    </div>\
    ');

    $('#buyskin').click(function() {
        $('#buyskin').addClass('none');
        $.ajax({
            type: "POST",
            url: '/?api=buyskin',
            success: function (rsp) {
                var rsp = $.parseJSON(rsp);
                if (rsp.type == 'err') {
                    alertsucc(alertsucc.a = rsp);
                    setTimeout(
                        () => {
                            $('#buyskin').removeClass('none');
                        },
                        1 * 1000
                    );
                } else {
                    alertsucc(alertsucc.a = rsp);
                }
            }
        });
    });

    $.ajax({
        type: "POST",
        url: '/?api=getservers',
        dataType : 'json',
        success: function(rsp){
            $.each(rsp.arr, (i, server) => {
                $("#listserver").html('\
                    <select class="selectserver" id="changeserver">\
                        <option id="server" class="profinf" value="0" selected="selected" disabled>Выберите сервер</option>\
                    </select>\
                ');
                $("#changeserver").append('\
                    <option id="server" class="profinf" value="'+server.id+'">'+server.name+'</option>\
                ');
            });
    
            $('[id=changeserver]').on('change', function(){
                $('#choosepriv').removeClass('none');
                $("#choosepriv").html('\
                    <div class="startdownllin" id="kitgive" style="margin-top: 15px;width: 189px;font-size: 22px;padding: 8px;height: 50px;">Получить набор</div>\
                ');
    
                $('#kitgive').click(function() {
                    $.ajax({
                        type: "POST",
                        url: '/?api=kitgive',
                        data: {sid:$('#changeserver').val()},
                        success: function (rsp) {
                            var rsp = $.parseJSON(rsp);
                            if (rsp.type == 'err') {
                                alertsucc(alertsucc.a = rsp);
                            } else {
                                alertsucc(alertsucc.a = rsp);
                                $('#kitgive').addClass('none');
                            }
                        }
                    });
            
                });
            });
        }
    });
}