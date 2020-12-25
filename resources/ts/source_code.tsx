export var PHP_API_Default: string = `
$url = "https://kudohayatoblog.com/api/api_endPoint";

//cURLセッションを初期化する
$ch = curl_init();

//URLとオプションを指定する
curl_setopt($ch, CURLOPT_URL, $url);//取得するURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//curl_exec()の返り値を文字列で返す。通常はデータを直接出力。

//URLの情報を取得し、ブラウザに渡す
$res =  curl_exec($ch);

//セッションを終了する
curl_close($conn);

`;

export var PHP_API_option_header: string = `
var url = "";
alert(url);
`;

export var Laravel_API_Default: string = `
use GuzzleHttp\Client;

$client = new Client;
$result = $client->request('GET', 'https://qiita.com/api/v2/authenticated_user/');
$response_body = (string) $result->getBody();
$decode_res = json_decode($response_body);

`;

export var LaravelApiHeader: string = `
use GuzzleHttp\Client;

$client = new Client;
$result = $client->request('GET', 'https://qiita.com/api/v2/authenticated_user/', [
    'headers' => [
        'Authorization' => 'Bearer '.$token,
        'Accept' => 'application/json',
    ],
]);
$response_body = (string) $result->getBody();
$decode_res = json_decode($response_body);

`;

export var JavaScript_API_Default: string = `
var xhr = new XMLHttpRequest();
var url = "https://kudohayatoblog.com/api/api_endPoint";
var result = '';

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        result = xhr.response;
        alert(result);
        return result;
    }
};

xhr.open("GET", url);
xhr.send();

`;

export var JavaScript_API_option_header: string = `
var xhr = new XMLHttpRequest();
var url = "https://kudohayatoblog.com/api/api_endPoint";
var result = '';

xhr.open("GET", url);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send();

xhr.addEventListener("load", function(){
    result = this.response;
}, false);

`;

export var JavaScript_STR_Default: string = `
var str = "javascript文字列";

`;

export var JavaScript_STR_substr: string = `
var str = "javascript文字列";
// 対象の文字列.substr( 開始位置, 切り出す文字数 );
var result = str.substr(0, 5);

`;

export var JavaScript_STR_substring: string = `
var str = "javascript文字列";
// 対象の文字列.substring( 開始位置, 終了位置 );;
var result = str.substring(0, 5);

`;

export var JavaScript_STR_slice: string = `
var str = "javascript文字列";
// 対象の文字列.slice( 開始位置, 終了位置 );;
var result = str.slice(0, 5);

`;

export var JavaScript_STR_split: string = `
var str = "javac, script, 文字列";
// 対象の文字列.split( 区切り文字 );;
var result = str.split(','); // 「,」 カンマ区切りで分割して配列に格納

`;

export var jQuery_API_Default: string = `
var url = "https://kudohayatoblog.com/api/api_endPoint";
$.ajax({
    type: "GET",
    url: url
  });

 `;

 export var jQuery_API_option_header: string = `
 var url = "https://kudohayatoblog.com/api/api_endPoint";
 $.ajax({
    type: "GET",
    url: url,
    headers: {
        "Content-Type", "application/json;charset=UTF-8",
      },
  });

 `;