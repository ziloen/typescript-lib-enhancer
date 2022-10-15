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
}



// Test Object.entries()
{
  {
    // preserve key type, 
    const objectEntries = Object.entries({ a: 12, [Symbol()]: Symbol(), 12: "33" })
    const arrayEntries = Object.entries([12, 34])

    type TestCase = [
      Expect<Equal<typeof objectEntries, ['a' | '12', number | string][]>>,
      Expect<Equal<typeof arrayEntries, [`${number}`, number][]>>
    ]
  }

  {
    // primitive types
    const entriesOfNumber = Object.entries(0)
    const entriesOfString = Object.entries("123")
    const entriesOfSymbol = Object.entries(Symbol())

    type TestCase = [
      Expect<Equal<typeof entriesOfNumber, []>>,
      Expect<Equal<typeof entriesOfString, [`${number}`, string][]>>,
      Expect<Equal<typeof entriesOfSymbol, []>>,
    ]
  }
}



// Test Object.fromEntrires()
{
  {
    // preserve key type, 
    type KeyType = "a" | "b" | "c"
    const sameValueType = Object.fromEntries([
      ['a', 12],
      ['b', 90],
      ['c', 92],
    ])

    const diffValueType = Object.fromEntries([
      ['a', 12],
      ['b', "90"],
      ['c', Symbol()],
    ])

    type TestCase = [
      Expect<Equal<typeof sameValueType, { [k in KeyType]: number }>>,
      Expect<Equal<typeof diffValueType, { [k in KeyType]: number | string | symbol }>>,
    ]
  }
}



// Test Object.keys()
{
  {
    // symbol key ignored
    const keys = Object.keys({ str: 12, 12: 99, [Symbol()]: 123 })
    type Test = Expect<Equal<typeof keys, ("str" | "12")[]>>
  }

  {
    // primitive types
    const keysOfNumber = Object.keys(0)
    const keysOfString = Object.keys("123")
    const keysOfSymbol = Object.keys(Symbol())

    type TestCase = [
      Expect<Equal<typeof keysOfNumber, []>>,
      Expect<Equal<typeof keysOfString, `${number}`[]>>,
      Expect<Equal<typeof keysOfSymbol, []>>
    ]
  }
}



// Test Object.values()
{
  {
    // symbol key value ignored
    const values = Object.values({ str: 12, 12: 99, [Symbol()]: 123 })
    type Test = Expect<Equal<typeof values, number[]>>
  }

  {
    // primitive types
    const valuesOfNumber = Object.values(0)
    const valuesOfString = Object.values("123")
    const valuesOfSymbol = Object.values(Symbol())

    type TestCase = [
      Expect<Equal<typeof valuesOfNumber, []>>,
      Expect<Equal<typeof valuesOfString, ["1", "2", "3"]>>,
      Expect<Equal<typeof valuesOfSymbol, []>>
    ]
  }
}