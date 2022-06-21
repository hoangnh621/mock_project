const calculateComponentBottom = (selector) => {
  const element = document.querySelector(selector)
  return element.getBoundingClientRect().bottom
}

export default calculateComponentBottom
