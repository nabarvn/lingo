import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <SignUp path="/sign-up" />
    </main>
  );
}
