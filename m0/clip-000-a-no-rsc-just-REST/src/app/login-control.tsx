import {useSpeakerDataContext} from "@/components/contexts/speaker-data-context";
import {useLocalAuthContext} from "@/components/contexts/auth-context";

export default function LoginControl() {
  const { isLoggedIn, setLoggedInName, isLoading, loggedInFirstLast } = useLocalAuthContext();
  const { speakerList, setSpeakerList } = useSpeakerDataContext();

  const handleLogout = (event: any) => {
    event.preventDefault(); // Prevent default anchor behavior
    setLoggedInName("");
    setSpeakerList(
      speakerList.map((speaker) => ({
        ...speaker,
        favorite: false,
      })),
    );
  };

  return (
    <span className="">
      {!isLoading ? (
        isLoggedIn ? (
          <div>
            <span className="">
              Logged in as <i className="p-2">{loggedInFirstLast}</i>
            </span>
            {/* Using an anchor tag for logout */}
            <a
              href="#logout" // Dummy href, actual navigation is prevented
              className="mt-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        ) : (
          <div>
            <a className="mt-2 cursor-pointer" href="/attendees">
              Sign-in
            </a>
          </div>
        )
      ) : null}
    </span>
  );
}

