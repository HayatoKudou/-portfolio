@extends('layouts.blog.blog')
@extends('layouts.blog.header')

@section('blog_content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">

                @if ($errors->any())
                <div class="alert alert-danger" style="text-align: center;">
                    @foreach ($errors->all() as $error)
                    <p>・{{ $error }}</p>
                    @endforeach
                </div>
                @endif

                <form class="" action="{{route('notice_post')}}" method="post">
                    @csrf
                    <div class="post_form">
                        <p>投稿日</p>
                        <input type="date" name="notice_date" value="{{$today}}">
                        <p>投稿内容</p>
                        <textarea name="notice_content" rows="7" cols="70"></textarea>
                        <input class="notice_post" type="submit" name="notice_submit" value="投稿する">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
