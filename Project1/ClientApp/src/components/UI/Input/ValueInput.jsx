import React from 'react';
import classes from './ValueInput.module.css';

const ValueInput= (props) =>{
   
        return (
            <div {...props}>
                <label style={{margin:'0.4rem'}}  className="label-form" >{props.children}</label>
                <input
                    type={props.type} 
                    required={props.label}
                    value={props.value}
                    placeholder={props.placeholder}
                    className={classes.valueInput}
                    style={props.style}
                    
                />
                <div className="text-danger">{props.label}</div>
            </div>
        );
    
};

export default ValueInput;