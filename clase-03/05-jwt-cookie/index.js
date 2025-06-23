import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { generateToken } from "./utils.js";

const app = express();
const PORT = 8080;
const users = [];

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Faltan campos" });

  const existing = users.find((u) => u.username === username);
  if (existing) return res.status(409).json({ error: "Ya existe ese usuario" });

  const hashed = createHash(password);
  users.push({ username, password: hashed });
  res.json({ message: "Usuario registrado" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !isValidPassword(user, password)) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = generateToken(user);

  //PRIMERO ASI
//   res.json({ token });  ASI LA COOKIE NO VA SEGURA


  res.cookie("token", token, { httpOnly: true,
    maxAge: 3600000, // 1 hora
   });
  res.json({ message: "Login exitoso" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
