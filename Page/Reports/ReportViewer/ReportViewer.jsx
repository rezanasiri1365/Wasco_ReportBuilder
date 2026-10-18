import { useEffect,useMemo,useState } from 'react'
import * as XLSX from 'xlsx'

import {ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend} from 'recharts'

import './ReportViewer.css'

const XAxisTick=({x,y,payload})=>{
    const date=new Date(payload.value)
    const mm=String(date.getMinutes()).padStart(2,"0")
    const ss=String(date.getSeconds()).padStart(2,"0")
    const hh=String(date.getHours()).padStart(2,"0")
    return(
        <g transform={'translate(' + x +',' + y+')'}>
            <text x={0} y={0} dy={15} textAnchor='middle' fontSize={12}> {mm+':'+ss}</text>
            <text x={0} y={0} dy={35} textAnchor='middle' fontSize={11} fill='#666'> {hh+':00'}</text>
        </g>
    )
  }

function ReportViewer({report,reports,onback})
{
    const [xcolumn,setXcolumn]=useState('')
    const [ycolumn,setYcolumn]=useState([])
    const [data,setData]=useState([])
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState('')
    const [filters,setFilters]=useState({})
    const [viewMode,setViewMode]=useState('table')
    const [chartType,setChartType]=useState('table')
    const [SelectedFilters,setSelectedFilters]=useState({});

    useEffect(()=>{
        if(!report)
    {
        console.log('ریپورت وجود ندارد ')
        return
    }
    
    const controller=new AbortController()
   
    /*const RequestData={
        Reportid:'NULL',
        _DB:'NULL',
        procName:'NULL',
        Title:report.Title,
        Condition:report.Condition,
        condition_Sort:report.condition_Sort,
        condition_Groupby:'NULL'
      }*/
      const RequestData={
        Reportid:'NULL',
        _DB:'NULL',
        procName:'NULL',
        Title:report.Title,
        Condition:'NULL',
        condition_Sort:'NULL',
        condition_Groupby:'NULL'
      }

      console.log('ReportRequest',RequestData)

      const formatMinuteSecond=(timestamp)=>{
        const date=new Date(timestamp)
        const minutes=String(date.getMinutes()).padStart(2,"0")
        const seconds=String(date.getSeconds()).padStart(2,"0")
        return minutes+':'+seconds;
      };

      

      const loadreport=async()=>{
        setloading(true)
        seterror('')
        setData([])
        setFilters({})
        setViewMode('table')

        try{
        const response= await fetch(
        '/reportBuilderUI/ApiEngCRM2/api/ApiHandler?sp_name=R_SPReportBase',
         {
          method:'POST',

          headers:{
            'Content-Type':'application/json;charset=utf-8',
          },
         body:JSON.stringify(RequestData),
        signal:controller.signal
      })
      if(!response.ok)
      {
        console.log('Error reposnse Statuse'+response.status)
        throw new Error('Error reposnse Statuse'+response.status)
      }
      const responseText= await response.text()

      console.log('raw report response '+responseText)


      let result =JSON.parse(responseText)

      if(typeof result==="string" )
      {
        result =JSON.parse(result)
      }

      console.log('Parsed Report result ', result)

      if(Array.isArray(result))
      {
        setData(result)
      }else{
        console.error('Report Api Result is not Array',result)
        setData([])
        seterror(' آ رایه نیست خروجی گزارش ')
      }
}
catch(err)
{
    console.error('Report Api Error ',err)
    seterror(err.message)
}
finally{
    setloading(false)
}
      }
loadreport()
      },[report])

     

const columns=useMemo(()=>{
    return data.length>0 ? Object.keys(data[0]):[]
  },[data])

    /*const columns = data.length>0 ? Object.keys(data[0]) : []
    const columns =  Object.keys(data[0]).map(key=>({
        field:key,type:"string"
    }))*/

    const getCellValue=(value)=>{
        if(value===null || value===undefined){
            return ''
        }
        if(typeof value==='object')
        {
              try {
                return JSON.stringify(value)
              } catch (error) {
                return ''
              }     
        }
     return String(value)
    }
    
    const filteredData=useMemo(()=>{

        if(!data || data.length===0){
            return []
        }

        return data.filter((row)=>
        {
            const comboMatch=Object.entries(SelectedFilters).every(
                ([column,selectedValue])=>{
                    if(selectedValue === null || selectedValue === undefined || selectedValue === "" ){
                        return true;
                    }
                    return String(row[column] ?? '')===String(selectedValue);
                }
            );

            if(!comboMatch){
                return false;
            }
            
            const textmatch=Object.entries(filters).every(
                ([column,filterValue]) => {
                    if(!filterValue || String(filterValue).trim()==="")
                    {
                        return true;
                    }
                    const cellValue=row[column];

                    return String(cellValue ?? "").toLowerCase().includes(String(filterValue).toLowerCase());
                }
            );
            return textmatch;
        });
      
    },[data,SelectedFilters,filters]);

    const chartSourceData=useMemo(()=>{
        return filteredData
    },[filteredData])

    const filterColumns=useMemo(()=>{
        if(!data || data.length===0){
            return [];
        }
        const _columns=Object.keys(data[0]);
        return _columns.filter(_column=>{
            const _name = _column.toLocaleLowerCase();
            return(_name.includes("id") || _name.includes("name"));
        });
    },[data]    )


    const filteroptions=useMemo(()=>{
        const _result={};
        if(!data || data.length===0){
            return _result;
        }
        filterColumns.forEach(column=>{
            const valueMap=new Map();
            data.forEach((row)=>{
                const value=row[column];
                if(value===null || value===undefined || String(value).trim()==="" )    
                {
                    return;
                }
                const key=String(value);
                const time=new Date(row.DateTime).getTime();
                const oldTime=valueMap.get(key);
                if(oldTime===undefined || time>oldTime){
                    valueMap.set(key,time);
                }
            });
            _result[column]=[...valueMap.entries()].sort((a,b)=>b[1]-a[1]).map(([value])=>value);
        });
        return _result;
        /*filterColumns.forEach(column=>{
            
            const values=data.map(row=>row[column]).filter(value=>value!==null && value!==undefined && String(value).trim()!=='').map(value=>String(value));
            _result[column]=[... new Set(values)];
        });
        return _result;
*/
    },[data,filterColumns]);

    const handlecomboFilterChange=(column,value)=>{
        console.log("column" ,column)
        console.log("Value" ,value)
        setSelectedFilters(perv=>({
            ...perv,[column]:value
        }));
    };

    const displayData=useMemo(()=>{
        if(!data || data===0){
            return [];
        }
        return data.filter(row=>{
            return Object.entries(SelectedFilters).every(
                ([column,selectedValue])=>{
                    if(!selectedValue){
                        return true;
                    }
                    return String(row[column])===String(selectedValue);
                }
            )
        });
    },[data,SelectedFilters]);

    const datecolumns=useMemo(()=>{

        const isDateValue=(value)=>{
            if(value===null || value ===undefined){
                return false;
            }
            const text=String(value).trim();
            if(!text){
                return false;
            }
            const isoDatetimepattern=/^\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?/;
            if(!isoDatetimepattern.test(text)){
                return false;
            }
            const date=new Date(text);
            return !isNaN(date.getTime());
        };

        return columns.filter(column=>{
            const values = chartSourceData
            .map(row=> row[column])
            .filter( value => value !==null && value !== undefined && String(value).trim() !== '');
            if(values.length===0)
            {
                return false;  
            }
            
        return values.every(isDateValue);
        });
    },[columns,chartSourceData]);

     /*const numericCoulmns=useMemo(()=>{
        const isNumeric=(value)=>{
            if(typeof value==='number'){
                return Number.isFinite(value)
            }
            
            if(typeof value !=='string' || !value.trim()){
                return false;
            }
            
        return Number.isFinite(Number(value.trim()))

        }
        return columns.filter((column)=>{
            const values=data.map((row)=>row[column]).filter((value)=>
            value!==null && value!==undefined && value !=='')
            return(values.length>0 && values.every(isNumeric))
        })
     },[columns,data])*/

     const numericCoulmns=useMemo(()=>{

        return columns.filter( _column =>{
            const values=chartSourceData
            .map(row => row[_column])
            .filter(value => value!== null && value!== undefined && String(value).trim()!=='');

            if(values.length===0){
                return false;
            }
            
        return values.every(value=>{
            if(typeof value==='number'){
                return Number.isFinite(value);
            }
            
        return Number.isFinite(Number(String(value).trim()));
        });

        });
     },[columns,chartSourceData])

     const categoryColumn=useMemo(()=>{
        return columns.find((column)=>!numericCoulmns.includes(column)) || ''
     },[columns,numericCoulmns])

     const effectiveXcolumn= useMemo(()=> {
        return datecolumns[0] || '';

     },[datecolumns])

     const effectiveYcolumn=useMemo(()=>{
        return numericCoulmns[0] || ''
        
     },[numericCoulmns])

     const childReports=useMemo(()=>{
        console.log("Current Report ID:", report.ID);
        

        
        reports.forEach(item => {
            console.log(
                "Report:",
                item.ReportTitle,
                "ID:",
                item.ID,
                "ParentID:",
                item.ParentID
            );
        });
        return reports.filter(item=>String(item.ParentID)===String(report.ID));   
     },[reports,report]);
     
console.log("Current Report:", report);
console.log("All Reports:", reports);
console.log("Child Reports:", childReports);

    const chartData=useMemo(()=>{

        /*if(!effectiveXcolumn || !effectiveYcolumn)
        {
            return []
        }
        return filteredData.map(row=>{
            const rawDate=row[effectiveXcolumn]
            const rawValue=row[effectiveYcolumn]
            if(rawDate==null || rawValue ==null || rawDate==='' || rawValue==='')
            {
                return null
            }
            const date=new Date(rawDate)
            const value=Number(rawValue)
            if(Number.isNaN(date.getTime()) || !Number.isFinite(value))
            {
                return null
            }
            return {
                x:date.toLocaleString('fa-IR'),
                y:value
            }
        }).filter(Boolean)*/

        if(!effectiveXcolumn || ycolumn.length===0 || !chartSourceData?.length || chartSourceData?.length===0)
        {
            return [];
        }
         
        return chartSourceData.map(row => {
            const _rawDate=row[effectiveXcolumn]
            /*const _rawValue=row[ycolumn]*/
            if(_rawDate === null || _rawDate === '' || _rawDate === undefined)
            {
                return null
            }

            const _date=new Date(_rawDate)

            /*const _value=Number(_rawValue)*/
            if(Number.isNaN(_date.getTime()) )
            {
                return null
            }
            const result={
                x:_date.getTime(),
                time:_date.toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit',second:'2-digit' ,hour12:false}),
                date:_date.toLocaleDateString('fa-IR')
            };
            ycolumn.forEach( column => {
                const _rowvalue = row[column];
                if(_rowvalue === null || _rowvalue === '' || _rowvalue === undefined || !Number.isFinite(Number(_rowvalue)))
                {
                    result[column] = null;
                }else{
                    result[column] = Number(_rowvalue);
                }
            });
            return result;
        }).filter(Boolean)
        .sort((a,b)=>a.x-b.x)
    },[chartSourceData,effectiveXcolumn,ycolumn])

    const chartDataSelective=useMemo(()=>{
        if(!xcolumn || !ycolumn){
            return []
        }
        return data
        .map((row)=>({
            x:Number(row[xcolumn]),
            x:Number(row[ycolumn])
        }))
        .filter((item)=> Number.isFinite(item.x) && Number.isFinite(item.y));    
    },[data,xcolumn,ycolumn])

   const handleFilterChange = (column,value)=>{
    setFilters((previous)=>({...previous,[column]:value}))
   }
   const clearFilters=()=>
   {
    setFilters({})
   }
   const Exporttoexcel=()=>
   {
    if(filteredData.length===0)
    return 
    const worksheet=XLSX.utils.json_to_sheet(filteredData)
    const workbook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook,worksheet,'Report')
    const safeName=(report.ReportTitle || 'Report').replace(/[\\/:*?''<>|]/g,'_').slice(0,100)
    XLSX.writeFile(workbook,safeName+'.xlsx')
   }

   const Customtooltip=({active,payload})=>{
    if (!active || !payload || !payload.length){return null}
    const item=payload[0].payload;
return(
    <div className='custom-tooltip'>
    <div>
      <stron>تاریخ:</stron>
      <span >{item.date}</span>
      </div>  
      <div>
      <stron>زمان:</stron>
      <span >{item.time}</span>
      </div>  
      {
        ycolumn.map(column=>(
            <div>
      <strong>{column}:</strong>
      <span >{item[column] ?? ''}</span>
      </div>  
        ))
      }
      
</div>
)
}
   /*useEffect(()=>
     {
        if(!xcolumn && datecolumns.length>0)
        setXcolumn(datecolumns[0])
        
        if(!ycolumn && numericCoulmns.length>0)
        setYcolumn(datecolumns[0])
    
     },[datecolumns,numericCoulmns,xcolumn,ycolumn])
   */
