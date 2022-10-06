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