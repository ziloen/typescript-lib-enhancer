// import "./shim"

const v: { a: number } | { b: number } = {} as any

if (Object.hasOwn(v, 'a')) {
  v.a
  // @ts-expect-error v.b should not exist
  v.b
} else {
  v.b
  // @ts-expect-error v.a should not exist
  v.a
}


if (Reflect.has(v, 'a')) {
  v.a
} else {
  v.b
}