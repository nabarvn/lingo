import Image from "next/image";
import { Button } from "@/components/ui";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <div className="flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />

          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            Lingo
          </h1>
        </div>

        <ClerkLoading>
          <SignedOut>
            <Button
              disabled
              size="lg"
              className="w-[112px] animate-pulse bg-gray-200 ring ring-border"
            />
          </SignedOut>

          <SignedIn>
            <Button
              disabled
              size="rounded"
              className="h-[40px] w-[40px] animate-pulse bg-gray-200 ring ring-border"
            />
          </SignedIn>
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard: { pointerEvents: "initial" },
                  userButtonAvatarBox: {
                    height: "40px",
                    width: "40px",
                  },
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/learn"
              signUpForceRedirectUrl="/learn"
            >
              <Button size="lg">Login</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
