import * as React from 'react';

type Props = {
    className?: string;
    name: string;
    value: any;
    onClick: any;
    option: string;
    state?: any;
}

export var CheckBox: React.FC<Props> = ({className = '', name, value, onClick, option, state = null}) => {
    return(
        <label className={className}>
            <input type="checkbox" name={name} value={value} onClick={onClick} checked={state === 1 ? true: false}/>&nbsp;
            <span>{option}</span>
        </label>
    )
}