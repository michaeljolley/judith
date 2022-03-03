import { Stream } from "../../src/common";

export function activeStream():Stream {
  return new Stream(
    '2020202',
    '01/01/2020',
    '01/01/2020',
    'we streamz fer teh lulz',
    null
  )
}

export function endedStream():Stream {
  return new Stream(
    '2020202',
    '01/01/2020',
    '01/01/2020',
    'we streamz fer teh lulz',
    '01/01/2020'
  )
}