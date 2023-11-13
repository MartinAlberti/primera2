import winston from "winston";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "magenta",
    error: "red",
    waning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};
winston.addColors(customLevels.colors);
export const logger = winston.createLogger({
  levels: customLevels.levels,

  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
    }),
  ],
});
