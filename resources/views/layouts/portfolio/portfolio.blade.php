<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="height:100%;">

<!-- <main class="py-4"> -->
<main class="py-4" id="main_content" style="padding-top: 0px !important; padding-bottom: 0px !important;">
    @yield('content')
</main>
@extends('layouts.portfolio.footer')
</html>

<script>
var hamburger = document.getElementById('Hamburger');
hamburger.addEventListener('click', function () {
    var header_nav = document.getElementById('Header-Nav');
    header_nav.classList.toggle("active");
});
</script>
