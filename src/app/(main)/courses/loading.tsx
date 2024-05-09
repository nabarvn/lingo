import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full py-20">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />

        <div className="flex flex-col items-center gap-1">
          <h3 className="font-semibold text-xl">Processing...</h3>
          <p className="text-zinc-500 text-sm">This won&apos;t take long.</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
