import React, { useState } from 'react';

function ForGenderRadio ({setGender, children}) {
    
    
  
   
    const changeValue=(e)=>{
        setGender(e.target.value);
   }
  
  
        return (
            <div children>
                <div children className={'form-check'}>
                    <input 
                        type="radio" 
                        className='form-check-input'
                        id="maleRadio"
                        value="male"
                        onChange={e=>changeValue(e)}
                        name='gender'
                       
                        aria-checked="false"
                    />
                    <label htmlFor="maleRadio">Мужской</label>
                </div>
                <div className={'form-check'}>
                    <input 
                        type="radio" 
                        className='form-check-input'
                        id="FemaleRadio"
                        value="female"
                        onChange={e=>changeValue(e)}
                        name='gender'
                       
                    />
                <label htmlFor="FemaleRadio">Женский</label>
                </div>
                
                <div className="text-danger">{children}</div>
               
            </div>
            
        );
        
    
    }

export default ForGenderRadio;