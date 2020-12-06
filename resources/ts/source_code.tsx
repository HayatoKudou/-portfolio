export var PHPcurlDefault: string = `
$url = "https://www.aaa.com/";

//cURLセッションを初期化する
$ch = curl_init();

//URLとオプションを指定する
curl_setopt($ch, CURLOPT_URL, $url);//取得するURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//curl_exec()の返り値を文字列で返す。通常はデータを直接出力。

//URLの情報を取得し、ブラウザに渡す
$res =  curl_exec($ch);

//結果を表示する
var_dump($res);

//セッションを終了する
curl_close($conn);

`;

export var LaravelApiDefault: string = `
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

export var XMLHttpRequestDefault: string = `
var xhr = new XMLHttpRequest();

xhr.open(【どんな方法で？】, 【どのサーバーに？】);
xhr.send();

xhr.onreadystatechange = function() {

    if(【いつデータを取得するか？】) {

        //データを取得した後の処理を書く
    }
}

`;

export var jQueryAjaxDefault: string = `
var xmlDocument = [create xml document];
 $.ajax({
   url: "page.php",
   processData: false,
   data: xmlDocument,
   success: handleResponse
 });

 `;