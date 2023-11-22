"use client";
import { useRouter } from "next/navigation";
import React from "react";

function McDonald() {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/");
  };
  return (
    <div>
      <p className="text-teal-400">welcome to McDonald restaurant</p>
      <button
        onClick={handleRoute}
        className="bg-blue-500 hover:bg-blue-700 text-white"
      >
        route to Home
      </button>
    </div>
  );
}

export default McDonald;
