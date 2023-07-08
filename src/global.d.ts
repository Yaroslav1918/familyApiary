
declare global {
  const google: typeof import("google-one-tap");
}
declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const content: string;
  export default content;
}
