import React from "react";
import InputMask from 'react-input-mask';

const onlyNumbers = (str:any) => str.replace(/[^0-9]/g, '');

export const MaskedInput = ({ mask, name, value, onChange }:any) => {

    const handleChange = (event:any) => {
        onChange && onChange({
            ...event,
            target: {
                ...event.target,
                name,
                value: onlyNumbers(event.target.value)
            }
        });
    };

    return (
        <InputMask
            name={name}
            mask={mask}
            value={value}
            onChange={handleChange}
        />
    );
};
