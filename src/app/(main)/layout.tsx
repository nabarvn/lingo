import { Fragment, PropsWithChildren } from "react";
import { MobileHeader, Sidebar } from "@/components";

const MainLayout = ({ children }: PropsWithChildren) => (
  <Fragment>
    <MobileHeader />
    <Sidebar className="hidden md:flex" />

    <main className="h-full pt-[60px] md:pl-[225px] lg:pl-[256px] md:pt-0">
      <div className="mx-auto h-full max-w-[1056px]">{children}</div>
    </main>
  </Fragment>
);

export default MainLayout;
