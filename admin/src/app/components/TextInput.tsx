import { ChangeEvent, KeyboardEvent  } from "react";

type TextInputProps = {
  name?: string;
  id?: string;
  type?: string;
  className?: string;
  value?: string;
  autoComplete?: string;
  required?: boolean;
  placeHolder?: string;
  readOnly?: boolean;
  handleChange?(event: ChangeEvent<HTMLInputElement>): void;
  handleKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  messages?: string;
};
const TextInput = ({
  id,
  type,
  name,
  className,
  autoComplete,
  required,
  placeHolder,
  readOnly,
  handleChange,
  handleKeyDown,
  value,
  messages,
}: TextInputProps) => {
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        readOnly={readOnly}
        className={`border border-gray-300 py-2 px-2
          focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600
          rounded-md shadow-md ${className}`}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <span className="text-red-400">{messages}</span>
    </>
  );
};
export default TextInput;
