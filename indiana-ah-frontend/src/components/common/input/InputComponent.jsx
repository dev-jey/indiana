import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Input } from './Input.jsx';

const InputField = ({
  placeholder,
  width,
  type,
  id,
  value,
  errorMessage,
  handleChange,
  onBlur,
  margin,
  wrapper,
  name,
  label
}) => (
  <div className={wrapper || 'input-field'}>
    <label htmlFor={name}>{label}</label>
    <Input
      inputWidth={width}
      id={id}
      name={name}
      type={type}
      value={value}
      margin={margin}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={onBlur}
      required
    />
    {<Form.Text className="text-danger ml-3">{errorMessage}</Form.Text>}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string,
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  width: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  margin: PropTypes.string,
  wrapper: PropTypes.string,
  name: PropTypes.string
};
export default InputField;
