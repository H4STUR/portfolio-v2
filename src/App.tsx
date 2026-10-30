import { useRevealAll } from './hooks/useReveal'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import DockerPs from './components/DockerPs'
import Work from './components/Work'
import Stack from './components/Stack'
import GitLog from './components/GitLog'
import Ide from './components/Ide'
import Footer from './components/Footer'

export default function App() {
  useRevealAll()
  return (
    <>
      <TopBar />
      <Hero />
      <DockerPs />
      <Work />
      <Stack />
      <GitLog />
      <Ide />
      <Footer />
    </>
  )
}
