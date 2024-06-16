function prof() {
    if (!prof.a.imya) {
        prof.a.imya = 'Неизвестно';
    }
    if (!prof.a.happyday) {
        prof.a.happyday = '2000-10-10';
    }
    var newskin = new Date().getTime();
    if (prof.a == 0) {
        var profsk = 'default';
        loadImage.a = profsk;
    } else {
        var profsk = prof.a.name;
        loadImage.a = profsk;
    }

    if (!prof.a.vk) {
        prof.a.vks = '<a href="https://oauth.vk.com/authorize?client_id=51772931&display=page&response_type=code&state=https://hellfox.ru/profile&redirect_uri=https://hellfox.ru/?api=vkauth" target="_blank">Привязать</a>';
    } else {
        prof.a.vks = '<a href="https://vk.com/id'+prof.a.vk+'" target="_blank">'+prof.a.vkname+'</a>';
    }

    if (!prof.a.ds) {
        prof.a.ds = '<a href="https://discord.com/api/oauth2/authorize?client_id=1039395705913090149&response_type=code&scope=identify&redirect_uri=https://hellfox.ru/?api=dsauth" target="_blank">Привязать</a>';
    } else {
        prof.a.ds = prof.a.dsname;
    }
    $("#cont").html('\
    <div id="images">\
        <table>\
            <tr>\
                <td>\
                    <input id="dstImg" type="text" value="хуй" style="display: none;" border="1"\
                        alt="Placeholder for new skin. When it shows the proper skin: Right-Click; Save Image As ..."\
                        title="Right-Click; Save Image As ..." />\
                </td>\
                <td rowspan="2" valign="top" style="min-width:64px;">\
                    <div id="characterElementId"></div>\
                </td>\
            </tr>\
            <tr>\
                <td>\
                    <img id="srcImg" src="" border="1" style="display: none;" alt="Placeholder for the source skin" /><br />\
                </td>\
            </tr>\
        </table>\
    </div>\
    <div class="flex grid grid-cols-7">\
        <div class="col-span-2 profskin"><center id="profskinshow"><img class="showskin" src="skins/skin.php?user='+profsk+'&mode=1&size=140&'+ newskin +'" alt=""></center>\
        <div class="startdownllin" style="text-align: center;margin-top: 15px;margin-left: auto;margin-right: auto;width: 85px;font-size: 18px;padding: 4px;height: 36px;" onclick="exit()">Выход</div>\
        </div>\
        <div id="profskinshownew" class="none col-span-2 profskin"><center><img class="showskin" src="skins/skin.php?user='+profsk+'&mode=1&size=140&'+ newskin +'" alt=""></center></div>\
        <div class="col-span-5 profinfo">\
            <table class="profinfocontent">\
                <thead>\
                    <th style="width: 225px;"></th>\
                    <th></th>\
                </thead>\
                <tbody>\
                  <tr style="border-bottom: dotted 1px;">\
                    <td>Игровой ник</td>\
                    <td>'+prof.a.name+'</td>\
                  </tr>\
                  <tr style="border-bottom: dotted 1px;">\
                    <td>Имя</td>\
                    <td><input id="imya" type="text" value="'+prof.a.imya+'" class="profinf" onChange="changeImya()"></td>\
                  </tr>\
                  <tr style="border-bottom: dotted 1px;">\
                    <td>Пол</td>\
                    <td>\
                        <select class="profinf" style="margin-left: -4px" id="gender" onChange="changegenders()">\
                            <option id="genderr" class="profinf" value="0">Неизвестно</option>\
                            <option id="genderr" class="profinf" value="1">Мужской</option>\
                            <option id="genderr" class="profinf" value="2">Женский</option>\
                        </select>\
                    </td>\
                  </tr>\
                  <tr style="border-bottom: dotted 1px;">\
                    <td>Страница VK</td>\
                    <td>'+prof.a.vks+'</td>\
                  </tr>\
                  <tr style="border-bottom: dotted 1px;">\
                    <td>Discord</td>\
                    <td>'+prof.a.ds+'</td>\
                  </tr>\
                  <tr style="border-bottom: dotted 1px;">\
                    <td>Дата рождения</td>\
                    <td><input type="date" id="happyday" value="'+prof.a.happyday+'" class="profinf" onChange="changeHappyday()"></td>\
                  </tr>\
                  <tr style="border-bottom: dotted 1px;">\
                    <td>Дата регистрации</td>\
                    <td>'+prof.a.created+'</td>\
                  </tr>\
                </tbody>\
              </table>\
        </div>\
    </div>\
    <div class="flex grid grid-cols-7">\
        <div class="col-span-2 profupl flex grid grid-cols-2">\
            <label class="form-control">\
                <input class="none" style="display: none" type="file" id="imgLoader" accept="image/png" onChange="loadImage()" />\
                <div class="skinupl">\
                    <div class="uploadicon"></div>\
                    <span class="noselect skinspan">скин</span>\
                </div>\
            </label>\
            <label class="form-control">\
                <input class="none" style="display: none" type="file" id="imgLoadercloak" accept="image/png" onChange="loadcloak()" />\
                <div class="cloakupl">\
                    <div class="uploadicon"></div>\
                    <span class="noselect skinspan">плащ</span>\
                </div>\
            </label>\
        </div>\
        <center class="col-span-5" style="margin-left: 15px;padding: 60px;text-align: left;white-space: normal;">Если ваш HD скин криво отображается в игре, то воспользуйтесь <a href="/skinconverter.html" class="noselect munus-link startonelink" target="_blank">конвертером</a>. Он должен исправить ситуацию!</center>\
    </div>\
    ');

    $('[id=genderr][value='+prof.a.gender+']').attr("selected", "");

    $( "#profskinshow" ).hover(
        function() {
            $('.showskin').attr("src", 'skins/skin.php?user='+profsk+'&mode=2&size=140&'+ newskin);
        }, function() {
            $('.showskin').attr("src", 'skins/skin.php?user='+profsk+'&mode=1&size=140&'+ newskin);
        }
    );

    
}


