"use client";
import {useEffect, useState, useOptimistic, startTransition} from "react";

export default function SpeakerOptimisticUpdate() {
  const [speakerList, setSpeakerList] = useState([]);

  const [optimisticSpeakerList, setOptimisticSpeakerList] =
    useOptimistic(speakerList);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/speakers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("SpeakerOptimisticUpdate: data", data);
      setSpeakerList(data);
      console.log("optimisticSpeakerList", optimisticSpeakerList);
    };
    fetchData().then(() => {});
  }, []);

  // console.log("SpeakerOptimisticUpdate: speakerList", speakerList);
  // console.log(
  //   "SpeakerOptimisticUpdate: optimisticSpeakerList",
  //   optimisticSpeakerList,
  // );

  // return (
  //   <div>{JSON.stringify(speakerList)}<hr/><hr/>{JSON.stringify(optimisticSpeakerList)}</div>
  // )

  return (
    <div>
      <ul>
        {optimisticSpeakerList.map(({ id, firstName, lastName, favorite }) => {
          return (
            <li key={id}>
              <h4>
                {firstName} {lastName}
              </h4>
              <button
                onClick={() => {
                  const toggledSpeakerRec = {
                    ...speakerList.find((rec) => rec.id === id),
                    favorite: !favorite,
                  };

                  const newOptimisticSpeakerList = optimisticSpeakerList.map(
                    (rec) => (rec.id === id ? {...toggledSpeakerRec, lastName: toggledSpeakerRec.lastName + " updating..."} : rec),
                  );

                  startTransition(() => {
                    setOptimisticSpeakerList(newOptimisticSpeakerList);
                  });


                  fetch(`/api/speakers/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(toggledSpeakerRec),
                  }).then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
                    const newSpeakerList = speakerList.map((rec) =>
                      rec.id === id ? toggledSpeakerRec : rec,
                    );
                    setSpeakerList(newSpeakerList);
                    return response.json();
                  });
                }}
              >
                {favorite ? "Remove from favorites" : "Add to favorites"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
