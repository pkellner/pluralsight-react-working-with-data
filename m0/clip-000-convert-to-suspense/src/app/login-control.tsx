import { useLocalAuthContext } from "@/components/contexts/auth-context";

export default function LoginControl() {
  const { isLoggedIn, setLoggedInName, isLoading, loggedInFirstLast } =
    useLocalAuthContext();

  const handleLogout = (event: any) => {
    event.preventDefault();
    setLoggedInName("");
  };

  return (
    <span className="">
      {!isLoading ? (
        isLoggedIn ? (
          <div>
            <span className="">
              Logged in as <i className="p-2">{loggedInFirstLast}</i>
            </span>
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
