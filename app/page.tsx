import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import MenuBtn from "./components/menuBtn";
import SelectBox from "./components/selectBox";

const prisma = new PrismaClient();
const fetchRestaurant = async () => {
  const restaurant = await prisma.restaurant.findMany();
  return restaurant;
};

export default async function Home() {
  const restaurantList = await fetchRestaurant();

  return (
    <main>
      <SelectBox data={restaurantList} />
      <div className="grid grid-cols-4 gap-4 p-8">
        {restaurantList.map((x) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg"
            key={x.id}
          >
            <img
              className="w-full h-40"
              src={x.main_Image}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <Link href={`/restaurant/${x.slug}`}>
                <div className="font-bold text-xl mb-2">{x.name}</div>
              </Link>
              <p className="text-gray-700 text-base">{x.description} </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {x.price}
              </span>
              <MenuBtn id={x.id} />
              {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
