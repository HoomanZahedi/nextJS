"use client";
import { useRouter } from "next/navigation";
import React from "react";

function MenuBtn({ id }: any) {
  const router = useRouter();
  const showMenu = (id: any) => {
    router.push(`/restaurant/menu/${id}`);
  };
  return (
    <span
      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
      onClick={() => showMenu(id)}
    >
      Menu
    </span>
  );
}

export default MenuBtn;
