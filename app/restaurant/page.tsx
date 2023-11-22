import Link from "next/link";
import React from "react";

function Restaurant() {
  return (
    <div>
      <p className="text-sky-700 text-sm">list of restaurants</p>
      <Link href="detail/reserve">reserve restaurant</Link>
    </div>
  );
}

export default Restaurant;
