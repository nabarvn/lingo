import { PropsWithChildren } from "react";

const StickyWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="sticky bottom-6 hidden min-h-[calc(100svh-48px)] lg:w-[256px] xl:w-[368px] self-end md:block">
      <div className="sticky top-6 flex flex-col gap-y-4">{children}</div>
    </div>
  );
};

export default StickyWrapper;
