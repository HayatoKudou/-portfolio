<!DOCTYPE html>
<html>

<head>
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
    <link href="/css/tools/tools.css" rel="stylesheet">
    <link href="/css/tools/header.css" rel="stylesheet">
    <link href="/css/home/header.css" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="{{ asset('/js/loading.js') }}"></script>

</head>

<body>
    <header>
        <div class="container">
            <button id="title_button" class="title_button" type="button" name="button"><h1>Developer Blog</h1></button>
            <div class="footer_a">
                <nav id="Header-Nav" class="header-nav">
                    <div class="header_nav_title"><a href="{{ config('url.url' )}}" class="nav-list">Blog</a></div>   
                    <div class="header_nav_title">
                        <ul id="menu">
                            <li><a class="nav-list" href="#">tools</a>
                            <ul>
                                <li><a class="nav-list" href="/tools/regularExpression">正規表現生成ツール</a></li>
                                <li><a class="nav-list" href="/tools/programGenerate">プログラム生成ツール</a></li>                                
                                <li><a class="nav-list" href="/tools/calculator">進数変換ツール</a></li>
                                <li><a class="nav-list" href="/tools/anime">アニメ検索ツール</a></li>
                            </ul>
                            </li>
                        </ul>
                    </div>                 
                </nav>
            </div>
            <!-- <div id="Hamburger" class="hamburger">
                <div></div>
                <div></div>
                <div></div>
                <p>MENU</p>
            </div> -->
        </div>
    </header>
    <div id="loader-bg">
        <div id="loader">
            <!-- <img src="img-loading.gif" width="80" height="80" alt="Now Loading..." /> -->
            <p>Now Loading...</p>
        </div>
    </div>
</body>
</html>
