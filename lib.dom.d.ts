
declare global {
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

