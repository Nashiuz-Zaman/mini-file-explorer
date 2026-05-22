import { CloseIcon } from "../icons/CloseIcon";

export const CloseBtn = ({
  onClick,
  className = "",
  title = "Close",
}: {
  onClick?: () => void;
  className?: string;
  title?: string;
}) => {
  return (
    <button
      type="button"
      title={title}
      aria-label="Close button"
      className={`ml-auto w-max block text-3xl cursor-pointer ${className}`}
      onClick={onClick}
    >
      <CloseIcon className="text-inherit [font-size:inherit]" />
    </button>
  );
};
