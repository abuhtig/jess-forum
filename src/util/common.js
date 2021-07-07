const getElememtY = (elem) => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}
const scrollToElem = (elem, duration, offset) => {
  const startingY = window.pageYOffset
  const elementY = getElememtY(elem)
  const diff = elementY - startingY + offset

  if (!diff) return
  // eslint-disable-next-line
  const easing = t => t < .5 ? 4 * t * t * t : ( t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) {
      start = timestamp
    }
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
export { scrollToElem }
