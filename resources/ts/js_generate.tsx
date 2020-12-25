
import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import * as source_code from './source_code';
import {Radio} from './components/radioComponent';
import {CheckBox} from './components/checkboxComponent';

type Props = {
    code: string;
    language?: string;
    method?: string;
}

const Code: React.FC<Props> = ({code}) => {
    return (
        <div>
            <pre className="prettyprint linenums lang-js program_pre_form">
                <code>{code}</code>
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

    //APIオプション
    const [option_method, setOptionMethod] = useState('GET');
    const [option_header, setOptionHeader] = useState(0);
    const [option_api_url, setOptionApiUrl] = useState('https://kudohayatoblog.com/api/api_endPoint');
    const [option_header_content_type_flag, setOptionContentTypeFlag] = useState(0);    
    const [option_header_content_type, setOptionContentType] = useState('Content-Type", "application/json;charset=UTF-8');   
    
    //文字列操作オプション
    const [option_str_text, setOptionStrText] = useState('javascript文字列');
    const [option_str, setOptionStr] = useState('');

    //非同期処理で使うstateで管理できない者たち
    var CodeName = 'JavaScript_API_Default'; //呼び出すモジュール名

    window.onload = function() {
        getDefaultCode('JavaScript', 'API');
    };

    //基本コード
    function getDefaultCode(language_arg: string, method_arg: string = ''){
        setLanguage(language_arg);
        setMethod(method_arg);
        CodeName = language_arg + '_' + method_arg + '_' + 'Default';
        if(method_arg == 'API' && (language != language_arg || method != method_arg)){
            setCode(source_code[CodeName].replace('GET', option_method)); //メソッドの設定を同期
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
        console.log(option_name + ': ' + option_val);

        /*APIオプション*/
        //get・post設定
        if(option_name ==='option_method'){
            setOptionMethod(option_val);
            setCode(code.replace(option_method, option_val)); //コード変換
        //header設定
        } else if(option_name === 'option_header'){ 
            if(option_val == 0){
                CodeName = language + '_' + method + '_' + option_name;               
                setOptionHeader(1);
                setCode(source_code[CodeName].replace('GET', option_method)); //メソッドの設定を同期
            } else {
                setOptionHeader(0);
                setOptionContentTypeFlag(0);
                getDefaultCode(language, method); 
            }  
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
            if(option_val == 0){
                setOptionContentTypeFlag(1);
            } else {
                setOptionContentTypeFlag(0);
            }
        //Content-Type設定
        } else if(option_name === 'option_header_content_type'){
            setCode(code.replace(option_header_content_type, option_val));
            setOptionContentType(option_val);
        

        /*文字列操作オプション*/
        //text設定
        } else if(option_name === 'option_str_text') {
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


        //APIオプションリセット
        } else if(option_name === 'option_api_reset'){
            async function resolveSample(){
                setOptionMethod('GET');
                setOptionHeader(0);
                setOptionApiUrl('https://kudohayatoblog.com/api/api_endPoint');
                setOptionContentTypeFlag(0);
                setOptionContentType('Content-Type", "application/json;charset=UTF-8');
            }
            resolveSample().then(() => {
                //初期化
                getDefaultCode(language, method);
            })
  

        //文字列操作オプションリセット
        } else if(option_name === 'option_str_reset') {
            setOptionStrText('javascript文字列');
            setOptionStr('');
            //初期化
            getDefaultCode(language, method);
        
        //その他
        } else {
                    
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
                        <Radio name="method" value="API" onClick={() => getDefaultCode(language, 'API')} option="API" state={method} />            
                        <br />                 
                        {method == 'API' &&
                            <div className="program_option">
                                <Radio className="program_radio_form" name="option_method" value="GET" onClick={(e) => getOptionCode(e)} option="GET" state={option_method} />
                                <Radio className="program_radio_form" name="option_method" value="POST" onClick={(e) => getOptionCode(e)} option="POST" state={option_method} />
                                <input className="program_option_input" type="text" name="option_api_url" value={option_api_url} onChange={(e) => getOptionCode(e)} /> 
                                <CheckBox name="option_header" value={option_header} onClick={(e) => getOptionCode(e)} option="headerオプション" state={option_header} />
                                <br />
                                {option_header == 1 &&          
                                    <div>
                                        <CheckBox name="option_header_content_type_flag" value={option_header_content_type_flag} onClick={(e) => getOptionCode(e)} option="Content-Type" state={option_header_content_type_flag} /> 
                                        {option_header_content_type_flag === 1 &&
                                            <input className="program_option_input" type="text" name="option_header_content_type" value={option_header_content_type} onChange={(e) => getOptionCode(e)}/>
                                        }
                                    </div>                        
                                } 
                                <input type="button" value="reset" name="option_api_reset" onClick={(e) => getOptionCode(e)} />                               
                            </div>
                        }                                              
                        <Radio name="method" value="STR" onClick={() => getDefaultCode(language, 'STR')} option="文字列操作" state={method} />
                        {method == 'STR' &&
                            <div className="program_option">
                                <input type="text" name="option_str_text" value={option_str_text} onChange={(e) => getOptionCode(e)} /><br/>                                
                                <Radio className="program_radio_form" name="option_str" value="substr" onClick={(e) => getOptionCode(e)} option="substr" state={option_str} />
                                <Radio className="program_radio_form" name="option_str" value="substring" onClick={(e) => getOptionCode(e)} option="substring" state={option_str} />
                                <Radio className="program_radio_form" name="option_str" value="slice" onClick={(e) => getOptionCode(e)} option="slice" state={option_str} />
                                <br/>
                                <Radio className="program_radio_form" name="option_str" value="split" onClick={(e) => getOptionCode(e)} option="split" state={option_str} />
                                <br/>
                                <input type="button" value="reset" name="option_str_reset" onClick={(e) => getOptionCode(e)} />   
                            </div>
                        }                           
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <Code code={code} language={language}></Code>
                <Result code={code} language={language} method={method}></Result>
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