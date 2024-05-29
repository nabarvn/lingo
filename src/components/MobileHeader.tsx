import { MobileSidebar } from "@/components";

const MobileHeader = () => (
  <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-green-500 px-6 md:hidden">
    <MobileSidebar />
  </nav>
);

export default MobileHeader;
