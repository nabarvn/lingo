import { Fragment, PropsWithChildren } from "react";
import { MobileHeader, Sidebar } from "@/components";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />

      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
      </main>
    </Fragment>
  );
};

export default MainLayout;
