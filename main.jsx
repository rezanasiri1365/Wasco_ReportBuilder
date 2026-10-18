import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if(!Object.hasOwn){
    Object.hasOwn=function(object,property){
      return Object.prototype.hasOwnProperty.call(object,property)
    };
}
createRoot(document.getElementById('root')).render(
 
  <App />
  /*<StrictMode>
    
  </StrictMode>,*/
)
