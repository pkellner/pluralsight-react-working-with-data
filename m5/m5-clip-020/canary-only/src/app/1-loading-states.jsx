
export default function LoadingStates() {

  const [speakerList, setSpeakerList] =
    useState([]);
  const [loadingStatus, setLoadingStatus] =
    useState("loading");

  useEffect(() => {
      try {
        // fetch data ...
        // set speakerList state and
        //  loadingStatus to success
      } catch (error) {
        // set loadingStatus to error
      }
  }, []);

  {
    loadingStatus === "loading" ? (
      <div>Loading...</div>
    ) : loadingStatus === "error" ? (
      <div>ERROR</div>
    ) : (
      <ul>
        {speakerState.speakerList.map(speaker => (
          <li key={speaker.id}>
            {speaker.firstName} {speaker.lastName}
          </li>
        ))}
      </ul>
    )
  }

}