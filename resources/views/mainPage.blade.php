@extends('layouts.app')
@extends('layouts.header')

@section('content')
<div class="main_container" id="main_container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">

                <div class="card-body">
                    <div class="row">
                        <div class="profile_icon">
                            <h1>Profile</h1>
                        </div>
                    </div>

                    <div class="row self_info_container">
                        <div class="col-md-6 my_picture">
                            <img src="{{ asset('img/pic.jpeg') }}" alt="">
                        </div>
                        <div class="col-md-6 self_introduction">
                            <h4 class="title">自己紹介</h4>
                            <div class="sentence">
                                <p>はじめまして。私は工藤 颯斗と申します。<br>都内にある受託系の会社でWebエンジニアとして働いています。メイン言語はPHPです。</p>
                            </div>
                            <h4 class="title">経歴</h4>
                            <div class="sentence">
                                <p>→工業高校卒業<br>→新卒でSES系企業に入社、クラウドの監視業務を担当<br>→受託系企業に入社、web開発業務を担当</p>
                            </div>
                        </div>
                    </div>

                    <div class="row" style="margin-top: 50px;">
                        <div class="profile_icon">
                            <h1>Skill</h1>
                        </div>
                    </div>

                    <div class="row" style="margin-bottom: 30px;">
                        <div class="col-md-5 frame_border">
                            <div class="skill_container">
                                <div class="skill_container_name">
                                    <h4>言語</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>実務経験</td>
                                        <td>熟練度</td>
                                    </tr>
                                    <tr>
                                        <td>PHP</td>
                                        <td>１年</td>
                                        <td>★★★☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>javascript</td>
                                        <td>１年未満</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>jQuery</td>
                                        <td>１年未満</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>React</td>
                                        <td>１年未満</td>
                                        <td>★☆☆☆☆</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div class="col-md-5 frame_border">
                            <div class="skill_container">
                                <div class="skill_container_name">
                                    <h4>フレームワーク</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>経験年数</td>
                                        <td>熟練度</td>
                                    </tr>
                                    <tr>
                                        <td>Laravel</td>
                                        <td>１年未満</td>
                                        <td>★★★★☆</td>
                                    </tr>
                                    <tr>
                                        <td>Redux</td>
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
                                    <h4>DB</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>経験年数</td>
                                        <td>熟練度</td>
                                    </tr>
                                    <tr>
                                        <td>MySql</td>
                                        <td>１年</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                </table>
                            </div>
                        </div>


                        <div class="col-md-5 frame_border">
                            <div class="skill_container">
                                <div class="skill_container_name">
                                    <h4>その他ツール</h4>
                                </div>
                                <table class="skill_table">
                                    <tr>
                                        <td>技術</td>
                                        <td>経験年数</td>
                                        <td>熟練度</td>
                                    </tr>
                                    <tr>
                                        <td>Git/GitHub</td>
                                        <td>１年未満</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>BackLog</td>
                                        <td>１年未満</td>
                                        <td>★★☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>Docker</td>
                                        <td>１年未満</td>
                                        <td>★☆☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>AWS(EC2)</td>
                                        <td>１年未満</td>
                                        <td>★☆☆☆☆</td>
                                    </tr>
                                    <tr>
                                        <td>Apache</td>
                                        <td>１年未満</td>
                                        <td>★☆☆☆☆</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</div>
@endsection
