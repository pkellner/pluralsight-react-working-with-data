const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient()

async function main() {
  // Create an array of promises for creating attendees
  const attendeePromises = Array.from({ length: 1000 }).map(async () => {
    return prisma.attendee.create({
      data: {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    });
  });

  // Execute all the promises
  await Promise.all(attendeePromises);

  console.log('Seeded: 1000 attendees');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
