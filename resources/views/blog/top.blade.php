@extends('layouts.blog.blog')
@extends('layouts.blog.header')

@section('blog_content')
<div class="row">
    <div class="col-md-9">
        <div class="blog_container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="info_title">
                                    <h2>お知らせ・更新</h2>
                                </div>
                            </div>

                            @foreach ($result as $tweet)
                            <div class="row">
                                <div class="info">
                                    <p>{{ $tweet->created_at }}:<br>{{ $tweet->text }}</p>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3" style="padding-left: 0px;">
        <div class="card" style="width: 95%;">
            <div class="card-body">
                <div class="side_bar">
                    <blockquote class="twitter-tweet" style="width: 90%;">
                        <a href="https://twitter.com/React_Laravel_/status/1292746858586988545"></a>
                    </blockquote>
                    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection
