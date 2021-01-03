
import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import * as source_code from './source_code';
import {Radio} from './components/radioComponent';
import {CheckBox} from './components/checkboxComponent';
import {Tooltip} from './components/tooltipComponent';
import {Table} from './components/tableComponent';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type Props = {
    code: string;
    language?: string;
    method?: string;
}

const Code: React.FC<Props> = ({code, language}) => {
    return (
        <div>            
            <pre className="prettyprint linenums lang-js program_pre_form">
                <div className="program_btn">
                    <p className="program_language_title">{language}</p>
                    <p className="copy_btn" data-clipboard-target="#code1">Copy</p>   
                </div>                
                <code id="code1">{code}</code>
            </pre>            
        </div>
    )
}

const Result: React.FC<Props> = ({code, method}) => {

    const [resultCode, setResultCode] = useState('');
    const closure = `
    (function (data) {
        return data;
    }(result));
        `;

    //返り値取得の為即時関数をつける
    var run_code = method === 'STR' ? code + closure : code;   
    
    return (
        <div className="row">
            <div className="col-md-2">
                <button className="program_run_button" onClick={() => setResultCode(eval(run_code))}>Run</button>
                <button className="program_reset_button" onClick={() => setResultCode('')}>Reset</button>
            </div>  
            <div className="col-md-10">
                <pre className="prettyprint linenums lang-js program_result_form">
                    <code className="prettyprint linenums lang-js">{resultCode}</code>
                </pre>
            </div>          
        </div>
    )
}

