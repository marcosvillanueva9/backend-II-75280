import jwt from 'jsonwebtoken';

export const handlePolicies = (policies) => (req, res, next) => {
  if (policies[0] === "PUBLIC") return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ status: "error", error: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, 'CoderSecretClaseRouter');
    if (!policies.includes(user.role.toUpperCase())) {
      return res.status(403).send({ error: "Forbidden: role not allowed" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send({ error: "Invalid token" });
  }
};
