"use client";
export async function fetchMessage(id) {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //const response = await fetch(`/api/attendee/${id}`);
  const response = await fetch(`http://localhost:3000/api/attendee/${id}`);
  const randomNumberBetween1000And5000 =
    Math.floor(Math.random() * 4000) + 1000;
  console.log(`Sleeping for ${randomNumberBetween1000And5000}ms`);
  await sleep(randomNumberBetween1000And5000);
  const json = await response.json();
  console.log("fetchMessage:" + id + " " + json.email);
  return JSON.stringify(json, null, 2);
}
