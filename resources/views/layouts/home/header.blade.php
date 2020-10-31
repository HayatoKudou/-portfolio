<!DOCTYPE html>
<html>
<body>
    <header>
        <div class="container">
            <button id="title_button" class="title_button" type="button" name="button"><h1>Developer Blog</h1></button>
            <div class="footer_a">
                <nav id="Header-Nav" class="header-nav">
                    <a href="#1" class="nav-list">お知らせ</a>
                    <a href="#2" class="nav-list twitter">Twitter投稿</a>
                    <a href="http://kudohayatoblog.com/portfolio" class="nav-list">portfolio</a>
                    <ul id="menu">
                      <li><a class="nav-list" href="#">tools</a>
                        <ul>
                          <li><a class="nav-list" href="tools/calculator">進数変換ツール</a></li>
                          <li><a class="nav-list" href="tools/anime">アニメ検索ツール</a></li>
                        </ul>
                      </li>
                    </ul>
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
</body>
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
