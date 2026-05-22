import { ReactNode } from "react";

interface IOuterContainerProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "main";
}

export const OuterContainer = ({
  children,
  className = "",
  as: Component = "section",
}: IOuterContainerProps) => {
  return (
    <Component
      style={{ maxWidth: "2560px" }}
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
};
