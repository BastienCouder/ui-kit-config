
import { Avatar } from './components/avatar'

function App() {

  return (
    <>
  <div className="space-x-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Avatar
          key={size}
          size={size}
          src="https://github.com/mehdibha.png"
          alt="@mehdibha"
          fallback="M"
        />
      ))}
    </div>
    </>
  )
}

export default App
