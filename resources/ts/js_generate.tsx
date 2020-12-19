
import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import {TestApi, PHPcurlDefault, LaravelApiDefault, LaravelApiHeader, XMLHttpRequestDefault, jQueryAjaxDefault} from './source_code';

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
    const getApiUrl = 'https://kudohayatoblog.com/api/get_api_endPoint';
    const postApiUrl = 'https://kudohayatoblog.com/api/post_api_endPoint';

    function result(code: string, language: string){
        if(language == 'PHP'){
            setResultCode(eval(code));
        } else if(language == 'JavaScript'){
            setResultCode(eval(code));
        }
    }

    return (
        <div>
            <button onClick={() => result(code, language)}>実行</button>
            {resultCode != '' &&
                <pre className="prettyprint linenums lang-js">
                    <code>{resultCode}</code>
                </pre>
            }
        </div>
    )
}

const Main: React.FC = () => {

    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');    
    const [method, setMethod] = useState(0);
    const [option_header, setOptionHeader] = useState(0);

    window.onload = function() {
        getDefaultCode('PHP');
    };

    //基本コード
    function getDefaultCode(language: string){
        setLanguage(language);
        if(language === 'PHP'){
            // setCode(PHPcurlDefault);
            setCode(TestApi);
        } else if(language === 'Laravel'){
            setCode(LaravelApiDefault);
        } else if(language === 'JavaScript'){
            setCode(XMLHttpRequestDefault);
        } else if(language === 'jQuery'){
            setCode(jQueryAjaxDefault);
        } else if(language === 'TypeScript'){
            setCode(jQueryAjaxDefault);
        }
    }

    //オプション付き
    function getOptionCode(option: string){
        option_header === 0 ? setOptionHeader(1) : setOptionHeader(0);

        if(option === 'header' && option_header === 0){  //チェック状態を逆に   
            if(language === 'PHP'){
                setCode(PHPcurlDefault);                
            } else if(language === 'Laravel'){
                setCode(LaravelApiHeader);
            } else if(language === 'JavaScript'){
                setCode(XMLHttpRequestDefault);
            } else if(language === 'jQuery'){
                setCode(jQueryAjaxDefault);
            } else if(language === 'TypeScript'){
                setCode(jQueryAjaxDefault);
            }
        } else {
            getDefaultCode(language);
        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="row">

                    <div className="col-md-4">
                        <label>
                            <input type="radio" name="language" value={language} onClick={() => getDefaultCode('PHP')} defaultChecked />
                            <span>PHP</span>                    
                        </label><br />
                        <label>
                            <input type="radio" name="language" value={language} onClick={() => getDefaultCode('Laravel')} />
                            <span>Laravel</span>                    
                        </label><br />
                        <label>
                            <input type="radio" name="language" value={language} onClick={() => getDefaultCode('JavaScript')} />
                            <span>JavaScript</span>                    
                        </label><br />
                        <label>
                            <input type="radio" name="language" value={language} onClick={() => getDefaultCode('jQuery')} />
                            <span>jQuery</span>                    
                        </label><br />
                        <label>
                            <input type="radio" name="language" value={language} onClick={() => getDefaultCode('TypeScript')} />
                            <span>TypeScript</span>                    
                        </label>
                    </div>

                    <div className="col-md-4">
                        <label>
                            <input type="radio" name="method" value={method} onClick={() => setMethod(1)} defaultChecked />
                            <span>API</span>           
                        </label><br />
                        <label>
                            <input type="radio" name="method" value={method} onClick={() => setMethod(2)} />
                            <span>文字列切り取り</span>           
                        </label>
                    </div>

                    <div className="col-md-4">
                        <label>
                            <input type="checkbox" name="option_header" value={option_header} onClick={() => getOptionCode('header')} />
                            <span>header</span>           
                        </label><br />                        
                    </div>

                </div>
            </div>
            <div className="col-md-8">
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