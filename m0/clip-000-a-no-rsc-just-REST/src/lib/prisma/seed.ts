// import does not work in standalone scripts
const { PrismaClient } = require("@prisma/client");
const data = require("../../../db.json");

const prisma = new PrismaClient();

// seed all the tables for all data scenarios in the course
async function main() {
  // Seed Sessions
  for (const session of data.sessions) {
    await prisma.session.insert({
      create: {
        id: session.id,
        title: session.title,
        description: session.description,
        // speakers will be linked later
      },
    });
  }

  // Seed Speakers
  for (const speaker of data.speakers) {
    const updatedSpeaker = await prisma.speaker.upsert({
      where: { id: speaker.id },
      update: {},
      create: {
        id: speaker.id,
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        company: speaker.company,
        twitterHandle: speaker.twitterHandle,
        userBioShort: speaker.userBioShort,
        // sessions and favorites will be handled separately
      },
    });

    // Seed SpeakerSessions
    for (const sessionId of speaker.sessionIds) {
      await prisma.speakerSession.create({
        data: {
          speakerId: updatedSpeaker.id,
          sessionId: sessionId,
        },
      });
    }
  }

  // Seed Attendees
  for (const attendee of data.attendees) {
    await prisma.attendee.upsert({
      where: { id: attendee.id },
      update: {},
      create: {
        id: attendee.id,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        company: attendee.company,
        twitterHandle: attendee.twitterHandle,
        userBioShort: attendee.userBioShort,
        // favorites will be handled separately
      },
    });
  }

  // Seed AttendeeFavorites
  for (const favorite of data.attendeeFavorites) {
    const attendeeRecExists = await prisma.attendee.findUnique({
      where: { id: favorite.attendeeId },
    });
    if (!attendeeRecExists) {
      console.log("no attendee found");
      console.log(`Attendee ${favorite.attendeeId} does not exist`);
    }

    await prisma.attendeeFavorite.create({
      data: {
        attendeeId: favorite.attendeeId,
        speakerId: favorite.speakerId,
      },
    });
  }
}

main()
  .then(async () => {
    console.log("Seeding from db.json complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
