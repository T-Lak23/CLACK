import { SignInButton } from "@clerk/clerk-react";
const AuthPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SignInButton mode="modal">
        <button className="px-4 py-3 rounded-lg bg-blue-500 font-semibold text-white cursor-pointer">
          Join Now
        </button>
      </SignInButton>
    </div>
  );
};

export default AuthPage;
