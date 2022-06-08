const calculateComponentHeight = (id) => {
  const component = document.getElementById(id)
  return component?.getBoundingClientRect().height
}

export default calculateComponentHeight
