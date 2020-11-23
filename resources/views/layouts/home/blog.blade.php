<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="height:100%;">

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
