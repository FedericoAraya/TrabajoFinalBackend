const authorize = (roles) => {
    return (req, res, next) => {
      const currentUser = req.user.user;
      if (!currentUser) {
        return res.status(401).json({ message: "No autorizado" });
      }
      if (!roles.includes(currentUser.role)) {
        return res.status(403).json({ message: "No contas con los suficientes privilegios" });
      }
      next();
    };
  };

  
  
  export default authorize;