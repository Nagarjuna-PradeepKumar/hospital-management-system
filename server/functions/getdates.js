async function getdates(yearmonth,holidays){
    var dates=[];
        const [year,month]=(yearmonth.split('-'))
        if(["01","03","05","07","08","10","12"].includes(month)){
            for(var i=1;i<=31;i++){
                if(holidays.includes(`${year}-${month}-${String("0" + i).slice(-2)}`)){
                    continue
                }else{dates.push(`${year}-${month}-${String("0" + i).slice(-2)}`)}
            }
            return({"success":dates})
        }
        if(["04","06","09","11"].includes(month)){
            for(var i=1;i<=30;i++){
                if(holidays.includes(`${year}-${month}-${String("0" + i).slice(-2)}`)){
                    continue
                }else{dates.push(`${year}-${month}-${String("0" + i).slice(-2)}`)}
            }
            return({"success":dates})
        }
        if((month === "02") && (year%4 ===0)){
            for(var i=1;i<=29;i++){
                if(holidays.includes(`${year}-${month}-${String("0" + i).slice(-2)}`)){
                    continue
                }else{dates.push(`${year}-${month}-${String("0" + i).slice(-2)}`)}
            }
            return({"success":dates})
        }
        if((month === "02") && (year%4 !=0)){
            for(var i=1;i<=28;i++){
                if(holidays.includes(`${year}-${month}-${String("0" + i).slice(-2)}`)){
                    continue
                }else{dates.push(`${year}-${month}-${String("0" + i).slice(-2)}`)}
            }
            return({"success":dates})
        }
}

async function monthattendence(plan,actual){
    return plan.filter(x=>((!(actual.includes(x))) && (new Date(x)<new Date()-8.64e+7)))
}

module.exports={getdates,monthattendence}