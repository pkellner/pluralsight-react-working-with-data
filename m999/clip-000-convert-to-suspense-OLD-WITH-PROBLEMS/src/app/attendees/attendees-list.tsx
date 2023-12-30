import React, { Suspense, use } from "react";
import { useAttendeeMenuContext } from "@/components/contexts/attendee-menu-context";
import useAttendeeSortAndFilter from "@/app/attendees/use-attendee-sort-and-filter";
import { useAttendeeDataContext } from "@/components/contexts/attendee-data-context";
import { Attendee } from "@/lib/general-types";
import { AttendeeDetailWithSuspense } from "@/app/attendees/attendee-detail-with-suspense";

export default function AttendeesList() {
  return (
    <div className="container-fluid">
      <Suspense fallback={<div>Loading Suspense Boundary</div>}>
        <AttendeesListInternal />
      </Suspense>
    </div>
  );
}

function AttendeesListInternal() {
  const { searchText } = useAttendeeMenuContext();

  const {
    updateAttendee,
    createAttendee,
    deleteAttendee,
    attendeeList,
    setAttendeeList,
    getAttendeeListPromise,
  } = useAttendeeDataContext();

  // ts-ignore
  const attendeeListPromise = getAttendeeListPromise() as Promise<Attendee[]>;
  const attendeeListTemp = use(attendeeListPromise);

  //return <div>{JSON.stringify(attendeeListTemp)}</div>;

  //setAttendeeList(attendeeListTemp);

  const attendeeListFiltered = useAttendeeSortAndFilter(
    attendeeListTemp,
    searchText,
  );

  // if (loadingStatus === "loading") {
  //   return (
  //     <>
  //       {[1, 2, 3, 4, 5].map((item) => {
  //         return <AttendeeDetailPending key={item} />;
  //       })}
  //       <div className="mt-3"></div>
  //     </>
  //   );
  // }
  //
  // if (loadingStatus === "error") {
  //   return <div className="card">Error: {error}</div>;
  // }

  return (
    <>
      {/* Headers */}
      <div className="col-12">
        <div className="card border-0">
          <div className="row g-2 align-items-center border-bottom">
            {/* For xs screens, each takes 1/3 of the width; adjusted for md screens */}
            <div className="col-2 col-md-1">Action</div>{" "}
            {/* Header for the new button column */}
            {/* For xs screens, each takes 1/3 of the width; adjusted for md screens */}
            <div className="col-6 col-md-3">Name / Email</div>
            {/* Hidden on xs screens, visible and adjusted on md and larger */}
            <div className="col-md-3 d-none d-md-block">
              Date Created {/* Assuming this is the header for Date Created */}
            </div>
            {/* Hidden on xs screens, visible and adjusted on md and larger */}
            <div className="col-md-2 d-none d-md-block">
              ID {/* Assuming this is the header for ID */}
            </div>
            {/* For xs screens, each takes 1/3 of the width; adjusted for md screens */}
            <div className="col-4 col-md-3">Operations</div>
          </div>
        </div>
      </div>

      {/* Mapping over attendeeListFiltered */}
      {attendeeListFiltered
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
        .map(function (attendeeRec) {
          return (
            <div className="col-12" key={attendeeRec.id}>
              <div className="card border-0 h-100">
                <AttendeeDetailWithSuspense attendeeRec={attendeeRec} />
                {/*<AttendeeDetail*/}
                {/*  attendeeRec={attendeeRec}*/}
                {/*  createAttendee={createAttendee}*/}
                {/*  deleteAttendee={deleteAttendee}*/}
                {/*  updateAttendee={updateAttendee}*/}
                {/*/>*/}
              </div>
            </div>
          );
        })}
      <div className="mt-3"></div>
    </>
  );
}
