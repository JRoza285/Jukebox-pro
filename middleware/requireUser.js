/** Requires a logged-in user */
import { verifyToken } from "#utils/jwt";
import { getUserById } from "#db/queries/users";
export default async function requireUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).send("Unauthorized");

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    const user = await getUserById(payload.id);
    if (!user) return res.status(401).send("Unauthorized");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }

}
