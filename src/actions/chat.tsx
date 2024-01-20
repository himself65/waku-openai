'use server'
import OpenAI from 'openai'
import { getEnv } from 'waku'

const apiKey = getEnv('OPENAI_API_KEY')!

export const openai = new OpenAI({
  apiKey
})

type ContentProps = {
  reader: ReadableStreamDefaultReader<any>
}

const Content = async (props: ContentProps) => {
  const reader = props.reader
  const content = await reader.read()
  if (content.value === undefined) {
    return null
  }
  const value = JSON.parse(
    Buffer.from(content.value).toString('utf-8')).choices[0]?.delta?.content
  console.log('v', value)
  const done = content.done
  return (
    <>
      <>
        {value}
      </>
      {
        done ? null : <Content reader={reader}/>
      }
    </>
  )
}

export async function generateResponse () {
  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'Hello, I am a chatbot that can answer questions about the Waku framework.'
      }
    ],
    model: 'gpt-3.5-turbo',
    stream: true
  })
  return <Content reader={stream.toReadableStream().getReader()}/>
}
