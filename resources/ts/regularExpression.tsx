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

    //オプションフラグ
    const [option_flag, set_option_flag] = useState('');
    const [option_flag_g, set_option_flag_g] = useState(false);
    const [option_flag_i, set_option_flag_i] = useState(false);
    const [option_flag_m, set_option_flag_m] = useState(false);

    //正規表現実行
    function run_regular_expression(customRegularEexpression: string, str: string = ''){
        const regexp = new RegExp(customRegularEexpression, option_flag);
        const matchStr = str == '' ? input_str.match(regexp) : str.match(regexp);
        console.log(regexp);
        console.log(matchStr);
        if(matchStr !== null){
            matchStr.forEach(value =>
                setResult(value)
            )
        } else {
            setResult('');
        }
    }

    function set_regular_expression(e: any){

        var value: string = e.target.value;
        var name: string = e.target.name;
        var checked: boolean = e.target.checked;

        if(name === 'input_str'){
            customRegularEexpression = custom_regular_expression;
            setInputStr(value);
            run_regular_expression(customRegularEexpression, value);
            return;
        } else if(name === 'custom_regular_expression'){
            customRegularEexpression = value;
            setCustomRegularRxpression(value);
        } else if(name === 'example_regularExpression_postalCode'){
            customRegularEexpression = checked === true ? '[0-9]{3}-[0-9]{4}' : '';
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_postalCode(checked);
        } else if(name === 'example_regularExpression_emailAddress'){
            customRegularEexpression = checked === true ? '^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}' : '';
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_emailAddress(checked);
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
        customRegularEexpression = custom_regular_expression + target_name;
        setCustomRegularRxpression(custom_regular_expression + target_name);
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
                        <div className="regular_expression_pattren_button_form">
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('/')}>\: 次の文字をエスケープ</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^')}>^: 行の先頭にマッチ</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('$')}>$: 行の末尾にマッチ</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[A-Za-z]')}>[A-Za-z]: アルファベット</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[ぁ-ん]')}>[ぁ-ん]: ひらがな</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[ァ-ヴ]')}>[ァ-ヴ]: カタカナ</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('ABC')}>ABC: 「ABC」という文字列にマッチ</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[ABC]')}>[ABC]: A,B,Cのいずれか１文字にマッチ</Button>
                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[^ABC]')}>[^ABC]: A,B,C以外のいずれか１文字にマッチ</Button>
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
                                    <div className="col-md-4">
                                        <Checkbox name="example_regularExpression_postalCode" color="default" checked={example_regularExpression_postalCode} onClick={(e) => set_regular_expression(e)} />
                                        <p>郵便番号</p>
                                    </div>
                                    <div className="col-md-8 regularExpression_detail_display"><p>{'[0-9]{3}-[0-9]{4}'}</p></div>
                                </label>
                            </summary>
                            <div className="example_regularExpression_explanation">
                                <ul>
                                    <li>{'[0-9]は0から9の半角数字が一つあることを意味します。'}</li>
                                    <li>{'{3}は直前の[0-9]のパターンが３回繰り返されることを意味します'}</li>
                                    <li>{'-はハイフンがあることを意味します'}</li>
                                </ul>
                            </div>
                        </details>
                        <details>
                            <summary>
                                <label className="regularExpression_detail row">
                                    <div className="col-md-4">
                                        <Checkbox name="example_regularExpression_emailAddress" color="default" checked={example_regularExpression_emailAddress} onClick={(e) => set_regular_expression(e)} />
                                        <p>Emailアドレス</p>
                                    </div>
                                    <div className="col-md-8 regularExpression_detail_display"><p>{'^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}'}</p></div>
                                </label>
                            </summary>
                            <div className="example_regularExpression_explanation">
                                <ul>
                                    <li>{'^[A-Za-z0-9]{1}は、アルファベット小文字/大文字/数字を許可しています。'}</li>
                                    <li>{'[A-Za-z0-9_.-]*は、アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを許可しています。(0文字以上)'}</li>
                                    <li>{'@{1}は、連続してはいけないことを意味しています。'}</li>
                                    <li>{'[A-Za-z0-9_.-]{1,}は、アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを許可しています。(1文字以上)'}</li>
                                    <li>{'\.[A-Za-z0-9]{1,}$は、アルファベット小文字/大文字/数字を許可しています。(1文字以上)'}</li>
                                </ul>
                            </div>
                        </details>
                    </div>
                </div>
            <TextField className="result_form" label="結果" rows={4} variant="outlined" multiline value={result} />
        </div>
    )
}

if (document.getElementById('regularExpression')) {
    ReactDOM.render(<Main />, document.getElementById('regularExpression'));
}