import readline from 'readline/promises'
import { getBookMetadata } from './data/book'

const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const run = async () => {
    const asin = await readInput.question('Amazon ASIN: ')
    const result = await getBookMetadata(asin)
    if (result === null) {
        console.log(
            '\nThe specified ASIN could not be scraped, please check the console for more information.'
        )
        console.log('Consider waiting and trying again if an error occurred.\n')

        await run()
        return
    }

    console.log('\n===== TITLE =====')
    console.log(result.title)
    console.log('\n===== AUTHOR =====')
    console.log(result.author)
    console.log('\n===== DESCRIPTION TEXT =====')
    console.log(result.description)
    console.log('\n===== DESCRIPTION HTML =====')
    console.log(result.descriptionHtml + '\n')

    await run()
}

run()
