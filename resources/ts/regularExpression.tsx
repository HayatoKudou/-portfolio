import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

import {CheckBox} from './components/checkboxComponent';
import {Tooltip} from './components/tooltipComponent';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const Main: React.FC = () => {

    var customRegularEexpression: string = ''; //正規表現パターン

    const [input_str, setInputStr] = useState('');
    const [result, setResult] = useState('');
    const [custom_regular_expression, setCustomRegularRxpression] = useState('');

    const [example_regularExpression_postalCode, setExample_regularExpression_postalCode] = useState(false);
    const [example_regularExpression_emailAddress, setExample_regularExpression_emailAddress] = useState(false);
    const [example_regularExpression_url, setExample_regularExpression_url] = useState(false);

    //オプションフラグ
    const [option_flag, set_option_flag] = useState('');
    const [option_flag_g, set_option_flag_g] = useState(false);
    const [option_flag_i, set_option_flag_i] = useState(false);
    const [option_flag_m, set_option_flag_m] = useState(false);

    //正規表現実行
    function run_regular_expression(customRegularEexpression: string){        
        // const regexp = input_str.match(customRegularEexpression);
        const regexp = new RegExp(customRegularEexpression, option_flag);
        const matchStr = input_str.match(regexp);
        console.log(regexp);
        console.log(matchStr);
        if(matchStr !== null){
            matchStr.forEach(value =>
                setResult(value)
            )
        }
    }

    function set_regular_expression(e: any){

        var value: string = e.target.value;
        var name: string = e.target.name;
        var checked: boolean = e.target.checked;

        if(name === 'input_str'){
            customRegularEexpression = custom_regular_expression;
            setInputStr(value);
        } else if(name === 'custom_regular_expression'){
            customRegularEexpression = value;
            setCustomRegularRxpression(value);
        } else if(name === 'example_regularExpression_postalCode'){
            customRegularEexpression = checked === true ? '[0-9]{3}-[0-9]{4}' : '';
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_postalCode(checked);
        } else if(name === 'example_regularExpression_emailAddress'){
            customRegularEexpression = checked === true ? '\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*' : '';
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_emailAddress(checked);
        } else if(name === 'example_regularExpression_url'){
            customRegularEexpression = checked === true ? 'https?://([\w-]+\.)+[\w-]+(/[\w- .?%&=]*)?' : '';
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_url(checked);
        }

        //オプションフラグ
        else if(name === 'option_flag_g'){
            customRegularEexpression = custom_regular_expression;
            set_option_flag_g(checked);
        } else if(name === 'option_flag_i'){
            customRegularEexpression = custom_regular_expression;
            set_option_flag_i(checked);
        } else if(name === 'option_flag_m'){
            customRegularEexpression = custom_regular_expression;
            set_option_flag_m(checked);
        }

        // console.log(name + ': ' + value);
        // console.log(input_str + ': ' + customRegularEexpression);

        run_regular_expression(customRegularEexpression);
    }

    function set_regular_expression_button(target_name: string){
        if(target_name === 'pattern_/'){
            customRegularEexpression = custom_regular_expression + '/';
            setCustomRegularRxpression(custom_regular_expression + '/');
        } else if(target_name === 'pattern_^'){
            customRegularEexpression = custom_regular_expression + '^';
            setCustomRegularRxpression(custom_regular_expression + '^');
        } else if(target_name === 'pattern_$'){
            customRegularEexpression = custom_regular_expression + '$';
            setCustomRegularRxpression(custom_regular_expression + '$');
        }
        run_regular_expression(customRegularEexpression);
    }

    return(
        <div>
            <TextField type="search" className="input_str" label="文字列を入力" variant="outlined" size="small" name="input_str"
                onChange={(e) => set_regular_expression(e)} />
            <TextField type="search" className="input_str" label="正規表現を入力" variant="outlined" size="small" name="custom_regular_expression"
                onChange={(e) => set_regular_expression(e)} value={custom_regular_expression} />
                <div className="row input_regular_expression">
                    <div className="col-md-5">
                        <p className="input_regular_expression_title">正規表現パターン</p>
                        <div>
                            <Button className="regular_expression_pattren_button" variant="outlined" size="small" color="primary" name="pattern_/" onClick={() => set_regular_expression_button('pattern_/')}>\: 次の文字をエスケープ</Button>
                            <Button className="regular_expression_pattren_button" variant="outlined" size="small" color="primary" name="pattern_^" onClick={() => set_regular_expression_button('pattern_^')}>\: 行の先頭にマッチ</Button>
                            <Button className="regular_expression_pattren_button" variant="outlined" size="small" color="primary" name="pattern_$" onClick={() => set_regular_expression_button('pattern_$')}>\: 行の末尾にマッチ</Button>
                        </div>
                        <div className="option_flag_input_form">
                            <p className="input_regular_expression_title">オプションフラグ</p>
                            <label>
                                <Checkbox name="option_flag_g" checked={option_flag_g} color="default" onClick={(e) => set_regular_expression(e)} size="small" />
                                <span>グローバルサーチ</span>
                            </label>
                            <label>
                                <Checkbox name="option_flag_i" checked={option_flag_i} color="default" onClick={(e) => set_regular_expression(e)} size="small" />
                                <span>大文字・小文字を区別しない検索</span>
                            </label>
                            <label>
                                <Checkbox name="option_flag_m" checked={option_flag_m} color="default" onClick={(e) => set_regular_expression(e)} size="small" />
                                <span>複数行検索</span>
                            </label>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <p className="input_regular_expression_title">代表的な正規表現</p>
                        <details>
                            <summary>
                                <label className="regularExpression_detail row">
                                    <div className="col-md-5">
                                        <Checkbox name="example_regularExpression_postalCode" color="default" checked={example_regularExpression_postalCode} onClick={(e) => set_regular_expression(e)} />
                                        <p>郵便番号</p>
                                    </div>
                                    <div className="col-md-7"><p>{'[0-9]{3}-[0-9]{4}'}</p></div>
                                </label>
                            </summary>
                            <div className="example_regularExpression_explanation">
                                <ul>
                                    <li>[0-9]は0から9の半角数字が一つあることを意味します。</li>
                                    <li>{3}は直前の[0-9]のパターンが３回繰り返されることを意味します</li>
                                    <li>-はハイフンがあることを意味します</li>
                                </ul>
                            </div>
                        </details>

                        <details>
                            <summary>
                                <label className="regularExpression_detail row">
                                    <div className="col-md-5">
                                        <Checkbox name="example_regularExpression_emailAddress" color="default" checked={example_regularExpression_emailAddress} onClick={(e) => set_regular_expression(e)} />
                                        <p>Emailアドレス</p>
                                    </div>
                                    <div className="col-md-7"><p>{'\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*'}</p></div>
                                </label>
                            </summary>
                            <div className="example_regularExpression_explanation">
                                <ul>
                                    <li>\w+は大文字小文字の英数字アンダーバーが１文字以上あることを意味します</li>
                                    <li>([-+.]\w+)*は-,+,.から一文字([-+.])と大文字小文字の英数字アンダーバー(\w)１文字以上(+)によるセット(([-+.]\w+))が0個以上あること(*)を意味しています。</li>
                                    <li>@は@マークがあることを意味しています</li>
                                    <li>\.はドットがあることを意味しています</li>
                                </ul>
                            </div>
                        </details>

                        <details>
                            <summary>
                                <label className="regularExpression_detail row">
                                    <div className="col-md-5">
                                        <Checkbox name="example_regularExpression_url" color="default" checked={example_regularExpression_url} onClick={(e) => set_regular_expression(e)} />
                                        <p>URL</p>
                                    </div>
                                    <div className="col-md-7"><p>{'https?://([\w-]+\.)+[\w-]+(/[\w- .?%&=]*)?'}</p></div>
                                </label>
                            </summary>
                            <div className="example_regularExpression_explanation">
                                <ul>
                                    <li>https?はsが0または1文字あることを意味しますしたがってhttpsでもhttpでも良いということです。(http|https)のような書き方もできます</li>
                                    <li>[\w]は大文字小文字の英数字アンダーバーから１文字ということを意味しています</li>
                                    <li>(/[\w-.?%&=]*)?は/と大文字小文字の英数字アンダーバー(\w)または-,?,%,&,=の中から0文字以上のセット(/[\w- .?%&=]*)が0または1組あることを意味します</li>
                                </ul>
                            </div>
                        </details>
                    </div>
                </div>
            <TextField className="input_str" label="結果" rows={4} variant="outlined" multiline value={result} />
        </div>
    )
}

if (document.getElementById('regularExpression')) {
    ReactDOM.render(<Main />, document.getElementById('regularExpression'));
}