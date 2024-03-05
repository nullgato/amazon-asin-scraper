import readline from 'readline/promises'
import { getBookMetadata } from './data/book'
import { IBookMetadata } from './interfaces/IBookMetadata'
import { parseAmazonBookURL } from './parser'

const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const run = async () => {
    // TODO: Add ASIN validation regex
    // TODO: Support Amazon links
    const asinEntry = await readInput.question('Amazon ASIN(s) or URL: ')
    const asinCollection: string[] = []

    if (asinEntry.indexOf('https://') >= 0) {
        const asin = parseAmazonBookURL(asinEntry)
        if (asin === null) {
            console.error(
                'Could not parse the ASIN from url, please input ASIN manually'
            )
            await run()
            return
        }

        asinCollection.push(asin)
    } else {
        if (asinEntry.indexOf(',') >= 0)
            asinEntry.split(',').forEach((asin) => {
                asinCollection.push(asin)
            })
        else asinCollection.push(asinEntry)
    }

    const results: Array<IBookMetadata> = []
    const failures: string[] = []
    for (const asin of asinCollection) {
        console.log(`Getting metadata of: ${asin}...`)
        const result = await getBookMetadata(asin)
        if (result === null) failures.push(asin)
        else results.push(result)
    }

    for (const result of results) {
        console.log(`\n===== Result of ${result.asin} =====`)
        console.log(result.title)
        console.log(result.author)
        console.log('\n===== THUMBNAIL URL =====')
        console.log(result.imageUrl)
        console.log('\n===== DESCRIPTION HTML =====')
        console.log(result.descriptionHtml)
        console.log('\n===== DESCRIPTION TEXT =====')
        console.log(result.description + '\n')
        console.log('\n===== JSON =====')
        console.log(JSON.stringify({
            title: result.title,
            authors: [result.author],
            isbn: 'ASIN:' + result.asin,
            language: 'English',
            thumbnail: result.imageUrl
        }) + '\n')
    }

    if (failures.length > 0) {
        console.log(`\nFailed ASIN(s): ${failures.join(', ')}`)
        console.log('Consider waiting and trying again if an error occurred.\n')
    }
}

run()
