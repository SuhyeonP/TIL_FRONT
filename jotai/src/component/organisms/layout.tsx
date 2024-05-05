import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
