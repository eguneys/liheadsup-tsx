import './vs.scss'
import { useParams } from '@solidjs/router'
import { For, onCleanup, createSignal, createMemo } from 'solid-js'
import { Socket } from './socket'
import { Title } from '@solidjs/meta'

const Vs = () => {

  
  let opponent = createMemo(() => 'opponent')

  const params = useParams()

  let socket = Socket.make(`vs/${params.id}`, {
      })

  onCleanup(() => {
      socket.destroy()
      })

  return (<>
    <Title>Heads Up Texas Holdem Poker vs {opponent()} </Title>
    <div class="vs">
      <div class='side'>
        <div class='info'>
          <div> Heads Up Texas Holdem Poker</div>
          <div><span> user </span> vs <span> opponent </span></div>
          <div>{new Date().toUTCString()}</div>
        </div>
        <div class='chat'>
        </div>
      </div>
      <div class='board'>
      </div>
      <div class='replay'>
        <Replay/>
      </div>
    </div>
  </>)
}

const Replay = () => {
  return (<>
    
    <div class='move-list'>
    <div class='title'>Moves </div>
    <ul>
      <li> Opponent checked. </li>
      <li> You raised <span class='chips'>50$</span>. </li>
      <li> Opponent called <span class='chips'>50$</span>. </li>
      <li> You went all in! </li>
      <li> Opponent folded. </li>
    </ul>
    </div>
    <div class='status-bar'>
      <div> Pot <span class='chips'> 950$ </span> </div>
    </div>
    <div class='action-bar'>
      <div class='title'>Action</div>
      <div class='opponent'>Opponent <span class='chips'>100$</span></div>
      <div class='timebar'><Timebar seconds={10} onFlag={() => console.log('flag')}/></div>
    </div>
    <div class='controls'>
      <button>Leave</button>
    </div>
    </>)
}

type TimebarProps = { seconds: number, onFlag: () => void }
const Timebar = (props: TimebarProps) => {
  

  const [seconds, setSeconds] = createSignal(props.seconds)
  
  const t = createMemo(() => Math.min(1, seconds() / 30))

  const style = createMemo(() => ({ width: `${t() * 100}%` }))

  let last = Date.now()
  function tick() {

    let now = Date.now()
    let elapsed = now - last
    last = now
    
    setSeconds(_ => _ + elapsed/1000)
    if (t() === 1) {
      props.onFlag()
    } else {
      requestAnimationFrame(tick)
    }
  }
  requestAnimationFrame(tick)

  return (<span class='bar' style={style()}></span>)
}

export default Vs
