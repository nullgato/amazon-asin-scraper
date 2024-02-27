import readline from 'readline/promises'
import { getBookMetadata } from './data/book'
import { IBookMetadata } from './interfaces/IBookMetadata'

const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const run = async () => {
    // TODO: Add ASIN validation regex
    const asinEntry = await readInput.question('Amazon ASIN: ')
    const asinCollection: string[] = []

    if (asinEntry.indexOf(',') >= 0)
        asinEntry.split(',').forEach((asin) => {
            asinCollection.push(asin)
        })
    else asinCollection.push(asinEntry)

    const results: Array<IBookMetadata> = []
    const failures: string[] = []
    for (const asin of asinCollection) {
        const result = await getBookMetadata(asin)
        if (result === null) failures.push(asin)
        else results.push(result)
    }

    for (const result of results) {
        console.log(`\n===== Result of ${result.asin} =====`)
        console.log(result.title)
        console.log(result.author)
        console.log('\n===== DESCRIPTION HTML =====')
        console.log(result.descriptionHtml)
        console.log('\n===== DESCRIPTION TEXT =====')
        console.log(result.description + '\n')
    }

    if (failures.length > 0) {
        console.log(`\nFailed ASIN(s): ${failures.join(', ')}`)
        console.log('Consider waiting and trying again if an error occurred.\n')
    }
}

run()
