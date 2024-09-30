import NamedRoute from "./components/NamedRoute"
import { Switch } from "wouter"

function App() {
  return (
    <>
      <Switch>
        <NamedRoute name="login" page={<h1>Hello,World</h1>} />
      </Switch>
    </>
  )
}

export default App
