import Footer from "@/components/layout-related/site/Footer";
import { Header } from "@/components/layout-related/site/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default SiteLayout;
