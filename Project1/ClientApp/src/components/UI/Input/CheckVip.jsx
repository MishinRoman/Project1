import React from 'react';

const CheckVip = (props) => {
    return (
        <div {...props} className='form-check mt-2 mb-2'>
        <label className='form-check-label' htmlFor="ChVip">{props.label}</label>
        <input className='form-check-input' type={'checkbox'} checked={props.checked} onChange={props.onChange} id="ChVip"/>

    </div>
    );
};

export default CheckVip;