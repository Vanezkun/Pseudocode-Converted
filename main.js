// document.getElementsByName('inputtext')[0].value = 'x = 2\ny = 3\nif x<0 :\n    print(x, "bil negatif")\nif(x >= y) :\n    print("x lebih besar dari y")\n    program = true\n    while program :\n        for i in range(10) :\n            print(i)\n    while (program) :\n        for i in range(5) :\n            print(tes)'
// document.getElementsByName('inputtext')[0].value = "for i in range(0, 10, 1) :\n    print(i)\n    for i in range(0, 10, 1) :\n        print(i)\n        for i in range(0, 10, 1) :\n            print(i)"
// document.getElementsByName('inputtext')[0].value = "if (x == 1) :\n    print('satu')\nelif (x == 2) :\n    print('dua')\nelse :\n    print('salah')\n"

function buttonMouseover_left(){
    document.getElementById("button-left").style = 'background-color: #008300;'
}
function buttonMouseout_left(){
    document.getElementById("button-left").style = 'background-color: #00B012;'
}
function buttonMouseover_right(){
    document.getElementById("button-right").style = 'background-color: #830000;'
}
function buttonMouseout_right(){
    document.getElementById("button-right").style = 'background-color: #B00000;'
}


let text;
let output = '';
let truekah = '';
function log(text){
    if((console == undefined) || (console == '')){console =  text}
    else{console = console + '\n' + text }
}
function clearconsole(){
    console = ''
    document.getElementsByName('consolelog')[0].value = ''
}
function disarray(texts){
    temparray = texts
    output = ''
    for(i=0;i<=temparray.length-1;i++){
        temparray[i] = temparray[i].replaceAll('[tab]', '    ')
        if(output == ''){output = temparray[i]}
        else {output = output + '\n' + temparray[i] }
    }
}
function tabcount(param){
    let total;
    try{ total = (param.split('[tab]').length -1) }catch(err){ total = 0 }
    return total
}

