import winston from "winston";
import kleur from "kleur";

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, label, ...meta }) => {
  const colorMap = {
    info: kleur.gray,
    warn: kleur.yellow,
    error: kleur.red,
    debug: kleur.blue,
  };

  const color =
    colorMap[level as keyof typeof colorMap] ??
    ((text: string) => text);

  const metaString =
    Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";

  return color(
    `${timestamp} [${level.toUpperCase()}] ${message}${metaString}`
  );
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export const log = {
  info: (message: string, meta?: object) =>
    logger.info(message, meta),

  warn: (message: string, meta?: object) =>
    logger.warn(message, meta),

  error: (message: string, meta?: object) =>
    logger.error(message, meta),

  debug: (message: string, meta?: object) =>
    logger.debug(message, meta),
};
