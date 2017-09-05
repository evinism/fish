import React from 'react';

export default (props) => {
  let x = Math.max(Math.min(props.x, 100), 0);
  let y = Math.max(Math.min(props.y, 100), 0);
  return (
    <div className='fishInstance' style={{
      top: x + '%',
      left: y + '%',
    }} />
  );
};
