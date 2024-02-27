import { JSDOM } from 'jsdom'
import { ParserSelectorError } from './errors'
import { IBookMetadata } from './interfaces/IBookMetadata'
import { convertClasses, querySelector, stripClassesTree } from './utils'

/**
 *
 * @param dom The DOM of the parsed html to parse the title from
 * @returns The title if successful, otherwise null
 */
const parseBookTitle = (dom: JSDOM): string | null => {
    const titleElem = querySelector(dom, '#productTitle')
    if (titleElem === null || titleElem.textContent === null) {
        console.error(new ParserSelectorError())
        return null
    }

    return titleElem.textContent.trim()
}

/**
 *
 * @param dom The DOM of the parsed html to parse the author from
 * @returns The author if successful, otherwise null
 */
const parseBookAuthor = (dom: JSDOM): string | null => {
    const authorElem = querySelector(dom, '#bylineInfo a.a-link-normal')
    if (authorElem === null || authorElem.textContent === null) {
        console.error(new ParserSelectorError())
        return null
    }

    return authorElem.textContent.trim().replace('  ', ' ') // trims the second space between the first and last name
}

/**
 *
 * @param dom The DOM of the parsed html to parse the description text and html from
 * @returns An object containing the textContent and processed html of the description, otherwise null
 */
const parseBookDescription = (
    dom: JSDOM
): { processedHtml: string; rawText: string } | null => {
    const descriptionContainer = querySelector(
        dom,
        'div[data-feature-name="bookDescription"]'
    )
    if (
        descriptionContainer === null ||
        descriptionContainer.children.length === 0 ||
        descriptionContainer.children[0].children.length === 0
    ) {
        console.error(new ParserSelectorError())
        return null
    }

    const descriptionDivElem = descriptionContainer.children[0]
        .children[0] as HTMLElement
    if (
        descriptionDivElem.innerHTML.length === 0 ||
        descriptionDivElem.textContent === null
    ) {
        console.error(new ParserSelectorError())
        return null
    }

    convertClasses(descriptionDivElem as HTMLElement)
    for (const elem of descriptionDivElem.children)
        stripClassesTree(elem as HTMLElement)

    // TODO: Maybe parse for errors within the convert/strip functions since success is expected behavior?

    return {
        processedHtml: descriptionDivElem.innerHTML,
        rawText: descriptionDivElem.textContent,
    }
}

/**
 *
 * @param html The html from the product page
 * @returns The book product's metadata if successful, otherwise null
 */
const parseBookProduct = (html: string, asin: string): IBookMetadata | null => {
    const dom = new JSDOM(html)

    // TODO: Parse to catch captcha error, or possibly other errors

    const title = parseBookTitle(dom)
    if (title === null) return null

    const author = parseBookAuthor(dom)
    if (author === null) return null

    const description = parseBookDescription(dom)
    if (
        description === null ||
        description.processedHtml === null ||
        description.rawText === null
    )
        return null

    return {
        asin,
        title,
        author,
        description: description.rawText,
        descriptionHtml: description.processedHtml,
    }
}

export { parseBookProduct }
