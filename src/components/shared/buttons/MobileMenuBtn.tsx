import { MouseEvent } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { HamburgerIcon } from "../icons/HamburgerIcon";

export const MobileMenuBtn = ({
  onClick,
  className = "",
  isMenuOpen = false,
  noToggleState = false,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isMenuOpen: boolean;
  noToggleState?: boolean;
}) => {
  const shouldShowClose = !noToggleState && isMenuOpen;

  return (
    <button
      aria-label="Open Mobile Navigation"
      className={`block ${className}`}
      onClick={onClick}
    >
      {shouldShowClose ? (
        <CloseIcon className="text-3xl" />
      ) : (
        <HamburgerIcon className="text-3xl" />
      )}
    </button>
  );
};
