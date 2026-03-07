export const RoleAuthorization = (...AuthRoles) => {
    return (req, res, next) => {
        // CORRECCIÓN: Usamos req.HRrole que es el que viene del middleware de verificación
        if (!AuthRoles.includes(req.HRrole)) {
            console.error(`Acceso denegado. Rol requerido: ${AuthRoles}. Rol recibido: ${req.HRrole}`);
            return res.status(403).json({ success : false, message: "You are not authorized to access this route" });
        }
        next();
    }
}
