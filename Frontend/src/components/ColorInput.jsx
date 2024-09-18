import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import ColorIcon from './assets/colorPick.png'
const ColorInputWrapper = styled.div`
  position: absolute;
  display:flex;
  flex-direction: row-reverse;
  top: 15px;
  right: 15px;
  z-index: 10;
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};;
  width:70px;
  padding: 5px;
  border-radius: 5px;
  opacity: 0;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;

  &:hover {
 background-color:  ${({ backgroundColor }) => backgroundColor || 'white'};
    opacity: 1;
    visibility: visible;
    transform: scale(1.1);
  }
`;
const HiddenColorInput = styled.input`
   opacity: 0; 
  width: 0;
  height: 0;
  position: absolute;
  top: -15px; 
  left: 100px;
`;
const ColorPickerIcon = styled.img`
width:30px;
cursor:pointer;
`;
const ColorInput = ({ mountBgColor, onColorChange }) => {
  const [bgColor, setBgColor] = useState(mountBgColor);
  const colorInputRef = React.useRef(null)
  useEffect(() => {
    if (mountBgColor) {
      setBgColor(mountBgColor);
    }
  }, [mountBgColor]);

  const handleIconClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click(); // Trigger the hidden color input click
    }
  };

  const handleColorChange = (event) => {
    const color = event.target.value
    onColorChange(color);
    setBgColor(color)
  };

  return (
    <ColorInputWrapper
      style={{ backgroundColor: bgColor }}>
      <HiddenColorInput
        ref={colorInputRef}
        type="color"
        style={{ borderColor: bgColor }}
        onChange={handleColorChange}
      />
      <ColorPickerIcon
        src={ColorIcon}
        alt="Color Picker"
        onClick={handleIconClick} />
    </ColorInputWrapper>

  );
};

export default ColorInput;