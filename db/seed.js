
import db from "#db/client";
import { createPlaylist } from "#db/queries/playlists";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // 1️⃣ Create users FIRST
  const user1 = await createUser("joe1", "joe1");
  const user2 = await createUser("joe2", "joe2");

  // 2️⃣ Create playlists WITH user_id
  for (let i = 1; i <= 20; i++) {
    const user = i <= 10 ? user1 : user2;

    await createPlaylist(
      `Playlist ${i}`,
      "lorem ipsum playlist description",
      user.id
    );

    await createTrack(`Track ${i}`, i * 50000);
  }
}
