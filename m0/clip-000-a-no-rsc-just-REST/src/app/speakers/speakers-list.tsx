import React, {useEffect} from "react";
import useSpeakerSortAndFilter from "@/app/speakers/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import {useSpeakerMenuContext} from "@/components/contexts/speaker-menu-context";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import {Speaker} from "@/lib/general-types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SpeakersList({
  speakerList,
  setSpeakerList,
  loadingStatus,
  setLoadingStatus,
  error,
  setError,
  createSpeaker,
  updateSpeaker
}: {
  speakerList: Speaker[];
  setSpeakerList: (speakerList: Speaker[]) => void;
  loadingStatus: string;
  setLoadingStatus: (loadingStatus: string) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
  createSpeaker: (speaker: Speaker) => void;
  updateSpeaker: (speaker: Speaker, completionFunction: () => void) => void;
}) {
  const { searchText } = useSpeakerMenuContext();

  function deleteSpeaker(id: number) {
    async function deleteSpeakerInternal() {
      try {
        const response = await fetch(`/api/speakers/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // Check if the response status is 204 (No Content)
        if (response.status === 204) {
          setSpeakerList(speakerList.filter((speaker: Speaker) => speaker.id !== id));
          return null; // Or a suitable message indicating successful deletion
        } else {
          // If response is not 204, then parse the JSON
          return await response.json();
        }
      } catch (error) {
        console.error("Error deleting speaker:", error);
        throw error;
      }
    }

    deleteSpeakerInternal().then(() => {});
  }

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const response = await fetch("/api/speakers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(1000);
        setSpeakerList(data);
        setLoadingStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error in fetch SpeakersList", err);
          setError(err.message);
        } else {
          console.error("An unexpected error occurred");
          setError("An unexpected error occurred");
        }
        setLoadingStatus("error");
      }
    }
    fetchSpeakers().then(() => {});
  }, []);

  const speakerListFiltered = useSpeakerSortAndFilter(speakerList, searchText);

  if (loadingStatus === "loading") {
    return (
      <>
        {[1, 2, 3, 4, 5].map((item) => {
          return <SpeakerDetailPending key={item} />;
        })}
        <div className="mt-3"></div>
      </>
    );
  }

  if (loadingStatus === "error") {
    return <div className="card">Error: {error}</div>;
  }

  return (
    <>
      {speakerListFiltered.map(function (speakerRec) {
        return (
          <SpeakerDetail
            key={speakerRec.id}
            speakerRec={speakerRec}
            createSpeaker={createSpeaker}
            deleteSpeaker={deleteSpeaker}
            updateSpeaker={updateSpeaker}
          />
        );
      })}
      <div className="mt-3"></div>
    </>
  );
}
