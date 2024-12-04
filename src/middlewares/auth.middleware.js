import { UnauthenticatedError } from "../errors/index.js";
import { verifyJWT } from "../utils/token.utils.js";

const authenticateUser = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentification invalide");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId } = verifyJWT(token);

    req.user = {
      userId,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentification invalide");
  }
};

export default authenticateUser;
