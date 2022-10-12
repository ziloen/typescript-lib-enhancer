// import "./shim"
import type { Expect, Equal } from './utils'



// Test Object.hasOwn()
{
  const objUnion = { a: 12 } as { a: number } | { b: number }

  // key on Object.prototype
  if (Object.hasOwn(objUnion, 'toString')) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  }

  // key of union, narrow type
  if (Object.hasOwn(objUnion, 'a')) {
    type Test = Expect<Equal<typeof objUnion, { a: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { b: number }>>
  }

  // if not key, don't narrow
  if (Object.hasOwn(objUnion, 'c')) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  }
}



// Test Reflect.has()
{
  const objUnion = { a: 12 } as { a: number } | { b: number }

  // if key on Object.prototype
  if (Reflect.has(objUnion, 'toString')) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, never>>
  }

  // key of union
  if (Reflect.has(objUnion, 'a')) {
    type Test = Expect<Equal<typeof objUnion, { a: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { b: number }>>
  }

  // not key, do nothing
  if (Reflect.has(objUnion, "c")) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  }
}



// Test struredClone()
{
  // Promise -> never
  const clonePromise = structuredClone(new Promise(() => { }))
  const cloneDeepPropmise = structuredClone({ a: { b: new Promise(() => { }) } })

  type TestCase = [
    Expect<Equal<typeof clonePromise, never>>,
    Expect<Equal<typeof cloneDeepPropmise, never>>,
  ]
}

{
  // Function -> never
  const cloneFunction = structuredClone((a: string) => { })
  const cloneDeepFunction = structuredClone({ a: { b: () => { } } })

  type TestCase = [
    Expect<Equal<typeof cloneFunction, never>>,
    Expect<Equal<typeof cloneDeepFunction, never>>,
  ]
}

{
  // Symbol -> never
  const cloneSymbol = structuredClone({ a: Symbol() })
  const cloneDeepSymbol = structuredClone({ a: { b: Symbol() } })

  type TestCase = [
    Expect<Equal<typeof cloneSymbol, never>>,
    Expect<Equal<typeof cloneDeepSymbol, never>>,
  ]
}

{
  // Symbol key -> clone with out symbol key
  const cloneSymbolKey = structuredClone({ [Symbol()]: 123, a: 12 })
  const cloneDeepSymbolKey = structuredClone({ a: 12, b: { [Symbol()]: 123, c: 12 } })

  type TestCase = [
    Expect<Equal<typeof cloneSymbolKey, { a: number }>>,
    Expect<Equal<typeof cloneDeepSymbolKey, { a: number, b: { c: number } }>>,
  ]
}



// Object.entries()
{
  // preserve key type, 
  const entries = Object.entries({ a: 12, [Symbol()]: 99, 12: 33 })
  type TestCase = [
    Expect<Equal<typeof entries, ['a' | '12', number][]>>
  ]
}
