import { useEffect, useState } from 'react'
import './CRM2Main.css'
import ReportViewer from '../ReportViewer/ReportViewer'

function CRM2Main() {
  const [reports, setReports] = useState([])
  const[SelectedReport,setSelectedReport]=useState(null)
  
  useEffect(() => {
    const loadReports=async ()=>
    {
      try
      {
        const RequestData={
          Reportid:0,
          _DB:'NULL',
          procName:'NULL',
          Title:'T_SPReportBase',
          Condition:'NULL',
          condition_Sort:'NULL',
          condition_Groupby:'NULL'
        }
        

        const response=await fetch(
          '/reportBuilderUI/ApiEngCRM2/api/ApiHandler?sp_name=R_SPReportBase',
           {
            method:'POST',

            headers:{
              'Content-Type':'application/json;charset=utf-8',
            },
           body:JSON.stringify(RequestData)

        })

        const responseText=await response.text()
        console.log('==============API RESPONSE ================')
        console.log('status: ',response.status)
        console.log('OK:',response.ok)
        console.log('response:',responseText)
        console.log('=====================================================')
        if(!response.ok)
        {
          console.error('API ERROR',response.status,responseText)
          return
        }
        
        let data=JSON.parse(responseText);
        console.log('parsed json data',data);
        if(typeof data==='string')
        {
          data=JSON.parse(data)
        }
        if(Array.isArray(data)){
          const VisibleReport=data.filter(report=>report.isReportVisible===true)
          console.log('VisibleReports : ',VisibleReport)
          setReports(VisibleReport)
          
        }
        else {console.error('API Response is not array',data)
        setReports([])
      }
      }
      catch(error)
      {
        alert('ErrorName ='+error.name+'\n ErrorMessage ='+error.message)
        alert('خطا در دریافت API  گزارشات\n'+error.message)
        console.error('خطا در دریافت لیست گزارشات')
      }
    }
    loadReports()
  }, [])
  

  const openReport = (report) => { 
    console.log('Selected Report ',report)
    setSelectedReport(report) 
  }

  const backtoReport=()=>{setSelectedReport(null)}    
  if(SelectedReport){
    return <ReportViewer report={SelectedReport} reports={reports} onback={backtoReport} />
  }

  return (
    <div className="crm1-page">
      <div className="crm1-header">
        <div>
      <h1>
        گزارشات نورد دو
      </h1>

      <p>
        لیست گزارش‌های قابل دسترسی برای نورد دو
      </p>

      </div>
      </div>
      <div className="reports-card">
      <table className="reports-table">
      <thead>

<tr>

  <th>
    ردیف
  </th>

  <th>
    نام گزارش
  </th>
 
  <th>
    عملیات
  </th>

</tr>

</thead>

<tbody>
{reports.map((report, index) => (
   <tr key={report.ID}>

   <td>
     {index + 1}
   </td>
   <td className="report-title">
      {report.ReportTitle}
   </td>
   
   <td>
    <button  className="open-report-button"  onClick={() => openReport(report)}>  OPEN REPORT </button>
</td>
</tr>
))}
  </tbody>
  
  </table>
  {
    reports.length===0 && (
      <div className='empty-reports'>گزارشی برای نمایش وجود ندارد 
      </div>      
    )
  }
  </div>
  </div>
  )
  }
  export default CRM2Main
  