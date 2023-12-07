"use client";
import { useLocalAuthContext } from "@/components/contexts/auth-context";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function Header({
  speakerListUpdate = false,
}: {
  speakerListUpdate: boolean;
}) {
  const { loggedInName, setLoggedInName, isLoading } = useLocalAuthContext();

  const { speakerList, setSpeakerList } = speakerListUpdate
    ? useSpeakerDataContext()
    : { speakerList: [], setSpeakerList: (speakerList: any) => {} };

  function getFirstLast(loggedInName: string) {
    const firstLast = loggedInName.split("/");
    return `${firstLast[0]} ${firstLast[1]}`;
  }

  return (
    <div className="hero py-4 mt-2 header-footer-gradient home-rounded-corners-top-left">
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center justify-content-between">
          {/* Logo Section */}
          <div className="col-lg-4 text-lg-end">
            <img src="/images/svcc-logo.png" alt="SVCC Logo" />
            <h2>
              <a
                href="https://www.siliconvalley-codecamp.com/Event/2019"
                target="_blank"
              >
                <span className="text-black">
                  Silicon Valley Code Camp 2019
                </span>
              </a>
            </h2>
          </div>

          {/* Login/Logout Section */}
          <div className="col-lg-4 text-center">
            {!isLoading ? (
              loggedInName.length > 0 ? (
                <div>
                  <div className="background-text-highlight mb-3">
                    (ADMIN MODE)
                  </div>
                  <div>
                    Logged in as <b>{getFirstLast(loggedInName)}</b>
                  </div>
                  <button
                    className="btn btn-outline-dark mt-2"
                    onClick={() => {
                      setLoggedInName("");
                      if (speakerListUpdate) {
                        setSpeakerList(
                          speakerList.map((speaker) => ({
                            ...speaker,
                            favorite: false,
                          })),
                        );
                      }
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <div className="background-text-highlight mb-3">
                    (ADMIN MODE)
                  </div>
                  <div>Not logged in</div>
                  <a className="btn btn-secondary mt-2" href="/attendees">
                    Login
                  </a>
                </div>
              )
            ) : null}
          </div>

          {/* Date and Location */}
          <div className="col-lg-4 text-lg-start mt-3 mt-lg-0">
            <h5 className="text-uppercase text-black">October 19-20, 2019</h5>
            <h6 className="text-uppercase text-black-50">
              San Jose, California
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
