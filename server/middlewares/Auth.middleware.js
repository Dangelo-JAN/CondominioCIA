import jwt from 'jsonwebtoken'

export const VerifyEmployeeToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(403).json({ success: false, message: "Unauthenticated employee", gologin: true })
        }
        req.EMid   = decoded.EMid
        req.EMrole = decoded.EMrole
        req.ORGID  = decoded.ORGID
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error })
    }
}

export const VerifyhHRToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(403).json({ success: false, message: "Unauthenticated HR", gologin: true })
        }
        req.HRid  = decoded.HRid
        req.ORGID = decoded.ORGID
        req.Role  = decoded.HRrole
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error })
    }
}
