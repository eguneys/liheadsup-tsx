import { useParams } from '@solidjs/router'
import { For, onCleanup, createSignal, createMemo } from 'solid-js'
import { Socket } from './socket'

const Vs = () => {
  const params = useParams()

  let socket = Socket.make(`vs/${params.id}`, {
      })

  onCleanup(() => {
      socket.destroy()
      })

  return (<>
    

      </>)
}


export default Vs
