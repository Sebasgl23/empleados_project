import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import Router from './Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>    
  <Router />
</BrowserRouter>
)
