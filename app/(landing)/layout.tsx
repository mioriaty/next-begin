import { FC, ReactNode } from "react";

const LandingLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default LandingLayout;
