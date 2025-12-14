export const protectUser = async (req, res, next) => {
  try {
    if (!req.auth().isAuthenticated) {
      return res
        .status(401)
        .json({ message: "Unauthorized---You must log in" });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
