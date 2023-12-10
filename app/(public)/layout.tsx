import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-400 flex justify-center align-middle items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
