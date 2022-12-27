import { createSignal, createEffect, on } from 'solid-js'
import { useNavigate, Router, Routes, Route, A} from '@solidjs/router'
import { lazy } from 'solid-js'
import { Socket, generic_handlers } from './socket'
import { MetaProvider } from '@solidjs/meta'

const About = lazy(() => import('./about'))
const MainPage = lazy(() => import('./home'))
const Vs = lazy(() => import('./vs'))

type Redirect = { redirect: string }

export const MyApp = () => {
  return (<>
      <Router>
        <MetaProvider>
          <AppInRouter/>
        </MetaProvider>
      </Router>
      </>)
}


const AppInRouter = () => {

  const [hello, setHello] = createSignal('..')
  const [redirect, setRedirect] = createSignal<Redirect | undefined>(undefined, { equals: false })

  generic_handlers({
    cookie(id: string) {
    let expires = new Date()
    expires.setTime(expires.getTime() + (365*24 * 60 * 60 * 1000)) 
    document.cookie = `lihe=${id}; expires=${expires.toUTCString()}; path=/`
    },
    hello(name: string) {
      Socket.me = name
      setHello(name)
    },
    redirect(redirect: Redirect) {
    setRedirect(redirect)
    }
  })

  createEffect(on(redirect, redirect => {
    if (redirect && redirect.redirect) {

    const navigate = useNavigate()
    navigate(redirect.redirect, { replace: true })
    }
    }))


  return (<>
      <div class='liheadsup'>
          <div class='navbar'>
            <div class='title'>
              <A href="/"> liheadsup<span>.com</span></A>
            </div>
            <div class="dasher">
              <div>Hello {hello()}</div>
            </div>
    
          </div>
          <div class='main'>
            <Routes>
              <Route path="/" component={MainPage}/>
              <Route path="/about" component={About}/>
              <Route path="/vs/:id" component={Vs}/>
            </Routes>
          </div>
        </div>
      </>)

}


