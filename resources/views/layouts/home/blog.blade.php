<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="height:100%;">
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

</head>


<!-- <main class="py-4"> -->
<main class="py-4" id="main_content">
    @yield('blog_content')
</main>

<script>
var hamburger = document.getElementById('Hamburger');
hamburger.addEventListener('click', function () {
    var header_nav = document.getElementById('Header-Nav');
    header_nav.classList.toggle("active");
});
</script>
