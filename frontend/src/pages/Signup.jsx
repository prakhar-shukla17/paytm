import React, { useState } from "react";
import { Heading } from "../components/Heading.jsx";

export const Signup = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-300">
      <div className="bg-white rounded-lg w-80 h-64 flex justify-center items-center shadow-lg">
        <Heading label="Signup" />
      </div>
    </div>
  );
};