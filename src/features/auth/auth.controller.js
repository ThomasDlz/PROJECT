import User from "../users/users.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation basique
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({ name, email, password });

    // Créer un token d'accès
    const token = user.createAccessToken();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user,
      token,
    });
  } catch (error) {
    console.error("Erreur dans le contrôleur d'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
