import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import SpeakerList from "@/app/speakers/speaker-list";
import SpeakerDataProvider from "@/contexts/speaker-data-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { getSpeakers } from "@/lib/prisma/speaker-utils";

export default async function SpeakerListContainer() {
  const authSessionData: {
    user?: { id: string; email: string };
  } | null =
    await getServerSession(authOptions);

  const speakerList = await getSpeakers(
    authSessionData?.user?.id ?? "",
  );

  return (
    <SpeakerDataProvider
      speakerListInit={speakerList}
    >
      <SpeakerModal />
      <SpeakerMenu />
      <SpeakerList />
    </SpeakerDataProvider>
  );
}
