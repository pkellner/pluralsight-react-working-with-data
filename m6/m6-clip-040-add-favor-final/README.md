# Pluralsight Course - Working with Data in React
# Author: Peter Kellner

If you are getting any errors in auth here, I suggest you verify that you seeded your prisma db (sqlite data).

Also, to login, an email is required (password is ignored). Assuming you have seeded your database as below, you can use any email in the seed file.

For example, use this as email: Maya_Kirlin65@yahoo.com

As is explained in the source, you need to run the following command:

```bash
ts-node src/lib/prisma/seed.ts
```
(You can run this command repeatedly to reseed the database.)