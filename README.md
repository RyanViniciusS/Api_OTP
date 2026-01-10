# Precisa do mailpit para validar os email de teste

docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit

#MELHORIAS :
🔒 Segurança

Limitar tentativas de OTP (ex.: máximo 3-5 tentativas por período).

Expirar OTPs automaticamente após uso ou tempo limite.

Salvar OTPs como hash no banco (bcrypt/argon2) em vez de texto.

Bloquear temporariamente usuários após tentativas suspeitas.

Não revelar se o e-mail/usuário existe nas respostas.
