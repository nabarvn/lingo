"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

import { Button } from "@/components/ui";
import { useHeartsModal } from "@/store/use-hearts-modal";

const HeartsModal = () => {
  const router = useRouter();
  const { isOpen, close } = useHeartsModal();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  const onClick = () => {
    close();
    router.push("/shop");
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_bad.svg" alt="Mascot" height={80} width={80} />
          </div>

          <DialogTitle className="text-center font-bold text-2xl">
            You ran out of hearts!
          </DialogTitle>

          <DialogDescription className="text-center text-base self-center w-5/6">
            Get Pro for unlimited hearts, or purchase them in the shop.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>

            <Button
              size="lg"
              variant="primaryOutline"
              className="w-full"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartsModal;
