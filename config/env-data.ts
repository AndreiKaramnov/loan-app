import dotenv from 'dotenv'

if (process.env.CI !== 'true') {
    dotenv.config({ path: 'env/prod.env' })
    console.log('Running in local environment')
} else {
    console.log('Running in CI environment')
}

const requiredVars = ['URL_FIRST', 'URL_SECOND']

// Check for missing variables
requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`)
    }
})

export const SERVICE_URL: string = process.env.URL_FIRST!
export const DETAILS_URL: string = process.env.URL_SECOND!