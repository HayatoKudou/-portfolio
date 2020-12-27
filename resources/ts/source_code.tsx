export var JavaScript_API_Default: string = `
var xhr = new XMLHttpRequest();
var url = "https://kudohayatoblog.com/api/api_endPoint";

xhr.open("GET", url);
xhr.send();

`;

export var JavaScript_API_option_header_content_type_flag: string = 
`xhr.send();
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
`;

export var JavaScript_API_option_header_onreadystatechange: string = 
`xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            alert(xhr.response);
        } else {
            alert(xhr.response);
        }
    }
};
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