import React from 'react';
import styles from './RadioInput.module.scss';

interface RadioInputProps {
    checked: boolean;
    label: string;
    onChange: () => void;
}

const RadioInput: React.FC<RadioInputProps> = ({ checked, label, onChange }) => {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={label} className={styles.label}>
                <input id={label} type="radio" checked={checked} onChange={onChange} className={styles.radioInputWrapper} />
                {label}
            </label>
        </div>
    );
};

export default RadioInput;
