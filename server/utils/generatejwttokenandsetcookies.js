import jwt from 'jsonwebtoken'

export const GenerateJwtTokenAndSetCookiesEmployee = (res, EMid, EMrole, ORGID) => {
    const token = jwt.sign({ EMid, EMrole, ORGID }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("EMtoken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })

    return token
}

export const GenerateJwtTokenAndSetCookiesHR = (res, HRid, HRrole, ORGID) => {
    const token = jwt.sign({ HRid, HRrole, ORGID }, process.env.JWT_SECRET, { expiresIn: '7d' })

    // 2. Configurar la cookie para Cross-Origin (Vercel <-> Render)
    res.cookie("HRtoken", token, {
        httpOnly: true,    // Protege contra ataques XSS
        secure: true,      // OBLIGATORIO: Solo envía la cookie por HTTPS
        sameSite: 'none',  // OBLIGATORIO: Permite enviar la cookie entre dominios distintos
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        path: "/"        // Disponible en todas las rutas del backend
    })

    return token
}