import { DataParserError, DataRetrievalError } from '../errors'
import { IBookMetadata } from '../interfaces/IBookMetadata'
import { parseBookProduct } from '../parser'

/**
 *
 * @param asin The ASIN number assigned to the book on the product page, or in the product URL.
 * @returns Metadata of the book upon success, null upon error.
 */
const getBookMetadata = async (asin: string): Promise<IBookMetadata | null> => {
    try {
        const response = await fetch(
            `https://www.amazon.com/gp/product/${asin}/`,
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
                },
            }
        )
        const html = await response.text()

        const book = parseBookProduct(html, asin)
        if (book === null) {
            console.error(new DataParserError())
            return null
        }

        return book
    } catch (error) {
        console.error(new DataRetrievalError(error as Error))
        return null
    }
}

export { getBookMetadata }
