import type { ExtractByKeys } from './utils'

declare global {
  interface ObjectConstructor {
    /**
     * Determines whether an object has a property with the specified name.
     * @param o An object.
     * @param v A property name.
     */
    hasOwn<T extends Record<keyof any, any>, K extends keyof any>(
      o: T,
      v: K
    ): o is ExtractByKeys<T, K>;
  }
}