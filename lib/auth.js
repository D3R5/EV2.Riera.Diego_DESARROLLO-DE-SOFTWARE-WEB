import jwt from "jsonwebtoken";

export function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, correo: usuario.correo },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

export function verificarToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function getUserFromRequest(req) {
  const auth = req.headers.get("authorization");

  if (!auth) return null;

  const token = auth.split(" ")[1];

  try {
    return verificarToken(token);
  } catch {
    return null;
  }
}