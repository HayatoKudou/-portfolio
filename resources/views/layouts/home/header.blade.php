<!DOCTYPE html>
<html>
    <head>
        <title>駆け出しエンジニアの開発ブログ</title>
        <link rel="icon" href="{{ asset('img/favicon.ico') }}">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Scripts -->
        <!-- <script src="/js/jquery.min.js"></script> -->
        <script src="/js/app.js"></script>
        <script src="/js/app.js" defer></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

        <!--アイコン-->
        <script src="https://kit.fontawesome.com/4146f9dc55.js" crossorigin="anonymous"></script>


        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

        <!-- Styles -->
        <link href="/css/app.css" rel="stylesheet">
        <link href="/css/common.css" rel="stylesheet">
        <link href="/css/home/main.css" rel="stylesheet">
        <link href="/css/home/header.css" rel="stylesheet">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="{{ asset('/js/loading.js') }}"></script>

    </head>

    <header>
        <div class="container">
            <button id="title_button" class="title_button" type="button" name="button"><h1>Developer Blog</h1></button>
            <div class="footer_a">
                <nav id="Header-Nav" class="header-nav">
                    <div class="header_nav_title"><a href="#1" class="nav-list">お知らせ</a></div>
                    <div class="header_nav_title"><a href="#2" class="nav-list">Twitter投稿</a></div>
                    <div class="header_nav_title"><a href="{{ config('url.url' )}}portfolio" class="nav-list">portfolio</a></div>
                    <div class="header_nav_title">
                        <ul id="menu">
                        <li><a class="nav-list" href="#">tools</a>
                            <ul>
                            <li><a class="nav-list" href="tools/calculator">進数変換ツール</a></li>
                            <li><a class="nav-list" href="tools/anime">アニメ検索ツール</a></li>
                            <li><a class="nav-list" href="tools/programGenerate">プログラム生成ツール</a></li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div id="Hamburger" class="hamburger">
                <div></div>
                <div></div>
                <div></div>
                <p>MENU</p>
            </div>
        </div>
    </header>

    <div id="loader-bg">
        <div id="loader">
            <!-- <img src="img-loading.gif" width="80" height="80" alt="Now Loading..." /> -->
            <p>Now Loading...</p>
        </div>
    </div>
</html>

<script type="module">
$('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var top_height = target.offset().top;
    var header_height = $('header').height();
    var position = top_height - header_height;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
});

$('#title_button').on('click', function(){
    window.location.href = "/";
});
</script>
