
function auth() {
    history.pushState(null, null, '/auth');
    pagefound = true;

    $("#content").html('\
        <div class="up-btns flex grid grid-cols-2">\
            <div class="up-btn auth-btn-up active-up-btn">Вход</div>\
            <div class="up-btn register-btn-up">Регистрация</div>\
        </div>\
        <div class="limiter"></div>\
    ');

    var auth = '\
    <div class="container-login100">\
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">\
            <form class="login100-form validate-form flex-sb flex-w" id="loginform" method="POST">\
                <span class="txt1 p-b-11">\
                    Никнейм или E-mail\
                </span>\
                <div class="wrap-input100 validate-input m-b-36" data-validate="Username is required">\
                    <input class="input100" type="text" name="username">\
                    <span class="focus-input100"></span>\
                </div>\
                <span class="txt1 p-b-11">\
                    Пароль\
                </span>\
                <div class="wrap-input100 validate-input m-b-12" data-validate="Password is required">\
                    <span class="btn-show-pass">\
                        <i class="fa fa-eye"></i>\
                    </span>\
                    <input class="input100" type="password" name="pass">\
                    <span class="focus-input100"></span>\
                </div>\
                <div class="container-login100-form-btn">\
                    <div id="auth" class="login100-form-btn" style="cursor: pointer">\
                        Вход\
                    </div>\
                    <div class="login100-form-btn register-btn" id="zabpass" style="cursor: pointer">\
                        Забыл пароль?\
                    </div>\
                </div>\
            </form>\
        </div>\
    </div>\
    ';

    var vost = '\
    <div class="container-login100">\
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">\
            <form class="login100-form validate-form flex-sb flex-w" id="vostform" method="POST">\
                <span class="txt1 p-b-11">\
                    Никнейм или E-mail\
                </span>\
                <div class="wrap-input100 validate-input m-b-36" data-validate="Username is required">\
                    <input class="input100" type="text" name="username">\
                    <span class="focus-input100"></span>\
                </div>\
                <div class="container-login100-form-btn">\
                    <div id="vost" class="login100-form-btn" style="cursor: pointer">\
                        Восстановить\
                    </div>\
                </div>\
            </form>\
        </div>\
    </div>\
    ';

    var register = '\
    <div class="container-login100">\
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">\
            <form class="login100-form validate-form flex-sb flex-w" id="registerform" method="POST">\
                <span class="txt1 p-b-11">\
                    Почта\
                </span>\
                <div class="wrap-input100 validate-input m-b-36" data-validate="Email is required">\
                    <input class="input100" type="text" name="e-mail">\
                    <span class="focus-input100"></span>\
                </div>\
                <span class="txt1 p-b-11">\
                    Никнейм\
                </span>\
                <div class="wrap-input100 validate-input m-b-36" data-validate="Username is required">\
                    <input class="input100" type="text" name="username">\
                    <span class="focus-input100"></span>\
                </div>\
                <span class="txt1 p-b-11">\
                    Пароль\
                </span>\
                <div class="wrap-input100 validate-input m-b-12" data-validate="Password is required">\
                    <span class="btn-show-pass">\
                        <i class="fa fa-eye"></i>\
                    </span>\
                    <input class="input100" type="password" name="pass">\
                    <span class="focus-input100"></span>\
                </div>\
                <div id="register" class="container-login100-form-btn">\
                    <div class="login100-form-btn" style="cursor: pointer">\
                        Регистрация\
                    </div>\
                </div>\
            </form>\
        </div>\
    </div>\
';

    $(".limiter").html(auth);


    $.ajax({
        type: "POST",
        url: '/?api=authcheck',
        success: function (rsp) {
            var rsp = $.parseJSON(rsp);
            if (rsp.type == 'arr') {
                lk();
            }
        }
    });

    $('[id=auth]').click(function() {
        var val = [
            $("#loginform [name=username]").val(),
            $("#loginform [name=pass]").val(),
            ];

        $.ajax({
            type: "POST",
            data: {val:val},
            url: '/?api=auth',
            success: function (rsp) {
                var rsp = $.parseJSON(rsp);
                if (rsp.type == 'arr') {
                    lk();
                } else if (rsp.type == 'err') {
                    alertsucc(alertsucc.a = rsp);
                } else {
                    console.log(rsp);
                }
            }
        });
    });


    $('[id=zabpass]').click(function() {
        $('.register-btn-up').removeClass('active-up-btn');
        $('.auth-btn-up').removeClass('active-up-btn');
        $(".limiter").html(vost);
    });

    $('.auth-btn-up').click(function() {
        $('.register-btn-up').removeClass('active-up-btn');
        $(this).addClass('active-up-btn');
        $(".limiter").html(auth);
        $('[id=zabpass]').click(function() {
            $('.register-btn-up').removeClass('active-up-btn');
            $('.auth-btn-up').removeClass('active-up-btn');
            $(".limiter").html(vost);
        });
        $('[id=auth]').click(function() {
            var val = [
                $("#loginform [name=username]").val(),
                $("#loginform [name=pass]").val(),
                ];

            $.ajax({
                type: "POST",
                data: {val:val},
                url: '/?api=auth',
                success: function (rsp) {
                    var rsp = $.parseJSON(rsp);
                    if (rsp.type == 'arr') {
                        lk();
                    } else if (rsp.type == 'err') {
                        alertsucc(alertsucc.a = rsp);
                    } else {
                        console.log(rsp);
                    }
                }
            });
        });
    });
    $('.register-btn-up').click(function() {
        $('.auth-btn-up').removeClass('active-up-btn');
        $(this).addClass('active-up-btn');	
        $(".limiter").html(register);
        $('[id=register]').click(function() {
            $("[id=register]").css("display", "none");
            var val = [
                $("#registerform [name=e-mail]").val(),
                $("#registerform [name=username]").val(),
                $("#registerform [name=pass]").val(),
                ];

            $.ajax({
                type: "POST",
                data: {val:val},
                url: '/?api=register',
                success: function (rsp) {
                    $("[id=register]").css("display", "block");
                    var rsp = $.parseJSON(rsp);
                    if (rsp.type == 'arr') {
                        lk();
                    } else if (rsp.type == 'err') {
                        alertsucc(alertsucc.a = rsp);
                    } else {
                        console.log(rsp);
                    }
                }
            });
        });
    });
}

var isResizeble = false;

if ((!isResizeble) && (window.location.pathname == '/auth')) {
    auth();
    isRezeble = true;
}
