export default function useAttendeeSortAndFilter(
  attendeeList: Array<any>,
  searchText: string,
) {
  return attendeeList
    ? attendeeList
      .filter(({ firstName, lastName }) => {
        return (
          searchText?.length === 0 ||
          (firstName?.toLowerCase() + lastName?.toLowerCase()).includes(
            searchText?.toLowerCase(),
          )
        );
      })
      .sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      })
    : [];
}