if(!report)
{
    return(
        <div className="report-viewer">
            <h2>گزارشی انتخاب نشده است</h2>
        </div> )  
}


    return(
       
        <div className="report-viewer">
                  <div className="report-viewer-header">
          <h1>
            {report.ReportTitle}
          </h1>
          <div className='report-info'>
            <span>
                Title:{report.Title}
            </span>
            <span>
                ID:{report.ID}
            </span>

          </div>
          <div className='report-actions'> 
            <button type="button" className='report-back-button' onClick={onback}>بازگشت</button>
            <button type="button" className='excel-button' onClick={Exporttoexcel} disabled={loading || filteredData.length===0}>دریافت اکسل</button>
          </div>
        </div>
        {loading && (<div className='report-loading'>
            درحال دریافت گزارش
        </div>)}
        {error && (<div className='report-error'>
            خطا:{error}
        </div>)}
        {!loading && !error && data.length===0 && (<div className='report-error'>
            اطلاعاتی برای نمایش وجود ندارد 
        </div>)}
        {!loading && !error && data.length>0 && (
            <>
        <div className='report-toolbar'>
            <span>
                تعداد کل :{data.length.toLocaleString('fa-IR')}
            </span>
            <span>
                تعداد پس از فیلتر :{filteredData.length.toLocaleString('fa-IR')}
            </span>
            <button type="button" className='clear-filter-button' onClick={clearFilters}>پاک کردن فیلتر ها</button>
        </div>
        <div className='report-view-tabs'>
            <button type="button" className={viewMode==='table' ?'view-tab active' :'view-tab' } onClick={()=>setViewMode('table')}>نمایش جدولی </button>   
            <button type="button" className={viewMode==='chart' ?'view-tab active' :'view-tab' } onClick={()=>setViewMode('chart')}>نمایش نموداری </button>   
            {
                childReports.length>0 && (
                <div className='child-report-buttons'>
                    {
                        childReports.map(child=>
                            (
                                <button key={child.ID}  onClick={()=>console.log("child report log",child)}>{child.ReportTitle}</button>)
                            )
                    }

                </div>)}
        </div>
{    viewMode==='table' && ( 
    <>
    {
            filterColumns.length>0 && (
                <div className='report-filters'>
                    {
                        filterColumns.map(column=>(
                            <div className='report-filter' key={column}> 
                                <label htmlFor={'filter'+{column}}>{column}</label>
                                <select value={SelectedFilters[column]}  id={'flt'+{column}} onChange={(e)=>handlecomboFilterChange(column,e.target.value)}>
                                    <option value="">
                                        ----همه---
                                    </option>
                                    {
                                        filteroptions[column]?.map(value=>(<option key={value} value={value} >{value}</option>))
                                    }
                                </select>
                            </div>
                        ))
                    }
                </div>
            )}
        
    <div className='report-table-container'>
    <table className='report-table'> 
    <thead>
    <tr>
        {columns.map((column)=>
            (
                <th key={column}>{column}</th>)
            )
            }
            {
                childReports.length>0 ? (<th>گزارش</th>):(<th>ترند</th>)
            }
    </tr>
    <tr className='report-filter-row'>
    {columns.map((column)=>
            (
            <th key={column}>
                <input type="text" value={filters[column] || "" } onChange={(e)=>handleFilterChange(column,e.target.value)} placeholder='فیلتر ' className='column-filter'/>
            </th>))
            }
    </tr>
    </thead>
<tbody>
{
filteredData.map((row,rowIndex)=>(
<tr key={rowIndex-1}>

{columns.map((column)=>
(
/*<td key={column}>
    {row[column]===null || row[column]===undefined ? '' : String(row[column])}
</td>*/
<td key={column}>
    {getCellValue(row[column])}
</td>
))}
<td className='child-report-cell'>
{
    childReports.length>0  ? (
            childReports.map(child=>(
                <button key={child.ID} type="button" className='child-report-button' onClick={()=>console.log("child report log ",child,"Row",row)}>📈 {child.ReportTitle}</button>
            ))):(
            <span className='no-trend-icon' title='ترندی برای آین آیتم موجود نیست'>
                   📈
            </span>)
}
</td>
</tr>))
}
</tbody>


    </table>
    {
        filteredData.length===0 && (
            <div className="empty-report">
                اطلاعاتی مطابق فیلتر های وارد شده وجود ندارد 
                </div>
        )
    }
</div>
</>
)}

{
    viewMode==='chart' &&(
        <div className="report-chart-container">
            <div className="chart-toolbar">
                <label>نوع نمودار</label>
                <div className="chart-type-buttons">
                <button type="button" className={chartType==='line' ? 'chart-type-button active' : 'chart-type-button' } onClick={()=>setChartType('line')}>نمودارخطی </button>   
                <button type="button" className={chartType==='bar' ? 'chart-type-button active' : 'chart-type-button' } onClick={()=>setChartType('bar')}>نمودارستونی </button>   

                </div>
            </div>
{
    numericCoulmns.length===0 ?( <div className="empty-report">
    هیچ ستون عددی برای رسم نمودار پیدا نشد.
  </div>): filteredData.length===0 ? (
                <div className="empty-report">
                  داده‌ای برای رسم نمودار وجود ندارد.
                </div>
              ):(
                <>
                <div className="report-chart">
                    <div className='chart-axis-selector'>
                    <div className='chart-selector'>
                    <div>
                        <label htmlFor='xAxis'>محور افقی (X)</label>
                        <select value={effectiveXcolumn} onChange={(e)=>setXcolumn(e.target.value)}>
                            <option value="">انتخاب ستون X</option>
                            {
                                datecolumns.map((column)=>(<option key={column} value={column}>{column}</option>))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='yAxis'>محور عمودی (Y)</label>
                        <select id="yAxis" multiple value={ycolumn}  onChange={(e)=>{
                            const _selected = Array.from(e.target.selectedOptions,option => option.value);
                            if(_selected.length <=4 ){
                                setYcolumn(_selected);
                            }
                        }}>
                            {
                                numericCoulmns.map(column=>(
                                    <option key={column} value={column}>
                                        {column}
                                    </option>
                                ))
                            }  
                        </select>
                        <div className='chart-selection-info'>
                                {ycolumn.length}/4 ستون انتخاب شده
                        </div>
                    </div>
                </div>
                    </div>
                
                <div className='chart-date'>
                    {chartData.length>0?'تاریخ'+chartData[0].date:'تاریخی برای نمایش وجود ندارد'}
                </div>
                   <ResponsiveContainer width="100%" height="100%">
                         {chartType === 'line' ? (
                            
                           <LineChart
                             data={chartData}
                             margin={{
                               top: 20,
                               right: 25,
                               left: 15,
                               bottom: 45
                             }}>
                               <CartesianGrid strokeDasharray="3 3" />
                             <XAxis
                               dataKey="x"
                               angle={-35}
                               textAnchor="end"
                               name={effectiveXcolumn}
                               interval="preserveStartEnd"
                               height={70}
                               type="number"
                               domain={["dataMin","dataMax"]}
                               tick={<XAxisTick />}
                             />
                             <YAxis />
                             <Tooltip content={<Customtooltip />} />
                             <Legend />
                             {
                                ycolumn.map(column=>(
                                    <Line key={column}  type="monotone" dataKey={column}  name={column} connectNulls={true}  dot={false} />     
                                ))
                             }
                               
                           </LineChart>
                            ) : (
                               <BarChart
                                 data={chartData}
                                 dataKey="x"
                                 margin={{
                                   top: 20,
                                   right: 25,
                                   left: 15,
                                   bottom: 45
                                 }}>
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis
                               dataKey="x"
                               angle={-35}
                               name={effectiveXcolumn}
                               textAnchor="end"
                               interval="preserveStartEnd"
                               type="number"
                               height={65}
                               domain={["dataMin","dataMax"]}
                               tick={<XAxisTick />}
                             />
                             <YAxis />
                             <Tooltip content={<Customtooltip />} />
                             <Legend />
                             {
                                ycolumn.map(column=>(<Bar key={column}  dataKey={column} name={column}/>))
                             }
                               
                           </BarChart>
    )}
    </ResponsiveContainer>
    </div>  
</>
)}
                </div>  
              )}
        </>
    )}
        {!loading && !error && data.length === 0 && (
        <div className="empty-report">
          اطلاعاتی برای نمایش وجود ندارد.
        </div>
      )}
              </div>

        )}

export default ReportViewer