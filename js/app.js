
    var pagefound = false;


    function monitor() {
        $.ajax({
            type: "POST",
            url: '/?api=monitor',
            success: function (rsp) {
                var rsp = $.parseJSON(rsp);
                if (rsp.arr[1].plist) {
                    var plist0 = $.parseJSON(rsp.arr[0].plist);
                } else {
                    var plist0 = 0;
                }
                if (rsp.arr[1].plist) {
                    var plist1 = $.parseJSON(rsp.arr[1].plist);
                } else {
                    var plist1 = 0;
                }
                if (rsp.arr[1].plist) {
                    var plist2 = $.parseJSON(rsp.arr[2].plist);
                } else {
                    var plist2 = 0;
                }
    
                $("#server-name-1").html(rsp.arr[0].name);
                $("#server-version-1").html('Версия '+rsp.arr[0].version);
                if (rsp.arr[0].status == 1) {
                    $("#server-players-1").html(rsp.arr[0].players);
                    $("#server-maxplayers-1").html('из '+rsp.arr[0].maxplayers);
                    $("#server-maxplayers-1").attr('style', '');
                } else {
                    $("#server-maxplayers-1").css('font-size', '48px');
                    $("#server-maxplayers-1").css('margin-top', '50px');
                    $("#server-maxplayers-1").css('margin-left', '-100px');
                    $("#server-maxplayers-1").html('Оффлайн');
                }
    
                $("#server-name-2").html(rsp.arr[1].name);
                $("#server-version-2").html('Версия '+rsp.arr[1].version);
                if (rsp.arr[1].status == 1) {
                    $("#server-players-2").html(rsp.arr[1].players);
                    $("#server-maxplayers-2").html('из '+rsp.arr[1].maxplayers);
                    $("#server-maxplayers-2").attr('style', '');
                } else {
                    $("#server-maxplayers-2").css('font-size', '48px');
                    $("#server-maxplayers-2").css('margin-top', '50px');
                    $("#server-maxplayers-2").css('margin-left', '-56px');
                    $("#server-maxplayers-2").html('Оффлайн');
                }
    
                $("#server-name-3").html(rsp.arr[2].name);
                $("#server-version-3").html('Версия '+rsp.arr[2].version);
                if (rsp.arr[2].status == 1) {
                    $("#server-players-3").html(rsp.arr[2].players);
                    $("#server-maxplayers-3").html('из '+rsp.arr[2].maxplayers);
                    $("#server-maxplayers-3").attr('style', '');
                } else {
                    $("#server-maxplayers-3").css('font-size', '48px');
                    $("#server-maxplayers-3").css('margin-top', '50px');
                    $("#server-maxplayers-3").html('Оффлайн');
                }
            }
        });
    } 


    (function delay(duration) {
          monitor();
          setTimeout(delay, duration, duration);
    })(60000)        

    function alertsucc() {
        var al = new Date().getTime();
        if (alertsucc.a.type == 'arr') {
            alertsucc.a = alertsucc.a.arr;
            alertsucc.b = 'alertsucc';
        } else {
            alertsucc.a = alertsucc.a.err
            alertsucc.b = 'alerterr';
        }
        $( "[class=alertbody]" ).append('\
            <div class="alertcountpre '+alertsucc.b+' animate-alert" al="'+al+'">\
                <div class="alerttext">'+alertsucc.a+'</div>\
            </div>\
        ');
        setTimeout(
            () => {
                $('[al='+al+']').removeClass('animate-alert');
                $('[al='+al+']').removeClass('alertcountpre');
                $('[al='+al+']').addClass('alertcount');
                setTimeout(
                    () => {
                        $('[al='+al+']').addClass('animate-ping');
                        setTimeout(
                            () => {
                                $('[al='+al+']').removeClass('alertcount');
                                $('[al='+al+']').removeClass('animate-ping');
                                $('[al='+al+']').addClass('none');
                                $('[al='+al+']').html('');
                            },
                            1 * 1000
                        );
                    },
                    2 * 1000
                );
            },
            1 * 1000
        );
    }