import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import flowers from "../../../public/flowers.jpg";
// import rose from "../../../public/rose.jpg";

const fetchTickets = async () => {
  const response = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 20,
    },
  });
  return response.json();
  //   if (status === 200) {
  //     return data;
  //   }
};

async function Ticket() {
  const resTickets = await fetchTickets();
  return (
    <main>
      <ul>
        {resTickets.map((t: any) => (
          <div key={t.id} style={{ marginBottom: "1rem" }}>
            <Image
              src={t.img}
              width={450}
              height={380}
              alt={t.title}
              sizes="(min-width: 808px) 50vw, 100vw"
            />
            <li>
              <Link href={"/tickets/" + t.id}>title: {t.title}</Link>
            </li>
            <li
              style={
                t.priority === "low"
                  ? { color: "green" }
                  : t.priority === "medium"
                  ? { color: "#d7b612" }
                  : { color: "red" }
              }
            >
              body: {t.body}
            </li>
          </div>
        ))}
      </ul>
    </main>
  );
}

export default Ticket;
