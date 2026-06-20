import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @returns {string} El token JWT generado.
     */
     static signToken(user) {

        const payload = {
            sub: user.id,
            name: user.name
        };

        if (config.ALGORITHM === 'RS256') {

            return jwt.sign(
                payload,
                config.PRIVATE_KEY,
                {
                    algorithm: 'RS256',
                    expiresIn: '1m'
                }
            );
        }

        return jwt.sign(
            payload,
            config.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1m'
            }
        );
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object|null} El payload decodificado o null si es inválido.
     */
       static verifyToken(token) {

        try {

            if (config.ALGORITHM === 'RS256') {

                return jwt.verify(
                    token,
                    config.PUBLIC_KEY,
                    {
                        algorithms: ['RS256']
                    }
                );
            }

            return jwt.verify(
                token,
                config.JWT_SECRET,
                {
                    algorithms: ['HS256']
                }
            );

        } catch (error) {

            throw error;
        }
    }
}
