import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import {
  ConfessFormChangeHandler,
  ConfessFormData,
  Reason,
} from "../../types/confess.types";

type Option = { display: string; value: Reason };

export interface SelectProps {
  id: string;
  name: keyof ConfessFormData;
  options: Option[];
  label: string;
  value: string;
  onChangeHandler: ConfessFormChangeHandler;
  validate: (value: string) => string[];
}

export const SelectInput: React.FC<SelectProps> = ({
  id,
  name,
  options,
  label,
  onChangeHandler,
  value,
  validate,
}) => {
  const [touched, setTouched] = useState(false);

  const validationErrors = validate(value);

  return (
    <>
      <div className="form__field">
        <label htmlFor={name} className="form__label">
          {label}:
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => {
            setTouched(true);
            onChangeHandler(e.target.value, name);
          }}
        >
          {options.map((o, index) => (
            <option key={`select-${name}-o-${index}`} value={o.value}>
              {o.display}
            </option>
          ))}
        </select>
      </div>
      {touched && <ErrorMessage name={name} messages={validationErrors} />}
    </>
  );
};
