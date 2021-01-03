export var JavaScript_API_Default: string = 
`var xhr = new XMLHttpRequest();
var url = "https://kudohayatoblog.com/api/api_endPoint";

xhr.open("GET", url);
xhr.send();

`;

export var JavaScript_API_option_header_content_type_flag: string = 
`xhr.send();
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");`;

export var JavaScript_API_option_header_onreadystatechange: string = 
`xhr.onreadystatechange = function () {
    if(xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
            alert(xhr);
        }
    }
};
`;

export var JavaScript_API_option_header_readyState: string = `
            alert(xhr.readyState);`;

export var JavaScript_API_option_header_response: string = `
            alert(xhr.response);`;

export var JavaScript_STR_Default: string = 
`var str = "javascript文字列";`;

export var JavaScript_STR_substr: string = 
`var str = "javascript文字列";
var result = str.substr(0, 5);`;

export var JavaScript_STR_substring: string = 
`var str = "javascript文字列";
var result = str.substring(0, 5);`;

export var JavaScript_STR_slice: string = 
`var str = "javascript文字列";
var result = str.slice(0, 5);`;

export var JavaScript_STR_split: string = 
`var str = "javac, script, 文字列";
var result = str.split(',');`;

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