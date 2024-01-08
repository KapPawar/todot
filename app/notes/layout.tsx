import React from "react";
import NavBar from "./NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="m-auto max-w-7xl p-4"> {children}</main>
    </>
  );
};

export default layout;
