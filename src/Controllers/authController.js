const { db } = require('../Services/firestoreService');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // Busca al usuario por su email en la colección "users"
    const usersRef = db.collection('users');
    const userQuery = await usersRef.where('email', '==', email).get();
    console.log(userQuery);
    if (userQuery.empty) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = userQuery.docs[0].data();

    // Verifica la contraseña (aquí debes implementar la verificación segura de contraseñas)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: error.message});
  }
};

module.exports = {
  loginUser
};
