import Hero from "./components/Hero"
import { BackgroundBeams } from "./components/ui/backgroundbeams"

const App:React.FC = () => {
  return (
    <div className="bg-black text-white">
      <Hero/>
      <BackgroundBeams/>
    </div>
  )
}

export default App
