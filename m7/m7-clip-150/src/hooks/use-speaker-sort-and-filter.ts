import { Speaker } from "@/lib/general-types";

export default function useSpeakerSortAndFilter(
  speakerList: Array<any>,
  searchText: string,
) {
  return speakerList
    ? speakerList
        .filter(
          ({ firstName, lastName }) => {
            return (
              searchText?.length === 0 ||
              (
                firstName?.toLowerCase() +
                lastName?.toLowerCase()
              ).includes(
                searchText?.toLowerCase(),
              )
            );
          },
        )
        .sort((a: Speaker, b: Speaker) => {
          const nameA = (
            a.lastName + a.firstName
          ).toLowerCase();
          const nameB = (
            b.lastName + b.firstName
          ).toLowerCase();
          return nameA.localeCompare(nameB);
        })
    : [];
}
