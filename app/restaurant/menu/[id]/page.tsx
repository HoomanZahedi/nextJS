import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fetchMenu = async (params: any) => {
  const menuRes = await prisma.item.findMany({
    where: {
      restaurant_Id: +params.params.id,
    },
  });
  return menuRes;
};

async function RestaurantMenu(props: any) {
  const menu = await fetchMenu(props);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-8">
        {menu.map((x) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg"
            key={x.id}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{x.name}</div>
              <p className="text-gray-700 text-base">{x.description} </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {x.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;
