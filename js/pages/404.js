setTimeout(
    () => {
        function notfound() {
            history.pushState(null, null, '/notfound');
            pagefound = true;
            $("#content").html('Ошибка 404 Страница не найдена!');
        }
        
        var isResizeble = false;
        
        if (pagefound == false) {
            notfound();
            isRezeble = true;
        }
    },
    1 * 1000
);