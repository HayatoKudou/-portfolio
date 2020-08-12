<!DOCTYPE html>
<html>
<body>
    <header>
        <div class="container">
            <h1>Hayato Kudou portfolio</h1>
            <div class="footer_a">
                <nav id="Header-Nav" class="header-nav">
                    <a href="#1" class="nav-list">Profile</a>
                    <a href="#2" class="nav-list">Skill</a>
                    <a href="#3" class="nav-list">Contact</a>
                    <a href="http://kudohayatoblog.com/blog_top" class="nav-list">Blog</a>
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
</script>
