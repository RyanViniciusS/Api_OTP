import Redis from 'ioredis';

let redisClient: Redis;

export function redisdb(): Redis | null {
  try {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD, // adicione isso
    });

    redisClient.on('connect', () => {
      console.log('✅ Conectado ao Redis');
    });

    redisClient.on('error', (err) => {
      console.error('❌ Erro ao conectar no Redis:', err);
    });

    return redisClient;
  } catch (error) {
    console.error('❌ Falha ao inicializar o Redis:', error);
    return null;
  }
}
