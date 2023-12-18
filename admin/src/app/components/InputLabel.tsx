import React, { ReactNode, MouseEvent } from "react";

interface InputLabelProps {
  forInput?: string;
  value?: string;
  className?: string;
  children?: ReactNode;
  isRequired?: boolean;
  onClick?: (event: MouseEvent<HTMLLabelElement>) => void;
}

const InputLabel: React.FC<InputLabelProps> = ({
  forInput,
  value,
  className = "",
  children,
  isRequired = false,
  onClick,
}) => {
  return (
    <label
      htmlFor={forInput}
      className={`block font-medium text-sm text-gray-700 ${className}`}
      onClick={onClick}
    >
      {value || children}{" "}
      {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default InputLabel;
