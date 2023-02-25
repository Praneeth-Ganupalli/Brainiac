import React from 'react'

function DropDown({options,onSelect}) {
    const changeDropDownVal=(e)=>{
        onSelect(e.target.value);
    }
  return (
    <select className='form-control form-select mt-2' onChange={changeDropDownVal} >
        {options.length>0 && options.map(option=>{
            return <option key={option.key} value={option.value}>{option.key}</option>
        })}
    </select>
  )
}

export default React.memo(DropDown)