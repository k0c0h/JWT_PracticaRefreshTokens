import { JwtService } from '../services/jwt.service.js';

export class AuthController {

    static async generateToken(req, res) {

        const { username, password } = req.body;

        // Simulación

        if (username === 'admin' && password === '1234') {

            const user = {
                id: 1,
                name: 'Administrador'
            };

            const token = JwtService.signToken(user);

            return res.status(200).json({
                token
            });
        }

        return res.status(401).json({
            message: 'Credenciales inválidas'
        });
    }
}
