const error = {
  1: "hello",
  2: 'world'
}

export function err(errCode) {
  return error[errCode]
}