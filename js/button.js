import React from 'react';

const Button = ({
    action,
    active,
    icon,
    onClick,
    text,
}) => (
    <div
        className={`button ${action}`}
        onClick={active ? onClick : null}
        style={active ? {opacity: '1'} : {opacity: '0.5'}}
    >
        {icon ?
            <i className={icon} aria-hidden="true"></i>
            :
        text}
    </div>
)

export default Button;
