import { PropsWithChildren } from "react";

const StickyWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="sticky bottom-6 hidden w-[368px] self-end lg:block">
      <div className="sticky top-6 flex flex-col min-h-[calc(100svh-48px)] gap-y-4">
        {children}
      </div>
    </div>
  );
};

export default StickyWrapper;
