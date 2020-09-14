import React from 'react';
import { colors } from '../colors';
const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button {...props} style={{ backgroundColor: colors.themeOne.lightGrey }}>
      {children}
    </button>
  )
}
export default Button;