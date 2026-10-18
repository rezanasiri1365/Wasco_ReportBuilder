import './Dashboard.css'

function Dashboard() {

    const productionLines = [
      {
        name: 'نورد یک',
        status: 'در حال تولید',
        statusType: 'running',
        tonnage: '125.4',
        kilometers: '18.6',
        downtime: '12 دقیقه'
      },
      {
        name: 'نورد دو',
        status: 'در حال تولید',
        statusType: 'running',
        tonnage: '142.8',
        kilometers: '21.3',
        downtime: '8 دقیقه'
      },
      {
        name: 'نورد سه',
        status: 'متوقف',
        statusType: 'stop',
        tonnage: '98.2',
        kilometers: '14.7',
        downtime: '46 دقیقه'
      },
      {
        name: 'اسید شویی',
        status: 'در حال تولید',
        statusType: 'running',
        tonnage: '156.7',
        kilometers: '24.1',
        downtime: '5 دقیقه'
      },
      {
        name: 'اسکین',
        status: 'در حال تولید',
        statusType: 'running',
        tonnage: '134.5',
        kilometers: '19.8',
        downtime: '11 دقیقه'
      },
      {
        name: 'کارکتیو',
        status: 'تعمیرات',
        statusType: 'maintenance',
        tonnage: '72.3',
        kilometers: '10.2',
        downtime: '1 ساعت'
      },
      {
        name: 'آنیل',
        status: 'در حال تولید',
        statusType: 'running',
        tonnage: '118.6',
        kilometers: '17.9',
        downtime: '9 دقیقه'
      },
      {
        name: 'شستشوی الکترولیتی',
        status: 'متوقف',
        statusType: 'stop',
        tonnage: '85.4',
        kilometers: '12.8',
        downtime: '35 دقیقه'
      }
    ]
  
  
    return (
      <div className="dashboard">
  
        {/* Page Header */}
  
        <div className="dashboard-header">
  
          <div>
            <h1>
              داشبورد کل خطوط
            </h1>
  
            <p>
              نمای کلی وضعیت خطوط تولید
            </p>
          </div>
  
          <div className="dashboard-time">
            آخرین بروزرسانی: لحظاتی پیش
          </div>
  
        </div>
  
  
        {/* Summary Cards */}
  
        <div className="summary-cards">
  
          <div className="summary-card">
  
            <div className="summary-title">
              خطوط فعال
            </div>
  
            <div className="summary-value">
              5
            </div>
  
            <div className="summary-description">
              از ۸ خط تولید
            </div>
  
          </div>
  
  
          <div className="summary-card">
  
            <div className="summary-title">
              خطوط متوقف
            </div>
  
            <div className="summary-value">
              2
            </div>
  
            <div className="summary-description">
              توقف فعلی
            </div>
  
          </div>
  
  
          <div className="summary-card">
  
            <div className="summary-title">
              تعمیرات
            </div>
  
            <div className="summary-value">
              1
            </div>
  
            <div className="summary-description">
              خط در تعمیرات
            </div>
  
          </div>
  
  
          <div className="summary-card">
  
            <div className="summary-title">
              تولید امروز
            </div>
  
            <div className="summary-value">
              934.9
            </div>
  
            <div className="summary-description">
              تن
            </div>
  
          </div>
  
        </div>
  
  
        {/* Production Lines */}
  
        <div className="section">
  
          <div className="section-title">
            وضعیت خطوط تولید
          </div>
  
  
          <div className="production-grid">
  
            {productionLines.map((line) => (
  
              <div
                className="production-card"
                key={line.name}
              >
  
                <div className="production-card-header">
  
                  <h3>
                    {line.name}
                  </h3>
  
                  <span
                    className={`status ${line.statusType}`}
                  >
                    {line.status}
                  </span>
  
                </div>
  
  
                <div className="production-data">
  
                  <div className="data-item">
  
                    <span>
                      تولید
                    </span>
  
                    <strong>
                      {line.tonnage} تن
                    </strong>
  
                  </div>
  
  
                  <div className="data-item">
  
                    <span>
                      مسافت تولید
                    </span>
  
                    <strong>
                      {line.kilometers} km
                    </strong>
  
                  </div>
  
  
                  <div className="data-item">
  
                    <span>
                      توقف
                    </span>
  
                    <strong>
                      {line.downtime}
                    </strong>
  
                  </div>
  
                </div>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
  
        {/* Downtime */}
  
        <div className="section">
  
          <div className="section-title">
            توقفات سه شیفت گذشته
          </div>
  
  
          <div className="downtime-card">
  
            <div className="shift">
  
              <span>
                شیفت اول
              </span>
  
              <strong>
                42 دقیقه
              </strong>
  
            </div>
  
  
            <div className="shift">
  
              <span>
                شیفت دوم
              </span>
  
              <strong>
                67 دقیقه
              </strong>
  
            </div>
  
  
            <div className="shift">
  
              <span>
                شیفت سوم
              </span>
  
              <strong>
                31 دقیقه
              </strong>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
    )
  }
  
  export default Dashboard