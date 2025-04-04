import { RegisterForm } from "./_components/form";

export default function Register() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-[100px] md:h-auto bg-black"></div>
      <div className="w-full md:w-1/2 h-auto pl-[10%] pr-[10%] flex items-center">
        <div className="w-full max-w-[600px]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
