import * as React from 'react';
import { useState } from 'react';

type Props = {
    className?: string;
    name: string;
    value: any;
    onClick: any;
    option: string;
    state?: any;
}

export const CheckBox: React.FC<Props> = ({className = '', name, value, onClick, option, state = null}) => {
    const [checked, setChecked] = useState(state);
    //onChangeはエラー回避のためのダミー
    function checkedManagement(state: boolean){
        if(state){
            setChecked(false);
        } else {
            setChecked(true);
        }
    }
    return(
        <label className={className}>
            <input type="checkbox" name={name} value={value} onClick={onClick} onChange={() => checkedManagement(state)} checked={state} />&nbsp;
            <span>{option}</span>
        </label>
    )
}