
function donate() {
    history.pushState(null, null, '/donate');
    pagefound = true;
    $("#content").html('\
        <table class="donate">\
            <thead>\
                <th>Возможности</th>\
                <th>Игрок</th>\
                <th>Вип</th>\
                <th>Премиум</th>\
                <th>Гранд</th>\
                <th>Элита</th>\
                <th>Делюкс</th>\
                <th>Легенда</th>\
            </thead>\
            <tbody>\
                <tr>\
                    <td>Цена за 1 мес.</td>\
                    <td>Бесп.</td>\
                    <td>99₽</td>\
                    <td>175₽</td>\
                    <td>260₽</td>\
                    <td>400₽</td>\
                    <td>650₽</td>\
                    <td>850₽</td>\
                </tr>\
                <tr>\
                    <td>Кол-тво приватов</td>\
                    <td>2</td>\
                    <td>3</td>\
                    <td>4</td>\
                    <td>5</td>\
                    <td>6</td>\
                    <td>7</td>\
                    <td>8</td>\
                </tr>\
                <tr>\
                    <td>Кит Start</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Кит Bonus</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Кит Vip</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Кит Premium</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Кит Grand</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Кит Elite</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Кит Deluxe</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Кит Legend</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда fly</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда feed</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда repair</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда god</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда ender</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда near</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда heal</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда dback</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда tppos</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда exp</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                </tr>\
                <tr>\
                    <td>Команда top</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>-</td>\
                    <td>+</td>\
                </tr>\
            </tbody>\
        </table>\
    ');
}

$("#donate").click(donate);

var isResizeble = false;

if ((!isResizeble) && (window.location.pathname == '/donate')) {
    donate();
    isRezeble = true;
}