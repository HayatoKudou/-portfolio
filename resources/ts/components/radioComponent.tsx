import * as React from 'react';

type Props = {
    className?: string;
    name: string;
    value: string;
    onClick: any;
    option: string;
    state?: any;
}

export var Radio: React.FC<Props> = ({className = '', name, value, onClick, option, state = null}) => {
    return(
        <label className={className}>
            <input type="radio" name={name} value={value} onClick={onClick} checked={state === value ? true: false}/>
            <span>{option}</span>
        </label>
    )
}