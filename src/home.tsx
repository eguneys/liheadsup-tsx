import { createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import { Socket } from './socket'

const MainPage = () => {

  let [nbGames, setNbGames] = createSignal(0)
  let [nbUsers, setNbUsers] = createSignal(0)

  let socket = Socket.make('lobby', {
    nb_users(nb_users: number) {
      setNbUsers(nb_users)
    },
    nb_games(nb_games: number) {
      setNbGames(nb_games)
    }
  })

  return (<>
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
            <button class='primary'> New Headsup Match </button>
            <div> or join from lobby below </div>
            <h3> Lobby </h3>
            <ul class='lobby-list'>
             <li> Headsup vs username1 </li>
             <li> Headsup vs username2 </li>
             <li> Headsup vs username3 </li>
             <li> Headsup vs username4 </li>
            </ul>
          </div>
        </div>
      </>)
}

export default MainPage
