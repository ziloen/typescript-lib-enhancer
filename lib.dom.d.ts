import type { ExtractByKeys, Fn, IsUnion, UnionToTuple } from './utils'



// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types
type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

type Primitive =
  | boolean
  | string
  | number
  | null
  | undefined
  | bigint


type ClonableError =
  | Error
  | EvalError
  | RangeError
  | ReferenceError
  | SyntaxError
  | TypeError
  | URIError

type SimpleClonable =
  | ArrayBuffer
  | Boolean
  | Number
  | ClonableError
  | DataView
  | Date
  | Primitive
  | RegExp
  | TypedArray


// TODO: 递归遍历对象
type StructuredClonable<T> =
  T extends Promise<any> ? never :
  T extends Fn ? never :
  T extends Array<infer R> ? Array<StructuredClonable<R>> :
  T extends Map<infer R, infer P> ? Map<StructuredClonable<R>, StructuredClonable<P>> :
  T extends Set<infer R> ? Set<StructuredClonable<R>> :
  T extends object ? { [K in keyof T]: StructuredClonable<T[K]> } :
  T extends SimpleClonable ? T :
  IsUnion<T> extends true ? StructuredClonable<UnionToTuple<T>[number]> :
  never


declare global {
  /**
   * Creates a [deep clone](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) of a given value using the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
   * @param value The object to be cloned. This can be any [structured-clonable type](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types). 
   */
  function structuredClone<T, S extends StructuredClonable<T>>(value: T): [S] extends [never] ? never : T
}