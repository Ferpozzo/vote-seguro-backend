import * as jwt from 'jsonwebtoken'
import { environment } from '../config/config'

module.exports = (req: any, res: any, next: any) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        } else {
            const parts = authorization.split(" ")
            if (!(parts.length === 2)) {
                return res.status(401).json({ auth: false, message: 'Token format invalid.' });
            }
            const [scheme, token] = parts
            if (!/^Bearer$/.test(scheme)) {
                return res.status(401).json({ auth: false, message: 'Token format invalid.' });
            }
            jwt.verify(token, environment.security.secret, (err: any, decoded: any) => {
                req.userId = decoded.id
                next();
            });
        }
    } catch (err) {
        return res.status(500).json({ auth: false, message: 'Authentication failed.', error: err });
    }
}

