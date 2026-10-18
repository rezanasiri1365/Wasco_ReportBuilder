import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './Page/Dashboard/Dashboard'
import ProductionStatus from './Page/ProductionStatus/ProductionStatus'
import BAF from './Page/Reports/BAF/BAFMain'
import CORE from './Page/Reports/CORE/COREMain'
import CRM1 from './Page/Reports/CRM1/CRM1Main'
import CRM2 from './Page/Reports/CRM2/CRM2Main'
import CRM3 from './Page/Reports/CRM3/CRM3Main'
import ECL from './Page/Reports/ECL/ECLMain'
import PPL from './Page/Reports/PPL/PPLMain'
import SKP from './Page/Reports/SKP/SKPMain'


import './App.css'

function App() {

  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {

    switch (activePage) {

      case 'dashboard':
      return <Dashboard />

    case 'production-status':
      return <ProductionStatus />

    case 'report-rolling-1':
      return <CRM1 />

    case 'report-rolling-2':
      return <CRM2 />

    case 'report-rolling-3':
      return <CRM3 />

    case 'report-pickling':
      return <PPL />

    case 'report-skin':
      return <SKP />

    case 'report-corrective':
      return <CORE />

    case 'report-annealing':
      return <BAF />

    case 'report-electrolytic':
      return <ECL />

      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">

      {/* Header */}
      <header className="header">

        <div className="header-title">
          فولاد غرب آسیا
        </div>

        <div className="header-user">
          👤 کاربر
        </div>

      </header>


      {/* Main */}
      <div className="main">

        <Sidebar activePage={activePage}  setActivePage={setActivePage} />

        {/* Content */}
        <main className="content">

        {renderPage()}


        </main>

      </div>


      {/* Footer */}
      <footer className="footer">

        <span>
          © Wasco Automation Level2
        </span>

        <span>
          فولاد غرب آسیا
        </span>

      </footer>

    </div>
  )
}

export default App