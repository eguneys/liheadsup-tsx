import './lobby.scss'
import { For, onCleanup, createSignal, createMemo } from 'solid-js'
import { A } from '@solidjs/router'
import { Socket } from './socket'
import { Title } from '@solidjs/meta'

export type Hook = { by: string }

const MainPage = () => {

  let [hooks, setHooks] = createSignal<Array<Hook>>([])
  let [nbGames, setNbGames] = createSignal(0)
  let [nbUsers, setNbUsers] = createSignal(0)


  const mine = createMemo(() => hooks().filter(_ => _.by === Socket.me))
  const others = createMemo(() => hooks().filter(_ => _.by !== Socket.me))


  let socket = Socket.make('lobby', {
    nb_users(nb_users: number) {
      setNbUsers(nb_users)
    },
    nb_games(nb_games: number) {
      setNbGames(nb_games)
    },
    hlist(list: Array<Hook>) {
      setHooks(list)
    },
    hadd(hook: Hook) {
      setHooks(_ => {
          _ = _.filter(_ => _.by !== hook.by)
          _.push(hook)
          return _
          })
    },
    hrem(by: string) {
      setHooks(_ => _.filter(_ => _.by !== by))
    }
  })

  onCleanup(() => {
    socket.destroy()
    })

  const addHook = () => {
    if (mine().length > 0) {
      socket.send('hrem')
    } else {
      socket.send('hadd')
    }
  }

  const removeHook = () => {
    socket.send('hrem')
  }

  const joinHook =  (hook: Hook) => {
    socket.send('hjoin', hook)
  }

  return (<>
        <Title> liheadsup.com - Free Texas Hold'em Poker Online </Title>
        <div class="lobby">
          <div class="side">
            <div> <span>{nbGames()}</span> games played </div>
            <div> <span>{nbUsers()}</span> users online </div>
            <div class='footer'>
              <A href='/about'>About</A>
            </div>

          </div>
          <div class="app">
            <h2>Headsup Texas Hold'em Poker</h2>
            <button class='primary' onClick={() => addHook()}> New Headsup Match </button>
            <div> or join from lobby below </div>
            <h3> Lobby </h3>
            <ul class='lobby-list'>
              <For each={mine()}>{ hook =>
                 <li onClick={() => removeHook()} class='orange'> Headsup vs {hook.by} </li>
              }</For>
              <For each={others()}>{ hook =>
                <li onClick={() => joinHook(hook)}> Headsup vs {hook.by} </li>
              }</For>
            </ul>
          </div>
        </div>
      </>)
}

export default MainPage
