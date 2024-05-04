import { Fragment, PropsWithChildren } from "react";
import { MobileHeader, Sidebar } from "@/components";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <MobileHeader />
      <Sidebar className="hidden md:flex" />

      <main className="h-full pt-[50px] md:pl-[256px] md:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
      </main>
    </Fragment>
  );
};

export default MainLayout;
