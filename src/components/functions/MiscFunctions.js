import React from 'react';

const keyword = 't3cstr46'

const DecAlfa = {
    99: "!",
    98: "\\",
    97: "#",
    96: "$",
    95: "%",
    94: "&",
    93: "'",
    92: "(",
    91: ")",
    90: "*",
    89: "+",
    88: ",",
    87: "-",
    86: ".",
    85: "/",
    84: "0",
    83: "1",
    82: "2",
    81: "3",
    80: "4",
    79: "5",
    78: "6",
    77: "7",
    76: "8",
    75: "9",
    74: ":",
    73: ";",
    72: "<",
    71: "=",
    70: ">",
    69: "?",
    68: "@",
    67: "A",
    66: "B",
    65: "C",
    64: "D",
    63: "E",
    62: "F",
    61: "G",
    60: "H",
    59: "I",
    58: "J",
    57: "K",
    56: "L",
    55: "M",
    54: "N",
    53: "O",
    52: "P",
    51: "Q",
    50: "R",
    49: "S",
    48: "T",
    47: "U",
    46: "V",
    45: "W",
    44: "X",
    43: "Y",
    42: "Z",
    41: "[",
    40: "\\",
    39: "]",
    38: "^",
    37: "_",
    36: "`",
    35: "a",
    34: "b",
    33: "c",
    32: "d",
    31: "e",
    30: "f",
    29: "g",
    28: "h",
    27: "i",
    26: "j",
    25: "k",
    24: "l",
    23: "m",
    22: "n",
    21: "o",
    20: "p",
    19: "q",
    18: "r",
    17: "s",
    16: "t",
    15: "u",
    14: "v",
    13: "w",
    12: "x",
    11: "y",
    10: "z",
    9: "{",
    8: "|",
    7: "}",
    6: "~"}

const AlfaDec = {
    "!": 99,
    "\\": 98,
     "#": 97,
     "$": 96,
     "%": 95,
     "&": 94,
     "'": 93,
     "(": 92,
     ")": 91,
     "*": 90,
     "+": 89,
     ",": 88,
     "-": 87,
     ".": 86,
     "/": 85,
     "0": 84,
     "1": 83,
     "2": 82,
     "3": 81,
     "4": 80,
     "5": 79,
     "6": 78,
     "7": 77,
     "8": 76,
     "9": 75,
     ":": 74,
     ";": 73,
     "<": 72,
     "=": 71,
     ">": 70,
     "?": 69,
     "@": 68,
     "A": 67,
     "B": 66,
     "C": 65,
     "D": 64,
     "E": 63,
     "F": 62,
     "G": 61,
     "H": 60,
     "I": 59,
     "J": 58,
     "K": 57,
     "L": 56,
     "M": 55,
     "N": 54,
     "O": 53,
     "P": 52,
     "Q": 51,
     "R": 50,
     "S": 49,
     "T": 48,
     "U": 47,
     "V": 46,
     "W": 45,
     "X": 44,
     "Y": 43,
     "Z": 42,
     "[": 41,
    "\\": 40,
     "]": 39,
     "^": 38,
     "_": 37,
     "`": 36,
     "a": 35,
     "b": 34,
     "c": 33,
     "d": 32,
     "e": 31,
     "f": 30,
     "g": 29,
     "h": 28,
     "i": 27,
     "j": 26,
     "k": 25,
     "l": 24,
     "m": 23,
     "n": 22,
     "o": 21,
     "p": 20,
     "q": 19,
     "r": 18,
     "s": 17,
     "t": 16,
     "u": 15,
     "v": 14,
     "w": 13,
     "x": 12,
     "y": 11,
     "z": 10,
    "{" : 9 ,
    "|" : 8 ,
    "}" : 7 ,
    "~" : 6 }

