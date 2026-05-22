import { Header } from "@/components/layout-related/site/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default SiteLayout;
