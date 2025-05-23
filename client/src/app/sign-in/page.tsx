import { SignInForm } from "./_components/form";

export default async function Page() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-[100px] md:h-auto bg-black"></div>
      <div className="w-full md:w-1/2 h-auto pl-[10%] pr-[10%] flex items-center">
        <div className="w-full max-w-[600px]">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
