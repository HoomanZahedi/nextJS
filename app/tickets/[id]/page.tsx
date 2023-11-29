import React from "react";

export async function generateStaticParams() {
  const response = await fetch("http://localhost:4000/tickets");
  const data = await response.json();
  return data.map((x: any) => ({
    id: x.id,
  }));
}

const fetchData = async (params: any) => {
  const response = await fetch(`http://localhost:4000/tickets/${params}`, {
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();
  return data;
};

async function TicketId({ params }: any) {
  const resData = await fetchData(params.id);
  return (
    <div>
      {resData.id ? (
        <>
          <h3>{resData.title}</h3>
          <p>{resData.body}</p>
        </>
      ) : (
        <p>no item has been found</p>
      )}
    </div>
  );
}

export default TicketId;
