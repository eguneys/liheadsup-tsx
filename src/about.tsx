import "./about.scss"
import { Title } from '@solidjs/meta'

const About = () => {

  return (<>
   <Title> liheadsup.com - About </Title>
   <div class="about">
     <h2> About </h2>
     <p> liheadsup.com is a website to play competitive Texas Holdem Poker as a game on the browser.</p>
     <p> It doesn't involve any real money, or support any sort of gambling. </p>
     <p> It is entirely free, and open to anyone.</p>
     <p> Currently it only supports Heads Up Tournament style play. Please be part of the community by using this website.</p>
     <p> Feature requests are welcome and appreciated via <a href="https://github.com/eguneys/liheadsup">Github</a>. </p>
     <p> Support the project by donating to my personal <a href="https://www.patreon.com/eguneys">Patreon</a>.</p>
   </div>
</>)
}


export default About
