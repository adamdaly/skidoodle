import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

export function configureAmplifyServer() {
  Amplify.configure(
    outputs,
    { ssr: true } // Enable SSR support
  );
}