function Convert(inputs, outputs){
    text = inputs
    text = text.replaceAll('    ', '[tab]')
    text = text+'\n====== endline ========='

    text = text.split('\n')

    let totalline = text.length
    
// ======= start per line =======
    for(i=0;i<=text.length-1;i++){
        if(text[i].length == 0){ text.splice(i, 1) }

        text[i] = text[i].replace('print', 'write')
        text[i] = text[i].replace('if ', 'if (')
        text[i] = text[i].replace('if(', 'if (')
        text[i] = text[i].replace(' :', '')
        text[i] = text[i].replace(':', '')
        text[i] = text[i].replace(' = ', ' ← ')
        text[i] = text[i].replace('((', '(')
        text[i] = text[i].replace('))', ')')
        text[i] = text[i].replace('int(input', 'input')
        text[i] = text[i].replace('str(input', 'input')
        let inlinetab = (text[i].split('[tab]').length) -1
        let textnotab = text[i].replaceAll('[tab]', '')
        

        if(textnotab.startsWith('if ') || textnotab.startsWith('if(')){ 
            text[i] = text[i] + ') then' 
        }
        if(textnotab.startsWith('while ') || textnotab.startsWith('for ') || textnotab.startsWith('while(') || textnotab.startsWith('for(')){ 
            if(text[i].includes('(')){
                text[i] = text[i] + ') do' 
            } else {
                text[i] = text[i] + ' do' 
            }
        }
        if(textnotab.startsWith('def ')){ 
            text[i] = text[i].replace('def', 'Fungsi') 
        }
        if(textnotab.includes('input')){ 
            let inputsplit = text[i].split(' ← ')
            text[i] = '[tab]'.repeat(inlinetab) + `read(${inputsplit[0].replaceAll('[tab]', '')})`
        }
        let inlinebracl = (text[i].split(')').length) -1
        let inlinebracr = (text[i].split('(').length) -1
        if(inlinebracl != inlinebracr){
            text[i] = text[i].replace('))', ')')
            text[i] = text[i].replace(') )', ')')
        }
        
        // for loop (start, end, step)
        if(text[i].includes('for ') && (!text[i].includes('print'))){
            let variable = text[i].split(' in range')
            let splitfor = text[i].replace(') do', '').split('in range(')
            let totalcoma = splitfor[1].split(',').length -1
            // (start)
            if(totalcoma == 0){
                text[i] = `${variable[0]} ← ${splitfor[1]} do`
            // (start, end)
            } else if(totalcoma == 1){
                let todownto;
                let splitfor2 = splitfor[1].replace(' ', '').split(',')
                if(splitfor2[1] < splitfor2[0]){
                    todownto = 'downto'
                } else { todownto = 'to' }
                text[i] = `${variable[0]} ← ${splitfor2[0]} ${todownto} ${splitfor2[1]} do`
            // (start, end, step)
            } else if(totalcoma == 2){
                let todownto;
                let splitfor2 = splitfor[1].replaceAll(' ', '').split(',')
                if(splitfor2[1] < splitfor2[0]){
                    todownto = 'downto'
                } else { todownto = 'to' }
                text[i] = `${variable[0]} ← ${splitfor2[0]} ${todownto} ${splitfor2[1]} step ${splitfor2[2]} do`
            } else {
                text[i] = 'x'
            }
        }




// endfor
if(textnotab.startsWith('for ')||textnotab.startsWith('for(')&&textnotab.endsWith('do')){
    for(let j=1; j <= totalline-1; j++){
        if(tabcount(text[i+j]) <= inlinetab && text[i+j].length != 0){
            text.splice(i+j, 0, '[tab]'.repeat(inlinetab) + 'endfor')
            break
        }
    }
}

// endwhile
if(textnotab.startsWith('while ')||textnotab.startsWith('while(')&& textnotab.endsWith('do')){
    for(let j=1; j <= totalline-1; j++){
        if(tabcount(text[i+j]) <= inlinetab && text[i+j].length != 0){
            text.splice(i+j, 0, '[tab]'.repeat(inlinetab) + 'endwhile')
            break
        }
}
}

//endif
if(textnotab.startsWith('if ') || textnotab.startsWith('if(') && textnotab.endsWith('then')){
        let elifcount = 0
        let tempinlinetab = inlinetab
        for(let j=1; j <= totalline-1; j++){
            if(tabcount(text[i+j]) <= inlinetab && text[i+j].length != 0){
                if(text[i+j].replaceAll('[tab]', '').startsWith('elif') && tempinlinetab == tabcount(text[i+j])){
                    elifcount++
                } else if(!(text[i+j].replaceAll('[tab]', '').startsWith('else'))){
                    text.splice(i+j, 0, '[tab]'.repeat(inlinetab) + 'endif')
                    for(let k=0; k<=elifcount-1; k++){
                        text.splice(i+j, 0, '[tab]'.repeat(inlinetab) + 'endif')
                    }
                    break
                } else if((text[i+j].replaceAll('[tab]', '').startsWith('else')) && tempinlinetab > tabcount(text[i+j])){
                    text.splice(i+j, 0, '[tab]'.repeat(inlinetab) + 'endif')
                    for(let k=0; k<=elifcount-1; k++){
                        text.splice(i+j, 0, '[tab]'.repeat(inlinetab) + 'endif')
                    }
                    break
                }

            }
        }
        
}



//======================================================




    } //end for untuk per line split



    disarray(text)

    output = output.replace('\n====== endline =========', '')


    
    document.getElementsByName('outputtext')[0].value = ''
    document.getElementsByName('outputtext')[0].value = output
    // document.getElementsByName('truekah')[0].value = truekah

}





function Reset(){
    document.getElementsByName('inputtext')[0].value = ''
    document.getElementsByName('outputtext')[0].value = ''
}
