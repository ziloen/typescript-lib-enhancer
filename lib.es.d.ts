import type { ExtractByKeys, KeyofUnion, ToString, AnyObject, Split } from './utils'

declare global {
  interface ObjectConstructor {
    /**
     * Determines whether an object has a property with the specified name.
     * @param o An object.
     * @param v A property name.
     */
    hasOwn<T extends Record<keyof any, any>, K extends KeyofUnion<T>>(o: T, v: K): o is ExtractByKeys<T, K>



    /**
     * Returns an empty array
     * @param o number or symbol
     */
    entries(o: number | symbol | bigint): []

    /**
     * Returns an array of index/substring of the string
     * @param s string
     */
    entries<
      T extends string
    >(s: T): [`${number}`, string][]

    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<
      ValueType,
      Target extends AnyObject | ArrayLike<ValueType>,
      StringKey extends ToString<keyof Target> = ToString<keyof Target>
    >(o: Target): [StringKey, ValueType][]



    /**
     * Returns the names of the enumerable string properties and methods of an object.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    keys<T extends AnyObject>(o: T): ToString<keyof T>[]

    /**
     * Returns an empty array
     * @param o number or symbol
     */
    keys(o: number | symbol | bigint): []

    /**
     * Returns index string array
     * @param s string
     */
    keys<T extends string>(s: T): `${number}`[]



    /**
     * Returns an array of string split
     * @param o string
     */
    values(o: number | symbol | bigint): []

    /**
     * Returns an array of string split
     * @param o string
     */
    values<T extends string>(o: T): Split<T>
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