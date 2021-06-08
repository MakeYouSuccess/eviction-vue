export default {
    install(Vue) {
        Vue.prototype.convertDateWithPeriods = (date) =>{
            if (date){
                var d = new Date(Date.parse(date));
                var day = d.getDate()
                var month = d.getMonth()+1 //months are counted starting from 0
                var yr = d.getFullYear()
                return `${month}.${day}.${yr}`
              }
              return ''
        }
        Vue.prototype.convertDateWithSlashes = (date) =>{            
            if (date){
                // var d = new Date(date);                
                // var day = d.getDate()
                // var month = d.getMonth()+1 //months are counted starting from 0
                // var yr = d.getFullYear()
                // return `${month}/${day}/${yr}`
                var endDate = new Date(date).toISOString();
                var d1 = endDate.split('T'); //spliting date from T
                var d2 = d1[0].split('-'); //getting date part 
                // console.log('yyyy/MM/dd', d2[0] + "/" + d2[1] + "/" + d2[2]) //YYYY/MM/DD
                // console.log("DD/MM/YYYY", d2[2] + "/" + d2[1] + "/" + d2[0])
                return d2[1] + "/" + d2[2] + "/" + d2[0]
              }
              return ''
        }
        Vue.prototype.convertDateToShort = (date) =>{
            if (date){
                var d = new Date(Date.parse(date));
                var day = d.getDate()
                //var month = d.getMonth()+1 //months are counted starting from 0
                var month = d.toLocaleString('default', { month: 'short' });
                //var yr = d.getFullYear()
                return `${month} ${day}`
              }
              return ''
        }
        Vue.prototype.convertDateToFull = (date) =>{
            if (date){
                var d = new Date(Date.parse(date));
                var day = d.getDate()
                //var month = d.getMonth()+1 //months are counted starting from 0
                var month = d.toLocaleString('default', { month: 'long' });
                var year = d.getFullYear()
                //var yr = d.getFullYear()
                return `${month} ${day}, ${year}`
              }
              return ''
        }
    }
}