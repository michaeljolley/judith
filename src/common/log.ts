import { getTime } from './getTime';

export const log = (level: string, message: string): void => {
  const captains: Console = console
  const { hours, minutes } = getTime()
  const stack = new Error().stack.split(" at ")[2].replace("\n","").trim()
  let timestamp = `${hours}:${minutes}`
  if (process.env.NODE_ENV === "development") {
    const timestampSplit = timestamp.split('')
    timestampSplit[timestamp.length]=` ${stack.slice(stack.indexOf(' ')+1)}`
    timestamp = timestampSplit.join('')
  }
  captains[level](`[${timestamp}] ${message}`)
};

export enum LogLevel {
  Info = 'info',
  Error = 'error'
}