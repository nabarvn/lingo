import { Button } from "@/components/ui";
import { MobileSidebar, RepoStar } from "@/components";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";

const MobileHeader = () => (
  <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center justify-between border-b bg-green-500 px-6 md:hidden">
    <MobileSidebar />

    <div className="flex gap-4">
      <RepoStar />

      <ClerkLoading>
        <SignedIn>
          <Button
            disabled
            size="rounded"
            className="h-[36px] w-[36px] animate-pulse bg-gray-200 ring ring-border"
          />
        </SignedIn>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonPopoverCard: {
                  pointerEvents: "initial",
                  width: "300px",
                },
                userButtonAvatarBox: {
                  height: "36px",
                  width: "36px",
                },
              },
            }}
          />
        </SignedIn>
      </ClerkLoaded>
    </div>
  </nav>
);

export default MobileHeader;
