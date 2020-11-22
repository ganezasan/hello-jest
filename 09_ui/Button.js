import React, { useState } from 'react';

export default function Button({ isToggle = true }) {
  const [isToggleOn, setIsToggleOn] = useState(isToggle);

  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white'
  };

  return (
    <button onClick={() => setIsToggleOn(!isToggleOn)} style={buttonStyle}>
      { isToggleOn ? 'ON' : 'OFF' }
    </button>
  );
}
