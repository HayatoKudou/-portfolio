import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {XMLHttpRequest, jQueryAjax} from './source_code';

type Props = {
    language: number;
    code: string;
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

const Main: React.FC = () => {

    const [language, setLanguage] = useState(0);
    const [code, setCode] = useState('ここにコードが表示されます。');

    function getCode(language: number){
        setLanguage(language);
        if(language === 1){
            setCode(XMLHttpRequest);
        } else if(language === 2){
            setCode(jQueryAjax);
        } else if(language === 3){
            setCode('test3');
        }
    }

    return (
        <div>
            <label>
                <input type="radio" name="language" value={language} onClick={() => getCode(1)} />
                <span>JavaScript</span>                    
            </label>
            <label>
                <input type="radio" name="language" value={language} onClick={() => getCode(2)} />
                <span>jQuery</span>                    
            </label>
            <label>
                <input type="radio" name="language" value={language} onClick={() => getCode(3)} />
                <span>TypeScript</span>                    
            </label>
            <Code code={code}></Code>
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
  
if (document.getElementById('js_generate')) {
    ReactDOM.render(<App />, document.getElementById('js_generate'));
}