<!DOCTYPE html>
<html>
<body>
    <header>
        <div class="container">
            <button id="title_button" class="title_button" type="button" name="button"><h1>Hayato Kudou Blog</h1></button>
            <div class="footer_a">
                <nav id="Header-Nav" class="header-nav">
                    <a href="http://kudohayatoblog.com/" class="nav-list">portfolio</a>
                    <a href="http://kudohayatoblog.com/admin/notice_post" class="nav-list">Post</a>
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
    $('#title_button').on('click', function(){
        window.location.href = "admin/";
    });
</script>
