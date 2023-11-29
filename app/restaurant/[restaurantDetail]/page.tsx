import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();
const fetchResDetails = async (param: any) => {
  const resDetail = await prisma.restaurant.findUnique({
    where: {
      slug: param.params.restaurantDetail,
    },
  });
  if (resDetail) {
    return resDetail;
  } else {
    // throw new Error("wrong item");
    notFound();
  }
};

async function RestaurantDetail(props: any) {
  const resDetails = await fetchResDetails(props);
  return (
    <div className=" p-12">
      {resDetails ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full h-40"
            src={resDetails?.main_Image}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <Link href={`/restaurant/${resDetails?.slug}`}>
              <div className="font-bold text-xl mb-2">{resDetails?.name}</div>
            </Link>
            <p className="text-gray-700 text-base">
              {resDetails?.description}{" "}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {resDetails?.price}
            </span>
          </div>
        </div>
      ) : (
        <h1>no item has been found</h1>
      )}
    </div>
  );
}

export default RestaurantDetail;
