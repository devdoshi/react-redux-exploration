import React, {PropTypes} from 'react';
const onClickHelper = (onClick) => (e) => {
	e.preventDefault();
	onClick();
};
const FormButton = ({label, onClick, disabled}) => {
	return (
		<button
			onClick={onClickHelper(onClick)}
		    disabled={disabled}
		>{label}</button>
	);
};

FormButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default FormButton;