"use client";

export default function DeleteSpeakerButton({ id }: { id: number }) {

  function deleteSpeaker(id: number) {
    async function deleteSpeaker() {
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

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error deleting speaker:", error);
        throw error;
      }
    }
    deleteSpeaker().then(() => {});
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        const confirmed = confirm(
          "Are you sure you want to delete this speaker?",
        );
        if (confirmed) {
          deleteSpeaker(id);
        }
      }}
      className="btn btn-danger btn-sm"
    >
      <i className="fa fa-trash"></i>
      {" Delete "}
    </button>
  );
}
