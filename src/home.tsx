import { A } from '@solidjs/router'

const MainPage = () => {
  return (<>
        <div class="lobby">
          <div class="side">
            <div> <span> 10 </span> games played </div>
            <div> <span> 30 </span> users online </div>
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
