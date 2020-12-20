export var PHP_API_Default: string = `
$url = "https://kudohayatoblog.com/api/get_api_endPoint";

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
var url = "https://kudohayatoblog.com/api/get_api_endPoint";

xhr.open("GET", url);
xhr.send();

xhr.addEventListener("load", function(){
    alert(this.response);
    console.log(this);
}, false);

`;

export var JavaScript_API_option_header: string = `
var xhr = new XMLHttpRequest();
var url = "https://kudohayatoblog.com/api/get_api_endPoint";

xhr.open("GET", url);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send();

xhr.addEventListener("load", function(){
    alert(this.response);
    console.log(this);
}, false);

`;

export var jQuery_API_Default: string = `
var url = "https://kudohayatoblog.com/api/get_api_endPoint";
$.ajax({
    type: "GET",
    url: url
  });

 `;

 export var jQuery_API_option_header: string = `
 var url = "https://kudohayatoblog.com/api/get_api_endPoint";
 $.ajax({
    type: "GET",
    url: url,
    headers: {
        "Content-Type", "application/json;charset=UTF-8",
      },
  });

 `;