import './ProductionStatus.css'
function ProductionStatus() 
{
    const productionLines = [
        {
          name: 'نورد یک',
          status: 'در حال تولید',
          statusType: 'running',
          coil: 'C-14050981',
          product: 'A1008',
          width: '1250 mm',
          thickness: '1.20 mm',
          speed: '480 m/min',
          production: '125.4 ton'
        },
        {
          name: 'نورد دو',
          status: 'در حال تولید',
          statusType: 'running',
          coil: 'C-14050982',
          product: 'A1010',
          width: '1350 mm',
          thickness: '1.50 mm',
          speed: '520 m/min',
          production: '142.8 ton'
        },
        {
          name: 'نورد سه',
          status: 'متوقف',
          statusType: 'stop',
          coil: 'C-14050983',
          product: 'A1015',
          width: '1200 mm',
          thickness: '0.90 mm',
          speed: '0 m/min',
          production: '98.2 ton'
        },
        {
          name: 'اسید شویی',
          status: 'در حال تولید',
          statusType: 'running',
          coil: 'C-14050984',
          product: 'A1008',
          width: '1300 mm',
          thickness: '1.80 mm',
          speed: '350 m/min',
          production: '156.7 ton'
        },
        {
          name: 'اسکین',
          status: 'در حال تولید',
          statusType: 'running',
          coil: 'C-14050985',
          product: 'A1010',
          width: '1250 mm',
          thickness: '0.80 mm',
          speed: '420 m/min',
          production: '134.5 ton'
        },
        {
          name: 'کارکتیو',
          status: 'تعمیرات',
          statusType: 'maintenance',
          coil: '-',
          product: '-',
          width: '-',
          thickness: '-',
          speed: '0 m/min',
          production: '72.3 ton'
        },
        {
          name: 'آنیل',
          status: 'در حال تولید',
          statusType: 'running',
          coil: 'C-14050987',
          product: 'A1008',
          width: '1280 mm',
          thickness: '1.10 mm',
          speed: '300 m/min',
          production: '118.6 ton'
        },
        {
          name: 'شستشوی الکترولیتی',
          status: 'متوقف',
          statusType: 'stop',
          coil: 'C-14050988',
          product: 'A1015',
          width: '1200 mm',
          thickness: '1.00 mm',
          speed: '0 m/min',
          production: '85.4 ton'
        }
      ]
      return (
        <div className="production-status">
    
          {/* Header */}
    
          <div className="production-status-header">
    
            <div>
    
              <h1>
                وضعیت فعلی تولید
              </h1>
    
              <p>
                وضعیت لحظه‌ای خطوط تولید
              </p>
    
            </div>
    
            <div className="live-status">
              ● آنلاین
            </div>
    
          </div>
    
    
          {/* Summary */}
    
          <div className="status-summary">
    
            <div className="status-summary-card">
    
              <span>
                خطوط در حال تولید
              </span>
    
              <strong>
                5
              </strong>
    
            </div>
    
    
            <div className="status-summary-card">
    
              <span>
                خطوط متوقف
              </span>
    
              <strong>
                2
              </strong>
    
            </div>
    
    
            <div className="status-summary-card">
    
              <span>
                تعمیرات
              </span>
    
              <strong>
                1
              </strong>
    
            </div>
    
    
            <div className="status-summary-card">
    
              <span>
                تولید فعلی
              </span>
    
              <strong>
                934.9 تن
              </strong>
    
            </div>
    
          </div>
    
    
          {/* Production Lines */}
    
          <div className="production-status-section">
    
            <h2>
              خطوط تولید
            </h2>
    
    
            <div className="production-table-wrapper">
    
              <table className="production-table">
    
                <thead>
    
                  <tr>
    
                    <th>
                      خط تولید
                    </th>
    
                    <th>
                      وضعیت
                    </th>
    
                    <th>
                      شماره کلاف
                    </th>
    
                    <th>
                      محصول
                    </th>
    
                    <th>
                      عرض
                    </th>
    
                    <th>
                      ضخامت
                    </th>
    
                    <th>
                      سرعت
                    </th>
    
                    <th>
                      تولید
                    </th>
    
                  </tr>
    
                </thead>
    
    
                <tbody>
    
                  {productionLines.map((line) => (
    
                    <tr key={line.name}>
    
                      <td className="line-name">
                        {line.name}
                      </td>
    
                      <td>
    
                        <span
                          className={`production-status-badge ${line.statusType}`}
                        >
                          {line.status}
                        </span>
    
                      </td>
    
                      <td>
                        {line.coil}
                      </td>
    
                      <td>
                        {line.product}
                      </td>
    
                      <td>
                        {line.width}
                      </td>
    
                      <td>
                        {line.thickness}
                      </td>
    
                      <td>
                        {line.speed}
                      </td>
    
                      <td className="production-value">
                        {line.production}
                      </td>
    
                    </tr>
    
                  ))}
    
                </tbody>
    
              </table>
    
            </div>
    
          </div>
    
    
          {/* Last Update */}
    
          <div className="last-update">
    
            آخرین بروزرسانی:
            <strong>
              لحظاتی پیش
            </strong>
    
          </div>
    
        </div>
      )
    }
    
    export default ProductionStatus