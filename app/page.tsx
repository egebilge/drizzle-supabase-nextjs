import { AuthButton } from "@/components/auth-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full max-w-screen-lg items-center justify-between p-6">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <AuthButton />
      </div>
    </main>
  );
}
