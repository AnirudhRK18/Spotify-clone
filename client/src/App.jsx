import { useContext, useState } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { Playercontext } from './context/Playercontext';




function App() {
  const [count, setCount] = useState(0);


  const {audioref,track,songsData}=useContext(Playercontext);

  return (
    <>
    <div className='h-screen w-full bg-black'>
      {
        songsData.length!==0 ? <>
          <div className='h-[90%] flex'>
      <Sidebar/>
      <Display/>
     </div>
        </>:null
      }
   
     <Player/>
     <audio src={track?track.audio:""} ref={audioref}  preload=" auto"></audio>
    </div>
    </>
  )
}
export default App
