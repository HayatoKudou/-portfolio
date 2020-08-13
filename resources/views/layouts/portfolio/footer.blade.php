<!DOCTYPE html>
<html>
<body>
    <footer>
        <div class="footer_container">
            <nav id="Footer-Nav" class="footer-nav">
                <div class="footer_a">
                    <a href="#1" class="footer-list">Profile</a>
                    <a href="#2" class="footer-list">Skill</a>
                    <a href="#3" class="footer-list">Contact</a>
                    <a href="http://kudohayatoblog.com/blog_top" class="footer-list">Blog</a>
                    <div class="footer_font">
                        <p style="margin: 20px 0 0 0;">name: Hayato Kudou</p>
                        <p>email: kudoh115@gmail.com</p>
                    </div>
                </div>
            </nav>
        </div>
    </footer>
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
