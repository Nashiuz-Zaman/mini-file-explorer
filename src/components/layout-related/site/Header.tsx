import { CompanyLogoBtn } from "@/components/shared/buttons/CompanyLogoBtn";
import { OuterContainer } from "@/components/shared/containers/OuterContainer";

export const Header = () => {
  return (
    <header className="h-16 shrink-0 border-b border-neutral-800">
      <OuterContainer className="flex items-center h-full">
        <CompanyLogoBtn />
      </OuterContainer>
    </header>
  );
};
