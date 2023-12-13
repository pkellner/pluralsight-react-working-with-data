"use client";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAttendee(id, signal) {
  try {
    console.log("fetchAttendee: starting to fetch data")
    const response = await fetch(`http://localhost:3000/api/attendee/${id}`, {
      signal:signal,
    });

    const randomNumberBetween1000And5000 =
      Math.floor(Math.random() * 4000) + 1000;
    console.log(`Sleeping for ${randomNumberBetween1000And5000}ms`);
    await sleep(randomNumberBetween1000And5000);

    const data = await response.json();
    console.log("fetchAttendee: done fetching data",data);
    return data;
  } catch (e) {
    console.log("fetchAttendee: e:",e);
    throw e;
  }
}

export async function fetchAttendees() {
  const response = await fetch(`http://localhost:3000/api/attendee/`);
  const randomNumberBetween1000And5000 =
    Math.floor(Math.random() * 4000) + 1000;
  console.log(`Sleeping for ${randomNumberBetween1000And5000}ms`);
  await sleep(randomNumberBetween1000And5000);
  const data = await response.json();
  return data.slice(0, 2);
}
