# Gravit Launcher egg
Кастомное яйцо для Gravit лаунчера. Использует официальный openjdk 21 и [OpenJFX](https://openjfx.io/) jmods для JavaFX

Лаунчер скачивается с официальных репозиториев без билда на сервере

## FAQ
## 403 Permission denied nginx
Могут быть проблемы с nginx если путь до `/updates` папки создан контейнером.

Если ваша папка с апдейтами лежит по пути `/var/lib/pterodactyl/volumes/<id>/updates` нужно выставить права из документации Гравита (`chmod+x` и `chown`) на родительские директории.

То есть на папки `/var/lib/`, `/var/lib/pterodactyl`, `/var/lib/pterodactyl/volumes`

Для безопасности права на них лучше выдавать без `-R` флага, иначе у nginx будет доступ ко всем серверам на ноде.
Так же важно добавить пользователя `pterodactyl` в группу `www-data` (или другую, из под которой работает nginx)