function loadImage() {
	if (window.FormData === undefined) {
		alert('В вашем браузере FormData не поддерживается')
	} else {
		var loadData = new FormData();
		loadData.append('file', $('#imgLoader')[0].files[0]);
		$.ajax({
			type: "POST",
			url: '/?api=skinupload',
			cache: false,
			contentType: false,
			processData: false,
			data: loadData,
			dataType : 'json',
			success: function(rsp){
                $('#profskinshow').addClass('none');
                $('#profskinshownew').removeClass('none');
                console.log(loadImage.a);
                $( "#profskinshownew" ).hover(
                    function() {
                        $('.showskin').attr("src", 'skins/skin.php?user='+loadImage.a+'&mode=2&size=140&' + new Date().getTime());
                    }, function() {
                        $('.showskin').attr("src", 'skins/skin.php?user='+loadImage.a+'&mode=1&size=140&' + new Date().getTime());
                    }
                );
                $('.showskin').attr("src", 'skins/skin.php?user='+loadImage.a+'&mode=1&size=140&' + new Date().getTime());
                alertsucc(alertsucc.a = rsp);
			}
		});
	}

}

function exit() {
    $.ajax({
        type: "POST",
        url: '/?api=exit',
        dataType : 'json',
        success: function(rsp){
            alertsucc(alertsucc.a = rsp);
            auth();
        }
    });
}

function loadcloak() {
	if (window.FormData === undefined) {
		alert('В вашем браузере FormData не поддерживается')
	} else {
		var formData = new FormData();
		formData.append('file', $('#imgLoadercloak')[0].files[0]);
 
		$.ajax({
			type: "POST",
			url: '/?api=cloakupload',
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			dataType : 'json',
			success: function(rsp){
                alertsucc(alertsucc.a = rsp);
			}
		});
	}

}

function changeImya() {
    $.ajax({
        type: "POST",
        url: '/?api=changeimya',
        data: {val:$('#imya').val()},
        dataType : 'json',
        success: function(rsp){
            alertsucc(alertsucc.a = rsp);
        }
    });
}

function changeHappyday() {
    $.ajax({
        type: "POST",
        url: '/?api=changehappyday',
        data: {val:$('#happyday').val()},
        dataType : 'json',
        success: function(rsp){
            alertsucc(alertsucc.a = rsp);
        }
    });
}


function changegenders() {
    $.ajax({
        type: "POST",
        url: '/?api=changegender',
        data: {val:$('#gender').val()},
        dataType : 'json',
        success: function(rsp){
            alertsucc(alertsucc.a = rsp);
        }
    });
}
