import React from 'react';
import styles from './Dropdown.css';

export function Dropdown({ id, label, value, onChange, options }) {
  return (
    <label htmlFor={id}>
      <span>{label}</span>{' '}
      <select className={styles.dropdown} value={value} id={id} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
