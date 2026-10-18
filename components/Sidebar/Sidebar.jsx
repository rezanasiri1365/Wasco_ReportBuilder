 import './Sidebar.css'
 function Sidebar({
    activePage,
    setActivePage
  }) {
    return (
      <aside className="sidebar">
  
        <div className="sidebar-logo">
  
          <div className="logo-title">
            WASCO
          </div>
  
          <div className="logo-subtitle">
            Automation Level 2
          </div>
  
        </div>
  
  
        <nav className="menu">
    {/* Dashboard */}
    <div className={`menu-item ${activePage === 'dashboard' ? 'active': ''}`} onClick={() => setActivePage('dashboard')} >
    <span className="menu-icon">
            🏠
          </span>
          <span>
            داشبورد کل خطوط
          </span>
    </div>       
    
        {/* Production Status */}
        <div className={`menu-item ${ activePage === 'production-status'? 'active' : ''}`} onClick={() => setActivePage('production-status')} >
        <span className="menu-icon">
            🏭
          </span>
          <span>
            وضعیت فعلی تولید
          </span>
        </div> 
                {/* Reports */}
        <div className="menu-item"  onClick={() => alert('بخش گزارش‌ها در مرحله بعد ساخته می‌شود')}>
        <span className="menu-icon">
            📊
          </span>
          <span>
            گزارش‌ها
          </span>

        </div>
        {/* Reports - Production Lines */} <div className={`submenu-item ${ activePage === 'report-rolling-1' ? 'active' : '' }`} onClick={() => setActivePage('report-rolling-1')} > 📄 گزارشات نورد یک </div> <div className={`submenu-item ${ activePage === 'report-rolling-2' ? 'active' : '' }`} onClick={() => setActivePage('report-rolling-2')} > 📄 گزارشات نورد دو </div> <div className={`submenu-item ${ activePage === 'report-rolling-3' ? 'active' : '' }`} onClick={() => setActivePage('report-rolling-3')} > 📄 گزارشات نورد سه </div> <div className={`submenu-item ${ activePage === 'report-pickling' ? 'active' : '' }`} onClick={() => setActivePage('report-pickling')} > 📄 گزارشات اسید شویی </div> <div className={`submenu-item ${ activePage === 'report-skin' ? 'active' : '' }`} onClick={() => setActivePage('report-skin')} > 📄 گزارشات اسکین </div> <div className={`submenu-item ${ activePage === 'report-corrective' ? 'active' : '' }`} onClick={() => setActivePage('report-corrective')} > 📄 گزارشات کارکتیو </div> <div className={`submenu-item ${ activePage === 'report-annealing' ? 'active' : '' }`} onClick={() => setActivePage('report-annealing')} > 📄 گزارشات آنیل </div> <div className={`submenu-item ${ activePage === 'report-electrolytic' ? 'active' : '' }`} onClick={() => setActivePage('report-electrolytic')} > 📄 گزارشات شستشوی الکترولیتی </div>
        {/* Settings */}
        <div          className="menu-item"          onClick={() => alert('بخش تنظیمات در مرحله بعد ساخته می‌شود')}        >
        <span className="menu-icon">
            ⚙️
          </span>
          <span>
            تنظیمات
          </span>
        </div>
        </nav>
        
      {/* Footer */}
  
        <div className="sidebar-footer">
          Automation Level2
        </div>
  
      </aside>
    )
  }
  
  export default Sidebar