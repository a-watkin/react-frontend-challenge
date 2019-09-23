import React from 'react';

const Button = (props) => {
  return (
    <span className={`hover-pointer`} onClick={props.handleClick} >
      <span className={props.btnStyle}
        value={props.value}
      >
      </span>
      <span className={`btn-text ${props.highlight}`}>{props.value}</span>
    </span >
  )
}

export default Button
