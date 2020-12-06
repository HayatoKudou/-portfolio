import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export var XMLHttpRequest: string = `
var xhr = new XMLHttpRequest();

xhr.open(【どんな方法で？】, 【どのサーバーに？】);
xhr.send();

xhr.onreadystatechange = function() {

    if(【いつデータを取得するか？】) {

        //データを取得した後の処理を書く
    }
}`;

// export const XMLHttpRequest: React.FC = () => {
//     return(
//         <div>
//         <pre className="prettyprint linenums lang-js">
//             <code>
//                 export var XMLHttpRequest: string = `
//                 var xhr = new XMLHttpRequest();

//                 xhr.open(【どんな方法で？】, 【どのサーバーに？】);
//                 xhr.send();
//             </code>
//         </pre>
//     </div>
//     );
// }

export var jQueryAjax: string = `
var xmlDocument = [create xml document];
 $.ajax({
   url: "page.php",
   processData: false,
   data: xmlDocument,
   success: handleResponse
 });`;