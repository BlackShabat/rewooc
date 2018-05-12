import './AutocompleteField.css';
import React from 'react';
import Button from '../../UI/Button/Button';

const AutocompleteField = (props) => {
    return (
        <div className="rw-autocomplete-field">
            <input
                className="rw-autocomplete-field__control"
                type="text"
                placeholder="Enter post title here..."
                onInput={props.onFieldInput}
            />
            <Button
                className="rw-autocomplete-field__button"
                size="md"
                color="secondary"
            >Search</Button>
        </div>
    );
};

export default AutocompleteField;