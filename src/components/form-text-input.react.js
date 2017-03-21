import React, {PropTypes} from 'react';

const onChangeHelper = (onChange) => (e) => {
	const value = e.target.value;
	onChange(value);
};

const FormTextInput = ({value, placeholder, onChange, disabled}) => {
	return (
		<input
			type="text"
			value={value}
			placeholder={placeholder}
			onChange={onChangeHelper(onChange)}
			disabled={disabled}
		/>
	);
};

FormTextInput.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
	disabled: PropTypes.bool,
};

export default FormTextInput;