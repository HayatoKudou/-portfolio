<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="height:100%;">
<head>
    <meta charset="utf-8">
    <title>正規表現ツール</title>
    <link rel="icon" href="{{ asset('img/javascript.svg') }}" type="image/svg+xml">
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

    <!-- 引用符 -->
    <!-- <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"> -->

    <!-- Styles -->
    <link href="/css/app.css" rel="stylesheet">
    <link href="/css/common.css" rel="stylesheet">
    <link href="/css/tools/tools.css" rel="stylesheet">
    <link href="/css/tools/header.css" rel="stylesheet">
    <link href="/css/tools/regularExpression.css" rel="stylesheet">

</head>


<!-- <main class="py-4"> -->
<main class="py-4" id="main_content" style="padding: 70px 0 0 0!important;">
    @yield('content')
</main>
