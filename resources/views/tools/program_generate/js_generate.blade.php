@extends('layouts.tools.program_generate.js_generate')
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
                        <a itemprop="item" href="/js_generate">
                            <span itemprop="name">JS変換ツール</span>
                        </a>
                        <meta itemprop="position" content="3" />
                      </li>
                    </ol>

                    <h2 style="margin-top: 30px;">JS変換ツール</h2>
                    <div id="js_generate"></div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
