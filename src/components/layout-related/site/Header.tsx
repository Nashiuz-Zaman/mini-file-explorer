import { CompanyLogoBtn } from "@/components/shared/buttons/CompanyLogoBtn";
import { OuterContainer } from "@/components/shared/containers/OuterContainer";

export const Header = () => {
  return (
    <div className="h-20 border-b border-neutral-800 flex-center">
      <OuterContainer>
        <CompanyLogoBtn />
      </OuterContainer>
    </div>
  );
};
