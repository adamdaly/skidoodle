import { ErrorGraphic } from "@/custom/components/error-graphic";
import { H1 } from "@/custom/components/typography";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-[50%]">
        <ErrorGraphic />
      </div>
      <H1 className="mb-4">404</H1>
      <p>Sorry, this animation has skidoddled... or it never existed!</p>
    </div>
  );
}
