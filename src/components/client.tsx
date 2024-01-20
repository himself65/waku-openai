import { useFormState } from "react-dom"
import { generateResponse } from '../actions/chat.js'

export function Client () {
  const [state, dispatch] = useFormState(
    generateResponse,
    null
  )
  return (
    <div>
      {state}
      <button
        onClick={() => {
          dispatch()
        }}
      >
        Generate Response
      </button>
    </div>
  )
}
