// import "./shim"
import type { Expect, Equal } from './utils'



const v: { a: number } | { b: number } = {} as any

// Test Object.hasOwn
if (Object.hasOwn(v, 'a')) {
  type T = Expect<Equal<typeof v, { a: number }>>
} else {
  type T = Expect<Equal<typeof v, { b: number }>>
}

if (Object.hasOwn(v, 'c')) {
  type T = Expect<Equal<typeof v, { a: number } | { b: number }>>
} else {
  type T = Expect<Equal<typeof v, { a: number } | { b: number }>>
}



// Test Reflect.has
if (Reflect.has(v, 'toString')) {
  type T = Expect<Equal<typeof v, { a: number } | { b: number }>>
} else {
  type T = Expect<Equal<typeof v, never>>
}

if (Reflect.has(v, 'a')) {
  type T = Expect<Equal<typeof v, { a: number }>>
} else {
  type T = Expect<Equal<typeof v, { b: number }>>
}

if (Reflect.has(v, "c")) {
  type T = Expect<Equal<typeof v, { a: number } | { b: number }>>
} else {
  type T = Expect<Equal<typeof v, { a: number } | { b: number }>>
}



const cloned = structuredClone(new Promise(() => { }))
const ccloned = structuredClone((a: string) => {})