const Main: React.FC = () => {

    const [code, setCode] = useState(''); //基本ソースコード
    const [language, setLanguage] = useState('JavaScript');    
    const [method, setMethod] = useState('API');
    const [option_count, setOptionCount] = useState(0); //オプション数 = インデント数

    //APIオプション
    const [option_method, setOptionMethod] = useState('GET');
    const [options, setOptions] = useState('alert(xhr);');  //alert部分
    const [header_count, setHeaderCount] = useState(0);  //ヘッダー数
    const [property_count, setPropertyCount] = useState(1);  //プロパティ数
    const [method_count, setMethodCount] = useState(0);  //メソッド数
    const [option_api_url, setOptionApiUrl] = useState('https://kudohayatoblog.com/api/api_endPoint');
    const [option_header_content_type_flag, setOptionContentTypeFlag] = useState(0);    
    const [option_header_content_type, setOptionContentType] = useState('Content-Type", "application/json;charset=UTF-8');   
    const [option_header_onreadystatechange, setOptionOnreadystatechangeFlag] = useState(1);       
    const [option_header_readyState, setOptionReadyState] = useState(0);           
    const [option_header_response, setOptionResponse] = useState(0);           
    
    //文字列操作オプション
    const [option_str_text, setOptionStrText] = useState('javascript文字列');
    const [option_str, setOptionStr] = useState('');

    //非同期処理で使うstateで管理できない者たち
    var CodeName = 'JavaScript_API_Default'; //呼び出すモジュール名

    window.onload = function() {
        getDefaultCode('JavaScript', 'API', 'option_header_onreadystatechange');
    };

    //基本コード
    function getDefaultCode(language_arg: string, method_arg: string = '', option_arg: string = 'Default'){
        
        setLanguage(language_arg);
        setMethod(method_arg);
        CodeName = language_arg + '_' + method_arg + '_' + option_arg;
        var defaultCode = language_arg + '_' + method_arg + '_' + 'Default';

        if(method_arg == 'API'){
            if(option_arg === 'reset'){
                setCode(source_code[defaultCode].replace(option_method, 'GET') + source_code['JavaScript_API_option_header_onreadystatechange']);
            } else if(option_arg === 'option_header_onreadystatechange'){                
                if(option_header_readyState){
                    setOptions(options + source_code['JavaScript_API_option_header_readyState']);
                }
                if(option_header_response){
                    setOptions(source_code['JavaScript_API_option_header_response']);
                }
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
        var CodeName = '';
        var content_type_code = 
`xhr.send();
xhr.setRequestHeader("${option_header_content_type}");`;
        console.log(language + ': ' + method + ': ' + option_name + ': ' + option_val);

        /*APIオプション*/
        if(method === 'API'){
            //get・post設定
            if(option_name ==='option_method'){
                setOptionMethod(option_val);
                setCode(code.replace(option_method, option_val)); //コード変換
            //URL設定
            } else if(option_name === 'option_api_url'){
                if ( option_api_url.length == 0 ) { 
                    setCode(code.replace('var url = "', 'var url = "' + option_val));     
                    setOptionApiUrl(option_val);
                } else {                
                    setCode(code.replace('var url = "' + option_api_url, 'var url = "' + option_val));
                    setOptionApiUrl(option_val);
                }
            //Content-Type表示設定
            } else if(option_name === 'option_header_content_type_flag'){
                CodeName = language + '_' + method + '_' + option_name; 
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
                setCode(code.replace(option_header_content_type, option_val));
                setOptionContentType(option_val);
            //onreadystatechange
            } else if(option_name === 'option_header_onreadystatechange') {
                CodeName = language + '_' + method + '_' + option_name; 
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
            } else if(option_name === 'option_header_readyState') {
                CodeName = language + '_' + method + '_' + option_name;
                if(option_val == 0){
                    setOptions(options + source_code[CodeName]);
                    setCode(code.replace(options, options + source_code[CodeName]));                
                    setOptionReadyState(1);                    
                    setPropertyCount(property_count+1);
                } else {
                    setOptions(options.replace(source_code[CodeName], ''));
                    setCode(code.replace(source_code[CodeName], ''));                                     
                    setOptionReadyState(0);            
                    setPropertyCount(property_count-1);        
                }       
            //response
            } else if(option_name === 'option_header_response'){     
                CodeName = language + '_' + method + '_' + option_name; 
                if(option_val == 0){        
                    setOptions(options + source_code[CodeName]);                                   
                    setCode(code.replace(options, options + source_code[CodeName]));           
                    setOptionResponse(1);                    
                    setPropertyCount(property_count+1);
                } else {
                    //オプションが空になる場合
                    setOptions(options.replace(source_code[CodeName], ''));
                    setCode(code.replace(source_code[CodeName], ''));                                    
                    setOptionResponse(0);                    
                    setPropertyCount(property_count-1);
                }              
            //APIオプションリセット
            } else if(option_name === 'option_api_reset'){
                async function resolveSample(){
                    setOptionMethod('GET');
                    setOptionApiUrl('https://kudohayatoblog.com/api/api_endPoint');
                    setOptionContentTypeFlag(0);
                    setOptionContentType('Content-Type", "application/json;charset=UTF-8');
                    setOptionOnreadystatechangeFlag(1);
                    setOptionReadyState(0);
                    setOptionResponse(0);
                    setHeaderCount(0);
                    setPropertyCount(1);
                    setMethodCount(0);
                }
                resolveSample().then(() => {
                    //初期化
                    getDefaultCode('JavaScript', 'API', 'reset');
                })
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
                        <Radio name="language" value={language} onClick={(e) => getDefaultCode('JavaScript')} option="JavaScript" state={language} />
                    </div>

                    <div className="col-md-9">
                        <span>【 関数 】</span><br/>
                        <div className="program_scroll_form">
                            <Radio name="method" value="API" onClick={() => getDefaultCode(language, 'API', 'option_header_onreadystatechange')} option="API" state={method} />&nbsp;&nbsp;
                            <Radio name="method" value="STR" onClick={() => getDefaultCode(language, 'STR')} option="文字列操作" state={method} />
                            <br />                 
                            {method == 'API' &&
                                <div className="program_option">
                                    <Radio className="program_radio_form" name="option_method" value="GET" onClick={(e) => getOptionCode(e)} option="GET" state={option_method} />
                                    <Radio className="program_radio_form" name="option_method" value="POST" onClick={(e) => getOptionCode(e)} option="POST" state={option_method} />
                                    <input className="program_option_input" type="text" name="option_api_url" value={option_api_url} onChange={(e) => getOptionCode(e)} /> 
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="program_accordion_summury">
                                            <Typography className="program_accordion_title">ヘッダー</Typography>
                                            <Typography className="program_accordion_option_count">{header_count}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="program_accordion_title">
                                            <div>
                                                <CheckBox name="option_header_content_type_flag" value={option_header_content_type_flag} onClick={(e) => getOptionCode(e)} option="Content-Type" state={option_header_content_type_flag} /><br/>                                        
                                                {option_header_content_type_flag === 1 &&
                                                    <input className="program_option_input" type="text" name="option_header_content_type" value={option_header_content_type} onChange={(e) => getOptionCode(e)}/>
                                                }
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="program_accordion_summury">
                                            <Typography className="program_accordion_title">プロパティ</Typography>
                                            <Typography className="program_accordion_option_count">{property_count}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="program_accordion_title">
                                            <div className="program_accordion_title_sub">
                                                <CheckBox name="option_header_onreadystatechange" value={option_header_onreadystatechange} onClick={(e) => getOptionCode(e)} option="onreadystatechange" state={option_header_onreadystatechange} />
                                                <Tooltip detail="EventHandlerで、これはreadyState属性が変化する度に呼び出されます。" />
                                            </div>
                                            <div className={option_header_readyState === 1 ? "program_accordion_title_sub_auto" : "program_accordion_title_sub"}>
                                                <CheckBox name="option_header_readyState" value={option_header_readyState} onClick={(e) => getOptionCode(e)} option="readyState" state={option_header_readyState} />
                                                <Tooltip detail="リクエストの状態を unsigned short で返します。" />
                                                {option_header_readyState === 1 &&
                                                    <Table />
                                                }
                                            </div>
                                            <div className="program_accordion_title_sub">
                                                <CheckBox name="option_header_response" value={option_header_response} onClick={(e) => getOptionCode(e)} option="response" state={option_header_response} />
                                                <Tooltip 
                                                    detail="リクエストのエンティティ本文を含む ArrayBuffer, Blob, Document, JavaScript オブジェクト," 
                                                    detail2="DOMString の何らかを、 XMLHttpRequest.responseType の値に応じて返します。"
                                                />
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>     
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="program_accordion_summury">
                                        <Typography className="program_accordion_title">メソッド</Typography>
                                        <Typography className="program_accordion_option_count">{method_count}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="program_accordion_title">
                                            <div className="program_accordion_title_sub">

                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                    <div className="option_reset_button">
                                        <input type="button" value="reset" name="option_api_reset" onClick={(e) => getOptionCode(e)} />
                                    </div>                                                               
                                </div>
                            }
                            
                            {method == 'STR' &&
                                <div className="program_option">
                                    <input type="text" className="program_str_text" name="option_str_text" value={option_str_text} onChange={(e) => getOptionCode(e)} />
                                    <div className="program_str_title">
                                        <Radio className="program_radio_form" name="option_str" value="substr" onClick={(e) => getOptionCode(e)} option="substr" state={option_str} />   
                                        <Tooltip detail="substr() メソッドは、文字列の一部を、指定した位置から後方向指定した文字数だけ返します。"/>
                                    </div>
                                    <div className="program_str_title">
                                        <Radio className="program_radio_form" name="option_str" value="substring" onClick={(e) => getOptionCode(e)} option="substring" state={option_str} />
                                        <Tooltip detail="substring() メソッドは string オブジェクトの開始・終了位置の間、または文字列の最後までの部分集合を返します。"/>
                                    </div>
                                    <div className="program_str_title">
                                        <Radio className="program_radio_form" name="option_str" value="slice" onClick={(e) => getOptionCode(e)} option="slice" state={option_str} />
                                        <Tooltip 
                                            detail="slice() メソッドは、start と end が配列の中の項目のインデックスを表している場合、"
                                            detail2="start から end まで (end は含まれない) で選択された配列の一部の浅いコピーを新しい配列オブジェクトに作成して返します。元の配列は変更されません。"
                                        />
                                    </div>
                                    <div className="program_str_title">
                                        <Radio className="program_radio_form" name="option_str" value="split" onClick={(e) => getOptionCode(e)} option="split" state={option_str} />
                                        <Tooltip detail="split() メソッドは、 String を指定した区切り文字列で分割することにより、文字列の配列に分割します。"/>
                                    </div>
                                    <input type="button" value="reset" name="option_str_reset" onClick={(e) => getOptionCode(e)} />   
                                </div>
                            }
                        </div>                           
                    </div>
                </div>
            </div>
            <div className="col-md-7 program_code_form">
                <div className="program_code_form_sub">
                    <Code code={code} language={language}></Code>
                    <Result code={code} language={language} method={method}></Result>
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