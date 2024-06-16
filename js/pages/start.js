
function start() {
    history.pushState(null, null, '/start');
    pagefound = true;
    $("#content").html('\
    <div class="start">\
        <div class="startdiv">\
            <img class="startimg" src="/img/start/lis01.png" alt="">\
            <div class="startone">\
                <span>Создай себе аккаунт</span>\
                <center><div class="noselect munus-link startonelink" onclick="lk()">Создать...</div></center>\
            </div>\
        </div>\
        <div class="startdiv" style="margin-top: -30px">\
            <div class="starttwo">\
                <span>Скачай лаунчер</span>\
                <center class="startdownl noselect">\
                    <a href="/launcher/HellFox.exe" class="startdownlwin">\
                        <img src="/img/start/win.png" width="50px" alt="">\
                        <div>Windows</div>\
                    </a>\
                    <a href="/launcher/HellFox.jar" class="startdownllin">\
                        <img src="/img/start/apple.png" width="50px" alt="">\
                        <div>Mac/Linux</div>\
                    </a>\
                </center>\
            </div>\
            <img class="startimg" src="/img/start/lis02.png" alt="">\
        </div>\
        <div class="startdiv" style="margin-top: -30px">\
            <img class="startimg" src="/img/start/lis03.png" alt="">\
            <div class="startone">\
                <span class="noselect munus-link startonelink" onclick="rules()">Прочитай правила и...</span>\
                <center><span>Играй ;)</span></center>\
            </div>\
        </div>\
    </div>\
    ');
}

$("#start").click(start);

var isResizeble = false;

if ((!isResizeble) && (window.location.pathname == '/start')) {
    start();
    isRezeble = true;
}