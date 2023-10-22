import React from 'react';

const Input = ({ id, type, placeholder, value, onChange, error }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );    
};

export default Input;
