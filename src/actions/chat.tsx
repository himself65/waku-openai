'use server'
import { getEnv } from 'waku'

const apiKey = getEnv('A')!

export async function generateResponse () {
  return `apiKey: ${apiKey}`
}