const AlfaCombHex={
    "10BC": 99,
    "0513": 98,
    "210B": 97,
    "1823": 96,
    "0AD9": 95,
    "0792": 94,
    "0A5E": 93,
    "1CB0": 92,
    "0500": 91,
    "09BC": 90,
    "1ADF": 89,
    "160B": 88,
    "0575": 87,
    "2398": 86,
    "07C2": 85,
    "0D97": 84,
    "0FDB": 83,
    "21BF": 82,
    "2264": 81,
    "05F5": 80,
    "0ED2": 79,
    "1D15": 78,
    "044E": 77,
    "095C": 76,
    "22C1": 75,
    "0E10": 74,
    "0BF5": 73,
    "12E0": 72,
    "1930": 71,
    "2423": 70,
    "1CE9": 69,
    "2255": 68,
    "09FD": 67,
    "1475": 66,
    "19C9": 65,
    "0A44": 64,
    "1693": 63,
    "122C": 62,
    "2375": 61,
    "0C4F": 60,
    "0757": 59,
    "267B": 58,
    "24CE": 57,
    "0763": 56,
    "071D": 55,
    "0C25": 54,
    "1093": 53,
    "17AF": 52,
    "178E": 51,
    "1EC4": 50,
    "1EB8": 49,
    "046E": 48,
    "07FF": 47,
    "1E7E": 46,
    "0EC3": 45,
    "0873": 44,
    "060B": 43,
    "135A": 42,
    "05FB": 41,
    "04B1": 40,
    "1A87": 39,
    "1AFE": 38,
    "193B": 37,
    "1580": 36,
    "10A7": 35,
    "1B24": 34,
    "1B90": 33,
    "2685": 32,
    "141A": 31,
    "1D54": 30,
    "15D0": 29,
    "15FB": 28,
    "1CCE": 27,
    "0C48": 26,
    "2363": 25,
    "061B": 24,
    "1D68": 23,
    "0945": 22,
    "2136": 21,
    "053F": 20,
    "068E": 19,
    "0932": 18,
    "1E3F": 17,
    "1D48": 16,
    "25D9": 15,
    "05CE": 14,
    "1DFD": 13,
    "0BC7": 12,
    "1630": 11,
    "26A4": 10,
    "25BF": 9 ,
    "0F49": 8 ,
    "10E8": 7 ,
    "04E8": 6 
    }
   

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

function GetDev(){
    let key = keyword.split('')
    let desv = 0;

    key.map(k=>{
        desv+=AlfaDec[k];
    })

    while(desv>9){
        let aux = 0
        let num = desv.toString()
        let numc = num.split("")

        numc.map(n=>{
            aux+=parseInt(n)
        })

        desv = aux
    }

    return desv

}

function decriptaCommunity(desinsumo){
    let desv = GetDev()
    let auxIn = desinsumo.length/4
    //console.log("auxIn",auxIn)
    let sb = ""

    for (let i=0; i<auxIn; i++){
        let x = AlfaCombHex[desinsumo.substr(0,4)]
        x = (x - desv < 0 ? x - desv + 94 : x - desv)
        sb += (DecAlfa[x]||'')
        
        desinsumo = desinsumo.substr(4) 
    }
    
    return sb

}

function getMonthNameNumber(month){

    let mes = month.trim().toLowerCase();
    
    if(mes.length==1){
        mes = `0${mes}`
    }
    
    switch(mes){
        case 'enero': return '01'
        case '01': return 'enero'
        case 'febero': return '02'
        case '02': return 'febrero'
        case 'marzo': return '03'
        case '03': return 'marzo'
        case 'abril': return '04'
        case '04': return 'abril'
        case 'mayo': return '05'
        case '05': return 'mayo'
        case 'junio': return '06'
        case '06': return 'junio'
        case 'julio': return '07'
        case '07': return 'julio'
        case 'agosto': return '08'
        case '08': return 'agosto'
        case 'septiembre': return '09'
        case '09': return 'septiembre'
        case 'octubre': return '10'
        case '10': return 'octubre'
        case 'noviembre': return '11'
        case '11': return 'noviembre'
        case 'diciembre': return '12'
        case '12': return 'diciembre'
    }

}

export {formatCurrency,formatDate,decriptaCommunity,getMonthNameNumber};