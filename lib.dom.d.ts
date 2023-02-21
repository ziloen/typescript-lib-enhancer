
type NotClonable = Promise<any> | Function | Symbol


declare global {
  /**
   * Creates a [deep clone](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) of a given value using the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
   * @param value The object to be cloned. This can be any [structured-clonable type](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types). 
   */
  function structuredClone<T>(value: T): T extends NotClonable ? never : any



  interface Document {
    /**
     * Returns a reference to the first object with the specified value of the ID attribute.
     * @param elementId String that specifies the ID value.
     */
    getElementById<T extends HTMLElement = HTMLElement>(elementId: string): T | null
  }

  interface DocumentFragment {
    /**
     * Returns a reference to the first object with the specified value of the ID attribute.
     * @param elementId String that specifies the ID value.
     */
    getElementById<T extends HTMLElement = HTMLElement>(elementId: string): T | null
  }
}

export { }