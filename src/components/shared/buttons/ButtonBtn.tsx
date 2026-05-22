"use client";

import { ReactNode, MouseEvent } from "react";
import { LoadingIcon } from "../icons/LoadingIcon";

interface IButtonBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  iconClassName?: string;
}

export const ButtonBtn = ({
  children,
  onClick,
  className = "",
  isLoading = false,
  iconClassName = "",
  type = "button",
  disabled,
  ...props
}: IButtonBtnProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (type !== "submit") e.preventDefault();

    onClick?.(e);
  };

  const allClasses = `
    focus:outline-none border border-transparent flex items-center justify-center w-max
    transition-all rounded-2xl text-center
    cursor-pointer active:scale-95
    disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed
    relative gap-2
    px-8 py-4
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={!disabled && !isLoading ? handleClick : undefined}
      disabled={disabled || isLoading}
      className={allClasses}
      style={{ backfaceVisibility: "hidden" }}
      {...props}
    >
      <span
        className={`w-full capitalize flex items-center justify-center gap-[inherit] ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </span>

      {isLoading && (
        <LoadingIcon
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl ${iconClassName}`}
        />
      )}
    </button>
  );
};
