//存储数据
export const setItem = (key, value) => {
  if(typeof value === "object") {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

//读取数据
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch(e) {
    return data
  }
}

//删除数据
export const removeItem = (key) => {
  localStorage.removeItem(key)
}