import { JSDOM } from 'jsdom'

/**
 *
 * @param dom The JSDOM instance
 * @param query The query used to select the element
 * @returns The first HTMLElement of the query if found, null otherwise
 *
 * @example Selecting an element with a data-* attribute and value
 * ```
 * querySelector(dom, 'div[data-field="value"]')
 * ```
 */
const querySelector = (dom: JSDOM, query: string): HTMLElement | null => {
    return (dom.window.document.querySelector(query) as HTMLElement) ?? null
}

/**
 *
 * @param descriptionDivElem The container element for description HTML to replace class font stylings with html stylings (<i> and <b>)
 */
const convertClasses = (descriptionDivElem: HTMLElement) => {
    for (const elem of descriptionDivElem.querySelectorAll('.a-text-italic')) {
        const elemHtml = elem.innerHTML
        elem.innerHTML = `<i>${elemHtml}</i>`
    }

    for (const elem of descriptionDivElem.querySelectorAll('.a-text-bold')) {
        const elemHtml = elem.innerHTML
        elem.innerHTML = `<b>${elemHtml}</b>`
    }
}

/**
 *
 * @param elem The element to strip classes of it, including the classes of its children
 */
const stripClassesTree = (elem: HTMLElement) => {
    if (elem.children.length > 0) {
        for (const child of elem.children)
            stripClassesTree(child as HTMLElement)
    }

    elem.removeAttribute('class')
}

export { convertClasses, querySelector, stripClassesTree }
