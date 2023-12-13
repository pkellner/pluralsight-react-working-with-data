'use client';
export async function fetchMessage() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  await sleep(1000);
  const json = await response.json();
  console.log(json);
  return json.title;
}