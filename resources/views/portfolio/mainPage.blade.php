@extends('layouts.portfolio.portfolio')
@extends('layouts.portfolio.header')

@section('content')
<div class="main_container" id="main_container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">

                <div class="card-body" style="background-color: #eae8e8;">

                    @if(session()->has('message'))
                    <div class="alert alert-success">
                        <p>{{ session('message') }}</p>
                    </div>
                    @endif

                    @if ($errors->any())
                    <div class="alert alert-danger" style="text-align: center;">
                        @foreach ($errors->all() as $error)
                        <p>・{{ $error }}</p>
                        @endforeach
                    </div>
                    @endif

                    <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList" style="margin-top: 80px; background-color: #eae8e8;">
                      <li itemprop="itemListElement" itemscope
                          itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="/">
                            <span itemprop="name">Top</span>
                        </a>
                        <meta itemprop="position" content="1" />
                      </li>
                      <li itemprop="itemListElement" itemscope
                          itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="/portfolio">
                            <span itemprop="name">portfolio</span>
                        </a>
                        <meta itemprop="position" content="2" />
                      </li>
                    </ol>

                    <p style="text-align: center;">更新日：{{$update_date}}</p>

                    <div id="1" class="row">
                        <div class="profile_title">
                            <h1><i class="fas fa-user"></i>Profile</h1>
                        </div>
                    </div>

                    <div class="row self_info_container">
                        <div class="col-md-6 my_picture">
                            <img src="{{ asset('img/pic.jpeg') }}" alt="">
                        </div>
                        <div class="col-md-6 self_introduction">
                            <h4 class="title">自己紹介</h4>
                            <div class="sentence" style="font-size: 16px;">
                                <p>はじめまして。私は都内にある受託系企業でwebエンジニアをしています。
                                    <br>
                                    <br>メイン言語はPHPでLaravel・Reactを使用することが多いです。
                                    <br>担当箇所は、詳細設計・実装・テスト・保守で、
                                    <br>これまでwebサイト・HRTech・認証基盤などの開発に携わり、
                                    <br>少人数でのスクラッチ開発、アジャイル開発をしてきました。
                                    <br>
                                    <br>最近はSPAのサイトを作ってみたく、プライベートでReactなどのフロント言語を勉強中です。
                                </p>
                            </div>
                            <h4 class="title">経歴</h4>
                            <div class="sentence">
                                <p>2018.4.   新卒でSES系企業に入社、クラウドの監視業務を担当<br>2019.12.   受託系企業に入社、web開発業務を担当</p>
                            </div>
                        </div>
                    </div>

                    <div id="2" class="row" style="margin-top: 50px;">
                        <div class="profile_title">
                            <h1><i class="fas fa-laptop"></i>Skill</h1>
                        </div>
                    </div>

                    <div class="row" style="margin-bottom: 30px;">
                        <div class="col-md-5 frame_border">
                            <div class="skill_container">
                                <div class="skill_container_name">
                                    <h4><i class="fas fa-laptop-code"></i>言語</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>実務経験</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="margin-left: 30px;">PHP</span>
                                            <div class="cp_tooltip" style="float: right;">
                                                <i class="fas fa-info-circle"></i>
                                                <span class="cp_tooltiptext">メイン言語で、フレームワークで主に使用しています。<br>
                                                </span>
                                            </div>
                                        </td>
                                        <td>１年〜３年</td>
                                        <td>★★★☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="margin-left: 30px;">JavaScript</span>
                                            <div class="cp_tooltip" style="float: right;">
                                                <i class="fas fa-info-circle"></i>
                                                <span class="cp_tooltiptext">ブラウザの内部処理・非同期通信などで使用することが多いです。<br>
                                                最近はReactやNode.jsなどサーバーサイドで使用する機会が増えてきました。</span>
                                            </div>
                                        </td>
                                        <td>１年〜３年</td>
                                        <td>★★★☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>HTML</td>
                                        <td>１年〜３年</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>CSS</td>
                                        <td>１年〜３年</td>
                                        <td>★☆☆☆☆</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div class="col-md-5 frame_border">
                            <div class="skill_container">
                                <div class="skill_container_name">
                                    <h4><i class="fas fa-laptop-code"></i>フレームワーク</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>実務経験</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                         <td>
                                            <span>Laravel</span>
                                        </td>
                                        <td>１年〜３年</td>
                                        <td>★★★★☆</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="margin-left: 30px;">React</span>
                                            <div class="cp_tooltip" style="float: right;">
                                                <i class="fas fa-info-circle"></i>
                                                <span class="cp_tooltiptext">Reduxと併せてFluxで実装することが多いです。<br>
                                                最近になってHooksの便利さに気付き、色々と触っています。</span>
                                            </div>
                                        </td>
                                        <td>１年〜３年</td>
                                        <td>★★★☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>Redux</td>
                                        <td>１年〜３年</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>jQuery</td>
                                        <td>１年未満</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>FuelPHP</td>
                                        <td>１年未満</td>
                                        <td>★☆☆☆☆</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="row" style="margin-bottom: 30px;">
                        <div class="col-md-5 frame_border">
                            <div class="skill_container">
                                <div class="skill_container_name">
                                    <h4><i class="fas fa-database"></i>DB</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>実務経験</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>MySql</td>
                                        <td>１年〜３年</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                </table>
                            </div>
                        </div>


                        <div class="col-md-5 frame_border">
                            <div class="skill_container">
                                <div class="skill_container_name">
                                    <h4><i class="fas fa-server"></i>その他ツール</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>実務経験</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Git/GitHub</td>
                                        <td>１年〜３年</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>BackLog</td>
                                        <td>１年〜３年</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>Apache</td>
                                        <td>１年〜３年</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>AWS(EC2)</td>
                                        <td>１年〜３年</td>
                                        <td>★☆☆☆☆</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div id="3" class="row" style="margin-top: 50px;">
                        <div class="profile_title" style="text-align: center;">
                            <h3><i class="fas fa-envelope"></i>お問い合わせ・SNS</h3>
                            <p>ご意見、ご感想などお気軽にご連絡ください。</p>
                        </div>
                    </div>

                    <div class="row">
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
                        <ul class="follow-me sns_icon">
                          <li style="margin-right: 10px;"><a href="https://twitter.com/React_Laravel_"></a></li>
                          <li style="margin-left: 10px; margin-right: 0px;"><a href="https://www.github.com/HayatoKudou"></a></li>
                        </ul>
                    </div>

                    <div class="row">
                        <div class="profile_title" style="text-align: center;">
                            <form action="{{route('send_mail')}}" method="post" id="send_mail">
                                @csrf
                                <div id="contact_form"></div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection

<script>
window.onload = function(){
    $('#tooltip1').hover(
    function () {
        $('.description1').fadeIn('fast');
    },
    function () {
        $('.description1').fadeOut('fast');
    });
}
</script>
