import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

type Status = "correct" | "wrong" | "none" | "completed";

type FooterProps = {
  onCheck: () => void;
  status: Status;
  disabled?: boolean;
  lessonId?: number;
};

const Footer = ({ onCheck, status, disabled, lessonId }: FooterProps) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn("h-[100px] lg:-h[140px] border-t-2", {
        "border-transparent bg-green-100": status === "correct",
        "border-transparent bg-rose-100": status === "wrong",
      })}
    >
      <div className="flex items-center justify-between max-w-[1140px] h-full mx-auto px-6 lg:px-10">
        {status === "correct" && (
          <div className="flex items-center text-green-500 font-bold text-base lg:text-2xl">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Nicely done!
          </div>
        )}

        {status === "wrong" && (
          <div className="flex items-center text-rose-500 font-bold text-base lg:text-2xl">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try again.
          </div>
        )}

        {status === "completed" && (
          <Button
            size={isMobile ? "sm" : "lg"}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Practice again
          </Button>
        )}

        <Button
          onClick={onCheck}
          className="ml-auto"
          disabled={disabled}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
