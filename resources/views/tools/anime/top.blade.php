
<div id="wrap">
    @extends('layouts.tools.anime.anime')
    @extends('layouts.tools.header')

    @section('content')
    <div class="main_container" id="main_container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">

                    <div class="card-body">
                        <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
                        <li itemprop="itemListElement" itemscope
                            itemtype="https://schema.org/ListItem">
                            <a itemprop="item" href="/">
                                <span itemprop="name">Top</span>
                            </a>
                            <meta itemprop="position" content="1" />
                        </li>
                        <li itemprop="itemListElement" itemscope
                            itemtype="https://schema.org/ListItem">
                            <a itemprop="item" href="#" style="pointer-events: none;">
                                <span itemprop="name">tools</span>
                            </a>
                            <meta itemprop="position" content="2" />
                        </li>
                        <li itemprop="itemListElement" itemscope
                            itemtype="https://schema.org/ListItem">
                            <a itemprop="item" href="/tools/anime">
                                <span itemprop="name">アニメ情報取得</span>
                            </a>
                            <meta itemprop="position" content="3" />
                        </li>
                        </ol>

                        <h2 style="margin-top: 30px;">アニメ情報検索</h2>
                        <div id="anime"></div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection
</div>

<div id="loader-bg">
  <div id="loader">
    <!-- <img src="img-loading.gif" width="80" height="80" alt="Now Loading..." /> -->
    <p>Now Loading...</p>
  </div>
</div>