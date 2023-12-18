

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Accueil from './components/Accueil';
import Game from './components/Game';
import End from './components/End';
import './App.scss'

function App() {
  const maRoute = createBrowserRouter([
    {
      path: "/",
      element: <Accueil />,
    },
    {
      path: "/game",
      element: <Game />,
    },
    {
      path: "/end/:time",
      element: <End />,
    }
  ]);

  return (
    <RouterProvider router={maRoute} />
  )
}

export default App
