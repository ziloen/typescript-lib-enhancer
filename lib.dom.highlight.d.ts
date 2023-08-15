declare global {
  /**
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Highlight)
   */
  interface Highlight {

  }

  /**
  * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Highlight/Highlight)
  */
  interface HighlightConstructor {
    new(...ranges: Range[]): Highlight
  }

  const Highlight: HighlightConstructor | undefined

  /**
  * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HighlightRegistry)
  */
  interface HighlightRegistry {
    readonly size: number
    clear(): void
    delete(customHighlightName: string): boolean
    entries(): IterableIterator<[name: string, highlight: Highlight]>
    forEach(callback: () => void, thisArg?: any): void
    get(name: string): Highlight
    set(name: string, highlight: Highlight): this
  }

  namespace CSS {
    /** 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/CSS/highlights_static)
     */
    const highlights: HighlightRegistry | undefined
  }
}

export { }
