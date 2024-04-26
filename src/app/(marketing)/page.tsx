import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="mx-auto flex flex-1 flex-col w-full max-w-screen-lg items-center justify-center gap-2 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image fill src="/hero.svg" alt="Hero" />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
          Learn, refine, and master your language skills with Lingo.
        </h1>

        <div className="flex flex-col w-full max-w-[330px] items-center gap-y-3">
          <ClerkLoading>
            <SignedOut>
              <div className="flex flex-col gap-y-3">
                <div className="h-[48px] w-[330px] animate-pulse bg-gray-200 ring ring-border rounded-xl" />

                <div className="h-[48px] w-[330px] flex items-center justify-center ring ring-border rounded-xl">
                  <div className=" h-5 w-56 animate-pulse bg-gray-200 rounded-xl" />
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="h-[48px] w-[330px] animate-pulse bg-gray-200 ring ring-border rounded-xl" />
            </SignedIn>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/learn"
                signInForceRedirectUrl="/learn"
              >
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>

              <SignInButton
                mode="modal"
                forceRedirectUrl="/learn"
                signUpForceRedirectUrl="/learn"
              >
                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
