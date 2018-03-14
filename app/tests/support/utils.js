export const delay = time => new Promise(resolve => setTimeout(resolve, time))
export const tick = () => delay(0)
