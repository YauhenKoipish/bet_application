import React, { forwardRef } from "react";

type onChangeType = (
  e: React.ChangeEvent<HTMLInputElement> | string,
  callBackParams?: any
) => any;

interface Input {
  onChange: onChangeType;
  styleClass?: string;
  callBackParams: any;
  type?: string;
  name?: string;
  className?: string;
  typeComponent?: number;
  placeholder?: string;
  placeholderClass?: string;
  active?: boolean;
}

export type Ref = HTMLInputElement;

// 1 default only input
// 2 add area name || default

const Input = forwardRef<Ref, Input>((props, ref) => {
  const {
    onChange,
    callBackParams,
    type,
    name,
    className,
    typeComponent,
    styleClass,
    placeholder,
    placeholderClass,
    active
  } = props;
  return (
    <div className={`${className ? className : ""}`}>
      <input
        ref={ref}
        onChange={e => onChange(e.target.value, callBackParams)}
        type={type ? type : "text"}
        checked={active}
        placeholder={placeholder}
        className={`${styleClass}`}
      />
      {typeComponent === 2 && (
        <span className={placeholderClass ? placeholderClass : ""}>{name}</span>
      )}
    </div>
  );
});

export default Input;
