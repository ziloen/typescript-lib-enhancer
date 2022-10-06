/**
 * 从联合类型中挑选出有 K 键值的项
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