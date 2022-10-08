import type { ExtractByKeys, KeyofUnion } from './utils'

declare global {
  interface ObjectConstructor {
    /**
     * Determines whether an object has a property with the specified name.
     * @param o An object.
     * @param v A property name.
     */
    hasOwn<T extends Record<keyof any, any>, K extends KeyofUnion<T>>(o: T, v: K): o is ExtractByKeys<T, K>
  }

  namespace Reflect {
    // `Reflect.has` will check prototype chain
    // Object.create(null) has no prototype
    /** 
     * Equivalent to `propertyKey in target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey Name of the property.
     */
    function has<T extends Record<keyof any, any>, K extends keyof globalThis.Object>(target: T, propertyKey: K): target is T
    /**
     * Equivalent to `propertyKey in target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey Name of the property.
     */
    function has<T extends Record<keyof any, any>, K extends KeyofUnion<T>>(target: T, propertyKey: K): target is ExtractByKeys<T, K>
  }
}