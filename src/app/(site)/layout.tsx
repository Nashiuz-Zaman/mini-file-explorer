import Footer from "@/components/layout-related/site/Footer";
import { Header } from "@/components/layout-related/site/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col w-full">
      <Header />
      <main className="h-full overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
