function date_relative(unix_timestamp) {
    if(unix_timestamp == 0){
        return "Not yet"
    }
    if(unix_timestamp == -1){
        return "Searching..."
    }
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var current = new Date()
    var elapsed = current - (unix_timestamp*1000);

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function date_relative_short(unix_timestamp) {
    if(unix_timestamp == 0){
        return "Not yet"
    }
    if(unix_timestamp == -1){
        return "Searching..."
    }
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var current = new Date()
    var elapsed = current - (unix_timestamp*1000);

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + 's';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + 'm';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + 'h';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + 'D';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + 'M';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + 'Y';   
    }
}
function date_absolute(unix_timestamp){
    if(unix_timestamp == 0){
        return "Not yet"
    }
    if(unix_timestamp == -1){
        return "Searching..."
    }
    var a = new Date(unix_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

function dynamicDate(unix_timestamp){
    if(!(unix_timestamp > -2)){
        unix_timestamp = 0
    }
   return "<a href=\"\" onclick=\"$(this).text(date_absolute("+unix_timestamp+"));return false;\">"+date_relative(unix_timestamp)+"</a>"
}

function atomToUnixTimestamp(atom_time){
    return Date.parse(atom_time)/1000
}

function dateStringToAtom(date_string,time){
    if(!time){
        var time = "00:00:01"
    }
 

    var d = new Date(date_string),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if(month.length == 1){ 
        month = "0"+month
    }
    if(day.length == 1){
        day = "0"+day
    }
    var ret = {
        atom: year+'-'+month+'-'+day+'T'+time+'Z',
        day,
        month,
        year
    }
  
    return ret

}