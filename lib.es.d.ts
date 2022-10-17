import type { ExtractByKeys, KeyofUnion, ToString, AnyObject, Split, ValueOf, IterableType } from './utils'

type ToStringTags =
  | "[object Undefined]"
  | "[object Null]"
  | "[object Number]"
  | "[object Boolean]"
  | "[object BigInt]"
  | "[object String]"
  | "[object Function]"
  | "[object Object]"
// | "[object Date]"
// | "[object Array]"
// | "[object ArrayBuffer]"
// | "[object URL]" 

declare global {
  interface ObjectConstructor {
    /**
     * Determines whether an object has a property with the specified name.
     * @param o An object.
     * @param v A property name.
     */
    hasOwn<T extends AnyObject, K extends KeyofUnion<T>>(o: T, v: K): o is ExtractByKeys<T, K>



    /**
     * Returns an empty array
     * @param o number or symbol
     */
    entries(o: number | symbol | bigint): []

    /**
     * Returns an array of index/substring of the string
     * @param s string
     */
    entries(s: string): [`${number}`, string][]

    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<T, O extends { [k: string]: T }, K extends string = ToString<keyof O>>(o: O): [K, O[K]][]

    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<A extends ArrayLike<any>>(o: A): [`${number}`, A[number]][]



    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries<K extends PropertyKey, I extends Iterable<readonly [K, any]>, T extends IterableType<I> = IterableType<I>>(entries: I): { [Key in T[0]]: IterableType<I>[1] }




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
    keys(s: string): `${number}`[]



    /**
     * Returns an empty array
     * @param o number or symbol or bigint
     */
    values(o: number | symbol | bigint): []

    /**
     * Returns an array of string split
     * @param s string
     */
    values<T extends string>(s: T): Split<T>
  }

  namespace Reflect {
    // `Reflect.has` will check prototype chain
    // Object.create(null) has no prototype
    /** 
     * Equivalent to `propertyKey in target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey Name of the property.
     */
    function has<T extends AnyObject, K extends keyof globalThis.Object>(target: T, propertyKey: K): target is T

    /**
     * Equivalent to `propertyKey in target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey Name of the property.
     */
    function has<T extends AnyObject, K extends KeyofUnion<T>>(target: T, propertyKey: K): target is ExtractByKeys<T, K>



    /**
     * Gets the property of target, equivalent to `target[propertyKey]` when `receiver === target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey The property name.
     * @param receiver The reference to use as the `this` value in the getter function,
     *        if `target[propertyKey]` is an accessor property.
     */
    function get<T extends object, K extends keyof T>(target: T, propertyKey: K, receiver?: any): T[K]
  }

  interface Object {
    /** Returns a string representation of an object. */
    toString(): ToStringTags | (string & {})
  }
}