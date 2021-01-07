@extends('layouts.tools.program_generate.programGenerate')
@extends('layouts.tools.header')

@section('content')
<div class="main_container" id="main_container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">

                <div class="card-body" style="min-height: 100vh;">
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
                        <a itemprop="item" href="/programGenerate">
                            <span itemprop="name">プログラム生成ツール</span>
                        </a>
                        <meta itemprop="position" content="3" />
                      </li>
                    </ol>
                    <div id="programGenerate"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

<!-- <script>
window.addEventListener('DOMContentLoaded', function(){
    console.log('test1')
    window.addEventListener('scroll', function(){
        console.log('test2')
        const elm = document.getElementById('program_code_form_sub');
        if(elm !== null){
            elm.classList.add('program_code_form_sub');
        }
    });
});
</script> -->