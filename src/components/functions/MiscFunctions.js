import React from 'react';


function formatCurrency(m, c, d, t){
    var n = m, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function formatDate(datex){
    try {
        var d = new Date(datex);
        let mon = `${d.getMonth()+1}`
        let day = `${d.getUTCDate()}`

        mon = (mon.length>1 ? mon : `0${mon}` )
        day = (day.length>1 ? day : `0${day}`)

        return `${day}/${mon}/${d.getFullYear()}`
    } catch (error) {
        return  new Date("1990-01-01T12:00:00-00:00");
    }
     
}


export {formatCurrency,formatDate};