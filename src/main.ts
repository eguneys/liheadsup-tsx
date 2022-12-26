import "./style.scss"
import { render } from 'solid-js/web'
import { MyApp } from './myapp'

function app(element: HTMLElement) {
  render(MyApp, element)
}


app(document.getElementById('app')!)
