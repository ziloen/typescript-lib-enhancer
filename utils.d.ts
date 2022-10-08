type _ = any

/**
 * Extract from T those types that has K keys
 * ```ts
 * type A = { a: _ } | { b: _ } | { c: _ }
 *
 * type B = ExtractByKey<A, 'a' | 'b'>
 * type B = { a: _ } | { b: _ }
 * ```
 */
export type ExtractByKeys<T, K extends keyof any> =
  T extends infer R
  ? K extends keyof R
  ? R
  : never
  : never

export type NotFn<T> = T extends Function ? never : T

// TODO:
export type NotFnDeep<T> = T extends string | number | undefined | null ? T : never


export type KeyofUnion<T> = T extends infer R ? keyof R : never 


// type-challenges utils 
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

export type Expect<T extends true> = T