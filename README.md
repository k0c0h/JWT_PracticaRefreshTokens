# Investigación Teórica: Integración de Refresh Tokens

## ¿Cómo un Refresh Token mejora la experiencia del usuario?

Los JSON Web Tokens (JWT) utilizados en arquitecturas Stateless suelen tener tiempos de expiración cortos para reducir los riesgos de seguridad. Sin embargo, esto puede afectar negativamente la experiencia del usuario, obligándolo a autenticarse demasiadas veces lo que a largo paso llega a volverse tedioso y una mala práctica en experiencia de usuario.

La implementación de Refresh Tokens permite solucionar este inconveniente. Cuando el Access Token expira, el cliente puede enviar el Refresh Token al servidor de autenticación para solicitar un nuevo Access Token sin requerir que el usuario vuelva a ingresar sus credenciales.

Este mecanismo mejora significativamente la experiencia del usuario y mantiene la seguridad en arquitecturas distribuidas, ya que los microservicios continúan validando únicamente Access Tokens de corta duración sin necesidad de almacenar sesiones en memoria.

## ¿Dónde se debe almacenar el Refresh Token?

Las buenas prácticas de seguridad recomiendan almacenar el Refresh Token en el lado del cliente mediante cookies seguras configuradas con los atributos HttpOnly, Secure y SameSite.

* **HttpOnly** evita que scripts JavaScript accedan al token, mitigando ataques.
* **Secure** garantiza que la cookie sea transmitida únicamente mediante HTTPS.
* **SameSite** ayuda a prevenir ataques CSRF.

Aunque el cliente almacena el Refresh Token, el servidor debe ser responsable de gestionar su ciclo de vida, incluyendo validación, renovación y revocación siempre y cuando sea necesario.
