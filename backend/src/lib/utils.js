import jwt from 'jsonwebtoken'
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //prevent XSS attacks
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", // CSRF attacks
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return token;
}