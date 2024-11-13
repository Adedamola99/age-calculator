import React from 'react';

interface InputProps {
    name: string;
    age: string | number;
    onNameChange: (value: string) => void;
    onAgeChange: (value: string | number) => void;
}

const InputField: React.FC<InputProps> = ({ name, age, onNameChange, onAgeChange }) => {
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onNameChange(event.target.value); // Update name in `App`
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? '' : Number(event.target.value); // Converts to number if not empty
        onAgeChange(value); // Update age in `App`
    };

    return (
        <div className='input-box'>
            <input 
                type="text" 
                value={name} 
                onChange={handleNameChange}
                className='input-field'
                placeholder='Enter your name'
            />
            <input 
                type="number" 
                value={age || ''} 
                onChange={handleAgeChange}
                className='input-field'
                placeholder='Enter your age'
            />
        </div>
    );
};

export default InputField;
