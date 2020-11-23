@extends('layouts.tools.calculator.calculator')
@extends('layouts.tools.header')

@section('content')
<div class="main_container" id="main_container">

    <div class="row">
        <div class="col-md-9">
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
                        <a itemprop="item" href="/calculator" style="pointer-events: none;">
                            <span itemprop="name">tools</span>
                        </a>
                        <meta itemprop="position" content="2" />
                      </li>
                      <li itemprop="itemListElement" itemscope
                          itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="/calculator">
                            <span itemprop="name">進数変換器</span>
                        </a>
                        <meta itemprop="position" content="3" />
                      </li>
                    </ol>

                    <h2 style="margin-top: 30px;">進数変換ツール</h2>
                    <div id="calculator"></div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

