import winston from 'winston'
import kleur from 'kleur'

const { combine, timestamp, printf } = winston.format

const logFormat = printf(({ level, message, timestamp, label }) => {
  const colorMap = {
    info: kleur.gray,
    warn: kleur.yellow,
    error: kleur.red,
    debug: kleur.blue,
  }

  const color = colorMap[level as keyof typeof colorMap] || ((text: string) => text)

  return color(`${timestamp} - ${label} - ${level.toUpperCase()} - ${message}`)
})

export const createLogger = (label: string) =>
  winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.label({ label }),
      logFormat
    ),
    transports: [new winston.transports.Console()],
  })
