import Header from "./header";
import Footer from "./footer";
import { PropsWithChildren } from "react";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MarketingLayout;
