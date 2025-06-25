export const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.length <= 3) return res.status(400).json({ message: "Nome de usuário muito curto" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ message: "Email inválido" });

  if (!password || password.length <= 8) return res.status(400).json({ message: "Senha muito curta" });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) return res.status(400).json({ message: "Senha deve conter letras e números" });

  next();
};