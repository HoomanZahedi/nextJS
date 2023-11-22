export async function fetchCars(start: number, count: number) {
  const headers = {
    "X-RapidAPI-Key": "cf2bf6d4f2msh3d5c16f6e46a642p1e231bjsn9a2ab0a3fec9",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${count}`
  );
  const cars = await response.json();
  return cars;
}
