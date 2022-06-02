import React from "react";
import InputMask from 'react-input-mask';

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

export const MaskedInput = ({ mask, name, value, onChange }) => {

    const handleChange = (event) => {
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
