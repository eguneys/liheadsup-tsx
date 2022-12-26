import { Router, Routes, Route, A} from '@solidjs/router'
import { lazy } from 'solid-js'

const About = lazy(() => import('./about'))
const MainPage = lazy(() => import('./home'))
const Vs = lazy(() => import('./vs'))

export const MyApp = () => {

  return (<>
      <Router>
        <div class='liheadsup'>
          <div class='navbar'>
            <div class='title'>
              <A href="/"> liheadsup<span>.com</span></A>
            </div>
            <div class="dasher">
              <div>Hello username</div>
            </div>
    
          </div>
          <Routes>
            <Route path="/" component={MainPage}/>
            <Route path="/about" component={About}/>
            <Route path="/vs/:id" component={Vs}/>
          </Routes>
        </div>
      </Router>
      </>)
}

