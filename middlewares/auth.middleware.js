import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token no proporcionado'
        });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Formato de token inválido'
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const payload = JwtService.verifyToken(token);

        req.user = payload;

        next();

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expirado'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                message: 'Firma o algoritmo inválido'
            });
        }

        return res.status(403).json({
            message: 'Token inválido'
        });
    }
};
