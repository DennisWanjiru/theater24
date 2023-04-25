import { intervalToDuration } from 'date-fns'

export const getRuntime = (minutes: number): string => {
  const time = intervalToDuration({ start: 0, end: minutes * 60 * 1000 })

  let runtime = ''
  time.hours ? (runtime += `${time.hours}h `) : runtime
  time.minutes ? (runtime += `${time.minutes}m`) : '00m'

  return runtime
}

export const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string): string => {
  return localStorage.getItem(key) ?? ''
}

export const removeLocalStorage = (key: string): void => {
  return localStorage.removeItem(key)
}
