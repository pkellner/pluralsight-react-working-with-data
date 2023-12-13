import React from "react";

export default function AttendeeDisplay({ attendee }: { attendee: any }) {
  const formatDate = (date: Date) => {
    return date ? new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date)) : null;
  };

  const DataPlaceholder = () => (
    <div className="data-placeholder"></div>
  );

  return (
    <>
      <style>
        {`
          @keyframes placeholderShimmer{
            0% {
              background-position: -468px 0
            }
            100% {
              background-position: 468px 0
            }
          }

          .data-placeholder {
            width: 100%;
            height: 20px;
            background: #f6f7f8;
            background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
            background-repeat: no-repeat;
            background-size: 800px 104px;
            display: inline-block;
            position: relative;
            border-radius: 4px;
            animation-duration: 1.2s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeholderShimmer;
            animation-timing-function: linear;
          }

          .data-row {
            display: grid;
            grid-template-columns: minmax(100px, auto) minmax(200px, auto);
            grid-gap: 10px;
            align-items: center;
            margin-bottom: 10px;
          }

          // Other styles remain unchanged
        `}
      </style>
      <div
        className="card position-absolute"
        style={{
          top: "150%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "1060",
          backgroundColor: "lightblue",
          width: '24rem',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{`${attendee.firstName} ${attendee.lastName}`}</h5>

          <div className="data-row">
            <strong>Email:</strong>
            {attendee.email ? <span>{attendee.email}</span> : <DataPlaceholder />}
          </div>

          <div className="data-row">
            <strong>Created:</strong>
            {formatDate(attendee.created) ? <span>{formatDate(attendee.created)}</span> : <DataPlaceholder />}
          </div>

          <div className="data-row">
            <strong>Updated:</strong>
            {formatDate(attendee.updatedAt) ? <span>{formatDate(attendee.updatedAt)}</span> : <DataPlaceholder />}
          </div>
        </div>
      </div>
    </>
  );
}
