
import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import * as source_code from './source_code';

type Props = {
    code: string;
    language: string;
}

const Code: React.FC<Props> = ({code}) => {
    return (
        <div>
            <pre className="prettyprint linenums lang-js">
                <code>{code}</code>
            </pre>
        </div>
    )
}

const Result: React.FC<Props> = ({code, language}) => {

    const [resultCode, setResultCode] = useState('');

    return (
        <div>
            <button onClick={() => setResultCode(eval(code))}>実行</button>
            <pre className="prettyprint linenums lang-js">
                <code>{resultCode}</code>
            </pre>
        </div>
    )
}

const Main: React.FC = () => {

    const [code, setCode] = useState(''); //基本ソースコード
    const [language, setLanguage] = useState('JavaScript');    
    const [method, setMethod] = useState('API');
    const [option_method, setOptionMethod] = useState('GET');
    const [option_header, setOptionHeader] = useState(0);
    const [option_api_url, setOptionApiUrl] = useState('https://kudohayatoblog.com/api/get_api_endPoint');
    const [option_header_content_type_flag, setOptionContentTypeFlag] = useState(0);    
    const [option_header_content_type, setOptionContentType] = useState('Content-Type", "application/json;charset=UTF-8');    

    //非同期処理で使うstateで管理できない者たち
    var CodeName = 'JavaScript_API_Default'; //呼び出すモジュール名

    window.onload = function() {
        getDefaultCode('JavaScript');
    };

    //基本コード
    function getDefaultCode(language: string){
        setLanguage(language);
        CodeName = language + '_' + method + '_' + 'Default';
        setCode(source_code[CodeName].replace('GET', option_method)); //メソッドの設定を同期
    }

    //オプション付き
    function getOptionCode(option: any){
        option.persist(); //非同期
        var option_name: string = option.target.name;
        var option_val: any = option.target.value;
        var CodeName = '';
        console.log(option_name + ': ' + option_val);

        //get・post設定
        if(option_name ==='option_method'){
            setOptionMethod(option_val);
            setCode(code.replace(option_method, option_val)); //コード変換
        //header設定
        } else if(option_name === 'option_header' && option_val == 0){      
            CodeName = language + '_' + method + '_' + option_name;               
            setOptionHeader(1);
            setCode(source_code[CodeName].replace('GET', option_method)); //メソッドの設定を同期
        //URL設定
        } else if(option_name === 'option_api_url'){
            setCode(code.replace(option_api_url, option_val));
            setOptionApiUrl(option_val);
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
        } else {
            setOptionHeader(0);
            setOptionContentTypeFlag(0);
            getDefaultCode(language);            
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <h2 className="program_title">プログラム生成ツール</h2>
                <div className="row">
                    <div className="col-md-3">
                        <span>【 言語 】</span><br/>
                        <label>
                            <input type="radio" name="language" value={language} onClick={() => getDefaultCode('JavaScript')} defaultChecked />
                            <span>JavaScript</span>                    
                        </label><br />
                        <label>
                            <input type="radio" name="language" value={language} onClick={() => getDefaultCode('jQuery')} />
                            <span>jQuery</span>                    
                        </label><br />
                    </div>

                    <div className="col-md-9">
                        <span>【 関数 】</span><br/>
                        <label>
                            <input type="radio" name="method" value={method} onClick={() => setMethod('API')} defaultChecked />
                            <span>API</span>           
                        </label><br />                             
                        {method == 'API' &&
                            <div className="program_option">
                                <label>
                                    <input type="radio" name="option_method" value="GET" onChange={(e) => getOptionCode(e)} defaultChecked />
                                    <span>GET&nbsp;&nbsp;</span>
                                </label>
                                <label>
                                    <input type="radio" name="option_method" value="POST" onChange={(e) => getOptionCode(e)} />
                                    <span>POST</span>
                                </label>
                                <input className="program_option_input" type="text" name="option_api_url" value={option_api_url} onChange={(e) => getOptionCode(e)} /> 
                                <label>
                                    <input type="checkbox" name="option_header" value={option_header} onClick={(e) => getOptionCode(e)} />
                                    <span>headerオプション</span>           
                                </label><br />
                                {option_header == 1 &&
                                    <label className="program_option_input">
                                        <input type="checkbox" name="option_header_content_type_flag" value={option_header_content_type_flag} onClick={(e) => getOptionCode(e)} />
                                        <span>Content-Type</span><br/>
                                        {option_header_content_type_flag === 1 &&
                                            <input className="program_option_input" type="text" name="option_header_content_type" value={option_header_content_type} onChange={(e) => getOptionCode(e)}/>
                                        }
                                    </label>                                               
                                }                                
                            </div>
                        }                                              
                        <label>
                            <input type="radio" name="method" value={method} onClick={() => setMethod('文字列切り取り')} />
                            <span>文字列切り取り</span>           
                        </label>
                        {method == '文字列切り取り' &&
                            <div className="program_option">                         
                            </div>
                        }   
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <Code code={code} language={language}></Code>
                <Result code={code} language={language}></Result>
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