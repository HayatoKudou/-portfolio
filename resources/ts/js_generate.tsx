
import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import * as source_code from './source_code';
import {Radio} from './components/radioComponent';
import {CheckBox} from './components/checkboxComponent';
import {Tooltip} from './components/tooltipComponent';
import {Table} from './components/tableComponent';
import {Code} from './components/codeComponent';
import {Result} from './components/resultComponent';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Main: React.FC = () => {

    const [code, setCode] = useState(''); //基本ソースコード
    const [language, setLanguage] = useState('JavaScript');
    const [method, setMethod] = useState('Ajax');

    //Ajaxオプション
    const [option_method, setOptionMethod] = useState('GET');
    const [options, setOptions] = useState('*result_space*');
    const [header_count, setHeaderCount] = useState(0);  //ヘッダー数
    const [property_count, setPropertyCount] = useState(0);  //プロパティ数
    const [method_count, setMethodCount] = useState(0);  //メソッド数

    const [option_ajax_url, setOptionApiUrl] = useState('https://kudohayatoblog.com/api/exmple');
    const [option_header_content_type_flag, setOptionContentTypeFlag] = useState(0);
    const [option_header_content_type, setOptionContentType] = useState('Content-Type", "application/json;charset=UTF-8');
    const [option_property_onreadystatechange, setOptionOnreadystatechangeFlag] = useState(1);
    const [option_property_readyState, setOptionReadyState] = useState(0);
    const [option_property_response, setOptionResponse] = useState(1);
    const [option_property_responseText, setOptionResponseText] = useState(0);
    const [option_property_status, setOptionStatus] = useState(0);
    const [option_property_statusText, setOptionStatusText] = useState(0);
    const [option_property_onerror, setOptionOnerror] = useState(0);
    const [option_property_onloadend, setOptionOnloadend] = useState(0);
    const [option_method_abort, setOptionAbort] = useState(0);
    const [option_method_open, setOptionOpen] = useState(1);
    const [option_method_send, setOptionSend] = useState(1);
    const [option_method_getAllResponseHeaders, setOptionGetAllResponseHeaders] = useState(0);

    //文字列操作オプション
    const [option_str_text, setOptionStrText] = useState('javascript文字列');
    const [option_str, setOptionStr] = useState('');

    //非同期処理で使うstateで管理できない者たち
    var CodeName = 'JavaScript_Ajax_Default'; //呼び出すモジュール名
    var defaultCode = '';

    window.onload = function() {
        setPropertyCount(2);
        setMethodCount(2);
        getDefaultCode('JavaScript', 'Ajax', 'option_property_onreadystatechange');
    };

    //基本コード
    function getDefaultCode(language_arg: string, method_arg: string = '', option_arg: string = 'Default'){
        setLanguage(language_arg);
        setMethod(method_arg);
        CodeName = language_arg + '_' + method_arg + '_' + option_arg;
        defaultCode = language_arg + '_' + method_arg + '_' + 'Default';

        if(method_arg == 'Ajax'){
            if(option_arg === 'reset'){
                setOptionMethod('GET');
                setOptionApiUrl('https://kudohayatoblog.com/api/exmple');
                setOptionContentType('Content-Type", "application/json;charset=UTF-8');
                if(language_arg === 'JavaScript'){
                    setOptions('*result_space*');
                    setOptionContentTypeFlag(0);                    
                    setOptionOnreadystatechangeFlag(1);
                    setOptionReadyState(0);
                    setOptionResponse(1);
                    setOptionResponseText(0);
                    setOptionStatus(0);
                    setOptionStatusText(0);
                    setOptionOnerror(0);
                    setOptionOnloadend(0);
                    setOptionAbort(0);
                    setOptionOpen(1);
                    setOptionSend(1);
                    setOptionGetAllResponseHeaders(0);
                    setHeaderCount(0);
                    setPropertyCount(2);
                    setMethodCount(2);
                    setCode(source_code[defaultCode].replace(option_method, 'GET') + source_code['JavaScript_Ajax_option_property_onreadystatechange']);
                } else if(language_arg === 'PHP'){
                    setPropertyCount(0);
                    setMethodCount(0);
                    setCode(source_code[defaultCode]);
                }
            } else if(option_arg === 'option_property_onreadystatechange'){
                setCode(source_code[defaultCode].replace('GET', option_method) + source_code[CodeName]);
            } else {
                setCode(source_code[CodeName].replace('GET', option_method));
            }
        } else {
            setCode(source_code[CodeName]);
        }
    }

    //オプション付き
    function getOptionCode(option: any){
        option.persist(); //非同期
        var option_name: string = option.target.name;
        var option_val: any = option.target.value;
        var CodeName = language + '_' + method + '_' + option_name;
        var content_type_code =
`xhr.setRequestHeader("${option_header_content_type}");
xhr.send();`;
        console.log(language + ': ' + method + ': ' + option_name + ': ' + option_val);

        function operation(type: string){
            if(type === 'property'){
                if(option_val == 0){
                    setOptions(options + source_code[CodeName]);
                    setCode(code.replace(options, options + source_code[CodeName]));
                    setPropertyCount(property_count+1);
                } else {
                    setOptions(options.replace(source_code[CodeName], ''));
                    setCode(code.replace(source_code[CodeName], ''));
                    setPropertyCount(property_count-1);
                }
            } else if(type === 'method'){
                if(option_val == 0){
                    setMethodCount(method_count+1);
                } else {
                    setMethodCount(method_count-1);
                }
            }
        }

        /*Ajaxオプション*/
        if(method === 'Ajax'){
            //get・post設定
            if(option_name ==='option_method'){
                setOptionMethod(option_val);
                setCode(code.replace(option_method, option_val)); //コード変換
            //URL設定
            } else if(option_name === 'option_ajax_url'){
                if ( option_ajax_url.length == 0 ) {
                    setCode(code.replace('url = "', 'url = "' + option_val));
                    setOptionApiUrl(option_val);
                } else {
                    setCode(code.replace('url = "' + option_ajax_url, 'url = "' + option_val));
                    setOptionApiUrl(option_val);
                }
            //Content-Type表示設定
            } else if(option_name === 'option_header_content_type_flag'){
                if(option_val == 0){
                    setCode(code.replace('xhr.send();', content_type_code));
                    setOptionContentTypeFlag(1);
                    setHeaderCount(header_count+1);
                } else {
                    setCode(code.replace(content_type_code, 'xhr.send();'));
                    setOptionContentTypeFlag(0);
                    setHeaderCount(header_count-1);
                }
            //Content-Type設定
            } else if(option_name === 'option_header_content_type'){
                setCode(code.replace('xhr.setRequestHeader("' + option_header_content_type + '");', 'xhr.setRequestHeader("' + option_val + '");'));
                setOptionContentType(option_val);
            //onreadystatechange
            } else if(option_name === 'option_property_onreadystatechange') {
                if(option_val == 0){
                    setCode(code + source_code[CodeName]);
                    setOptionOnreadystatechangeFlag(1);
                    setPropertyCount(property_count+1);
                } else {
                    setCode(code.replace(source_code[CodeName], ''));
                    setOptionOnreadystatechangeFlag(0);
                    setPropertyCount(property_count-1);
                }
            //readyState
            } else if(option_name === 'option_property_readyState') {
                operation('property');
                if(option_val == 0){
                    setOptionReadyState(1);
                } else {
                    setOptionReadyState(0);
                }
            //response
            } else if(option_name === 'option_property_response'){
                operation('property');
                if(option_val == 0){
                    setOptionResponse(1);
                } else {
                    setOptionResponse(0);
                }
            //responseText
            } else if(option_name === 'option_property_responseText'){
                operation('property');
                if(option_val == 0){
                    setOptionResponseText(1);
                } else {
                    setOptionResponseText(0);
                }
            //status
            } else if(option_name === 'option_property_status'){
                operation('property');
                if(option_val == 0){
                    setOptionStatus(1);
                } else {
                    setOptionStatus(0);
                }
            //statusText
            } else if(option_name === 'option_property_statusText'){
                operation('property');
                if(option_val == 0){
                    setOptionStatusText(1);
                } else {
                    setOptionStatusText(0);
                }
            //oneerror
            } else if(option_name === 'option_property_onerror'){
                if(option_val == 0){
                    setCode(code + source_code[CodeName]);
                    setOptionOnerror(1);
                    setPropertyCount(property_count+1);
                } else {
                    setCode(code.replace(source_code[CodeName], ''));
                    setOptionOnerror(0);
                    setPropertyCount(property_count-1);
                }
            //onloadend
            } else if(option_name === 'option_property_onloadend'){
                if(option_val == 0){
                    setCode(code + source_code[CodeName]);
                    setOptionOnloadend(1);
                    setPropertyCount(property_count+1);
                } else {
                    setCode(code.replace(source_code[CodeName], ''));
                    setOptionOnloadend(0);
                    setPropertyCount(property_count-1);
                }
            //abort
            } else if(option_name === 'option_method_abort'){
                operation('method');
                if(option_val == 0){
                    setCode(code + source_code[CodeName]);
                    setOptionAbort(1);
                } else {
                    setCode(code.replace(source_code[CodeName], ''));
                    setOptionAbort(0);
                }
            //open
            } else if(option_name === 'option_method_open') {
                operation('method');
                if(option_val == 0){
                    setCode(code.replace('*open_space*', 'xhr.open("'+option_method+'", url);'));
                    setOptionOpen(1);
                } else {
                    setCode(code.replace('xhr.open("'+option_method+'", url);', '*open_space*'));
                    setOptionOpen(0);
                }
            //send
            } else if(option_name === 'option_method_send'){
                operation('method');
                if(option_val == 0){
                    setCode(code.replace('*send_space*', 'xhr.send();'));
                    setOptionSend(1);
                } else {
                    setCode(code.replace('xhr.send();', '*send_space*'));
                    setOptionSend(0);
                }
            //getAllResponseHeaders
            } else if(option_name === 'option_method_getAllResponseHeaders'){
                operation('method');
                if(option_val == 0){
                    setOptions(options + source_code[CodeName]);
                    setCode(code.replace(options, options + source_code[CodeName]));
                    setOptionGetAllResponseHeaders(1);
                } else {
                    setOptions(options.replace(source_code[CodeName], ''));
                    setCode(code.replace(source_code[CodeName], ''));
                    setOptionGetAllResponseHeaders(0);
                }
            //Ajaxオプションリセット
            } else if(option_name === 'option_ajax_reset'){
                getDefaultCode(language, 'Ajax', 'reset');
            } else {

            }

        /*文字列操作オプション*/
        } else if(method === 'STR'){
            //text設定
            if(option_name === 'option_str_text') {
                if ( option_str_text.length == 0 ) {
                    setCode(code.replace('var str = "', 'var str = "' + option_val));
                    setOptionStrText(option_val);
                } else {
                    setCode(code.replace('var str = "' + option_str_text, 'var str = "' + option_val));
                    setOptionStrText(option_val);
                }
            //メソッド設定
            } else if(option_name === 'option_str'){
                CodeName = language + '_' + method + '_' + option_val;
                setCode(source_code[CodeName]);
                setOptionStr(option_val);
                setCode(source_code[CodeName].replace('javascript文字列', option_str_text)); //メソッドの設定を同期

            //文字列操作オプションリセット
            } else if(option_name === 'option_str_reset') {
                setOptionStrText('javascript文字列');
                setOptionStr('');
                //初期化
                getDefaultCode(language, method);
            }
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <h2 className="program_title">プログラム生成ツール</h2>
                <div className="row">
                    <div className="col-md-3">
                        <span>【 言語 】</span><br/>
                        <Radio name="language" value='JavaScript' onClick={(e) => getDefaultCode('JavaScript', method, 'reset')} option="JavaScript" state={language} /><br/>
                        <Radio name="language" value='PHP' onClick={(e) => getDefaultCode('PHP', method, 'reset')} option="PHP" state={language} />
                    </div>

                    <div className="col-md-9">
                        <span>【 関数 】</span><br/>
                        <div className="program_scroll_form">
                            {language === 'JavaScript' ?
                                <div>
                                    <Radio name="method" value="Ajax" onClick={() => getDefaultCode(language, 'Ajax', 'reset')} option="Ajax" state={method} />&nbsp;&nbsp;
                                    <Radio name="method" value="STR" onClick={() => getDefaultCode(language, 'STR')} option="文字列操作" state={method} />
                                </div>
                            : language === 'PHP' ?
                                <Radio name="method" value="Ajax" onClick={() => getDefaultCode(language, 'Ajax', 'reset')} option="Ajax" state={method} />
                            : ''
                            }
                            {/* {(method === 'Ajax' && language === 'JavaScript') && */}
                            {method === 'Ajax' &&
                                <div className="program_option">
                                    <Radio className="program_radio_form" name="option_method" value="GET" onClick={(e) => getOptionCode(e)} option="GET" state={option_method} />
                                    <Radio className="program_radio_form" name="option_method" value="POST" onClick={(e) => getOptionCode(e)} option="POST" state={option_method} />
                                    <input className="program_option_input" type="text" name="option_ajax_url" value={option_ajax_url} onChange={(e) => getOptionCode(e)} />
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="program_accordion_summury">
                                            <Typography className="program_accordion_title">ヘッダー</Typography>
                                            <Typography className="program_accordion_option_count">{header_count}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="program_accordion_title">
                                            {language === 'JavaScript' &&
                                                <div>
                                                    <CheckBox name="option_header_content_type_flag" value={option_header_content_type_flag} onClick={(e) => getOptionCode(e)} option="Content-Type" state={option_header_content_type_flag} /><br/>
                                                    {option_header_content_type_flag === 1 &&
                                                        <input className="program_option_input" type="text" name="option_header_content_type" value={option_header_content_type} onChange={(e) => getOptionCode(e)}/>
                                                    }
                                                </div>
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="program_accordion_summury">
                                            <Typography className="program_accordion_title">プロパティ</Typography>
                                            <Typography className="program_accordion_option_count">{property_count}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="program_accordion_title">
                                            {language === 'JavaScript' &&
                                            <div>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_onreadystatechange" value={option_property_onreadystatechange} onClick={(e) => getOptionCode(e)} option="onreadystatechange" state={option_property_onreadystatechange} />
                                                    </summary>
                                                    <p>EventHandler で、 readyState 属性が変化するたびに呼び出されます。コールバックはユーザーインターフェイスのスレッドから呼び出されます。 XMLHttpRequest.onreadystatechange プロパティは、 readystatechange イベントが発生するたびに、つまり XMLHttpRequest の readyState が変化するたびに呼び出されるイベントハンドラーを保持します。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_readyState" value={option_property_readyState} onClick={(e) => getOptionCode(e)} option="readyState" state={option_property_readyState} />
                                                    </summary>
                                                    <p>XMLHttpRequest.readyState プロパティは XMLHttpRequest クライアントの状態を返します。XHR クライアントは次の状態のいずれかをとります。</p>
                                                    <Table />
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_response" value={option_property_response} onClick={(e) => getOptionCode(e)} option="response" state={option_property_response} />
                                                    </summary>
                                                    <p>response プロパティは、そのリクエストのresponseTypeによって、ArrayBuffer, Blob, Document, JavaScript Object, or DOMStringといったレスポンスのボディを返します。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_responseText" value={option_property_responseText} onClick={(e) => getOptionCode(e)} option="responseText" state={option_property_responseText} />
                                                    </summary>
                                                    <p>XMLHttpRequest.responseXML は読み取り専用のプロパティで、リクエストによって受け取った HTML または XML を含む Document、またはリクエストが成功しなかった場合、まだ送信されていない場合、データが XML または HTML として解釈できない場合は null を返します。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_status" value={option_property_status} onClick={(e) => getOptionCode(e)} option="status" state={option_property_status} />
                                                        <Tooltip detail='ステータス番号を返します. (例えば "Not Found" を示す "404" か "OK" を示す "200" です)' />
                                                    </summary>
                                                    <p>XMLHttpRequest のレスポンスにおける数値の HTTP ステータスコードを返します。リクエストが完了する前は、 status の値は 0 になります。 XMLHttpRequest がエラーになった場合も、ブラウザーはステータスとして 0 を返します。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_statusText" value={option_property_statusText} onClick={(e) => getOptionCode(e)} option="statusText" state={option_property_statusText} />
                                                        <Tooltip detail='ステータステキストを返します. (例えば "Not Found" または "OK")' />
                                                    </summary>
                                                    <p>HTTP サーバーから返ってきたレスポンス文字列が入った DOMString を返します。XMLHTTPRequest.status とは異なり、("200 OK" のように) レスポンスメッセージの完全な文が含まれています。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_onerror" value={option_property_onerror} onClick={(e) => getOptionCode(e)} option="oneerror" state={option_property_onerror} />
                                                    </summary>
                                                    <p>XMLHttpRequestEventTarget.onerror は、エラーの為に XMLHttpRequest トランザクションが失敗した場合に呼び出される関数です。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_property_onloadend" value={option_property_onloadend} onClick={(e) => getOptionCode(e)} option="onloadend" state={option_property_onloadend} />
                                                    </summary>
                                                    <p>XMLHttpRequestEventTarget.onloadendは、ajax通信が成功か失敗に関わらず終了した時にloadendイベントが発生し、ここに設定したコールバック関数が呼び出されます。</p>
                                                </details>
                                            </div>
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="program_accordion_summury">
                                        <Typography className="program_accordion_title">メソッド</Typography>
                                        <Typography className="program_accordion_option_count">{method_count}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="program_accordion_title">
                                        {language === 'JavaScript' &&
                                            <div>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_method_open" value={option_method_open} onClick={(e) => getOptionCode(e)} option="open" state={option_method_open} />
                                                    </summary>
                                                    <p>新しく作成されたリクエストを初期化したり、既存のリクエストを再初期化したりします。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_method_send" value={option_method_send} onClick={(e) => getOptionCode(e)} option="send" state={option_method_send} />
                                                    </summary>
                                                    <p>リクエストをサーバーに送信します。リクエストが非同期の場合 (これが既定)、このメソッドはリクエストが送信されるとすぐに戻り、結果はイベントを用いて配信されます。リクエストが同期の場合、このメソッドはレスポンスが到着するまで戻りません。</p>
                                                    <p>send() はリクエストの本文を示す引数を一つ受け取ることができます。これは主に PUT のようなリクエストに使用されます。リクエストメソッドが GET 又は HEAD であれば、 body 引数は無視され、リクエストの本文は null に設定されます。</p>
                                                    <p>setRequestHeader() を使用して Accept ヘッダーを設定しなかった場合、 Accept ヘッダーは "*/*" 型 (任意の型) が送信されます。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_method_abort" value={option_method_abort} onClick={(e) => getOptionCode(e)} option="abort" state={option_method_abort} />
                                                        <Tooltip detail="この例では、ある条件が発生したときに、 abort() を呼び出すことで転送を中止します。" />
                                                    </summary>
                                                    <p>abort イベントは、例えばプログラムが XMLHttpRequest.abort() を呼び出した時など、リクエストが中断されたときに発生します。</p>
                                                </details>
                                                <details className="program_accordion_title_details">
                                                    <summary className="program_accordion_title_summary">
                                                        <CheckBox name="option_method_getAllResponseHeaders" value={option_method_getAllResponseHeaders} onClick={(e) => getOptionCode(e)} option="getAllResponseHeaders" state={option_method_getAllResponseHeaders} />
                                                    </summary>
                                                    <p>getAllResponseHeaders() メソッドは、すべてのレスポンスヘッダーを CRLF で区切った文字列として返し、レスポンスを受信していない場合は null を返します。ネットワークエラーが発生した場合は、空文字列が返されます。</p>
                                                </details>
                                            </div>
                                        }
                                        </AccordionDetails>
                                    </Accordion>
                                    <div className="option_reset_button">
                                        <input type="button" value="Reset" name="option_ajax_reset" onClick={(e) => getOptionCode(e)} />
                                    </div>
                                </div>
                            }

                            {method == 'STR' &&
                                <div className="program_option">
                                    <input type="text" className="program_str_text" name="option_str_text" value={option_str_text} onChange={(e) => getOptionCode(e)} />
                                    {language === 'JavaScript' &&
                                        <div>
                                            <details className="program_accordion_title_details">
                                                <summary className="program_accordion_title_summary">
                                                    <Radio className="program_radio_form" name="option_str" value="substr" onClick={(e) => getOptionCode(e)} option="substr" state={option_str} />
                                                </summary>
                                                <p>substr() メソッドは、文字列の一部を、指定した位置から後方向指定した文字数だけ返します。</p>
                                            </details>
                                            <details className="program_accordion_title_details">
                                                <summary className="program_accordion_title_summary">
                                                    <Radio className="program_radio_form" name="option_str" value="substring" onClick={(e) => getOptionCode(e)} option="substring" state={option_str} />
                                                </summary>
                                                <p>substring() メソッドは string オブジェクトの開始・終了位置の間、または文字列の最後までの部分集合を返します。</p>
                                            </details>
                                            <details className="program_accordion_title_details">
                                                <summary className="program_accordion_title_summary">
                                                    <Radio className="program_radio_form" name="option_str" value="slice" onClick={(e) => getOptionCode(e)} option="slice" state={option_str} />
                                                </summary>
                                                <p>slice() メソッドは、start と end が配列の中の項目のインデックスを表している場合、start から end まで (end は含まれない) で選択された配列の一部の浅いコピーを新しい配列オブジェクトに作成して返します。元の配列は変更されません。</p>
                                            </details>
                                            <details className="program_accordion_title_details">
                                                <summary className="program_accordion_title_summary">
                                                    <Radio className="program_radio_form" name="option_str" value="split" onClick={(e) => getOptionCode(e)} option="split" state={option_str} />
                                                </summary>
                                                <p>split() メソッドは、 String を指定した区切り文字列で分割することにより、文字列の配列に分割します。</p>
                                            </details>
                                        </div>
                                    }
                                    <input type="button" value="Reset" name="option_str_reset" onClick={(e) => getOptionCode(e)} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7 program_code_form">
                <div className="program_code_form_sub">
                    <Code code={code} language={language}></Code>
                    <Result code={code} method={method} language={language} ></Result>
                </div>
            </div>
        </div>
    );
}

const App: React.FC = () => {
    return (
        <div className="main">
            <Main />
        </div>
    );
}

if (document.getElementById('programGenerate')) {
    ReactDOM.render(<App />, document.getElementById('programGenerate'));
}