const infinite = 99999
const SMALL_MOBILE_MAX_WIDTH = 545
const MOBILE_MAX_WIDTH = 768
const TABLET_MAX_WIDTH = 1024

export const SMALL_MOBILE_KEY = 'SMALL_MOBILE'
export const MOBILE_KEY = 'MOBILE'
export const NON_MOBILE_KEY = 'NON_MOBILE'
export const TABLET_KEY = 'TABLET'
export const DESKTOP_KEY = 'DESKTOP'
export const NON_DESKTOP_KEY = 'NON_DESKTOP'

/**
 *
 * @param {string} key
 * @param {number} min
 * @param {number} max
 * @returns
 */
const createBreakpoint = (key, min, max) => {
  const breakpoint = {
    key,
    min,
    max,
    query: `(min-width: ${min}px) and (max-width: ${max}px)`,
  }
  breakpoint.toString = () => breakpoint.query

  return breakpoint
}

export const breakpoints = {
  [SMALL_MOBILE_KEY]: createBreakpoint(SMALL_MOBILE_KEY, 0, SMALL_MOBILE_MAX_WIDTH),
  [MOBILE_KEY]: createBreakpoint(MOBILE_KEY, 0, MOBILE_MAX_WIDTH),
  [TABLET_KEY]: createBreakpoint(TABLET_KEY, MOBILE_MAX_WIDTH + 1, TABLET_MAX_WIDTH),
  [DESKTOP_KEY]: createBreakpoint(DESKTOP_KEY, TABLET_MAX_WIDTH + 1, infinite),
  [NON_MOBILE_KEY]: createBreakpoint(NON_MOBILE_KEY, MOBILE_MAX_WIDTH + 1, infinite),
  [NON_DESKTOP_KEY]: createBreakpoint(NON_DESKTOP_KEY, 0, TABLET_MAX_WIDTH),
}

export const media = {
  [SMALL_MOBILE_KEY]: breakpoints[SMALL_MOBILE_KEY].query,
  [MOBILE_KEY]: breakpoints[MOBILE_KEY].query,
  [TABLET_KEY]: breakpoints[TABLET_KEY].query,
  [DESKTOP_KEY]: breakpoints[DESKTOP_KEY].query,
  [NON_MOBILE_KEY]: breakpoints[NON_MOBILE_KEY].query,
  [NON_DESKTOP_KEY]: breakpoints[NON_DESKTOP_KEY].query,
}
