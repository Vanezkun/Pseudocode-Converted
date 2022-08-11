// document.getElementsByName('inputtext')[0].value = 'x = 2\ny = 3\nif x<0 :\n    print(x, "bil negatif")\nif(x >= y) :\n    print("x lebih besar dari y")\n    program = true\n    while program :\n        for i in range(10) :\n            print(i)\n    while (program) :\n        for i in range(5) :\n            print(tes)'
document.getElementsByName('inputtext')[0].value = "for i in range(0, 10, 1) :\n    print(i)\n    for i in range(0, 10, 1) :\n        print(i)\n        for i in range(0, 10, 1) :\n            print(i)"

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
    return (param.split('[tab]').length -1)
}

function Convert(inputs, outputs){
    text = inputs
    text = text.replaceAll('    ', '[tab]')

    text = text.split('\n')

    let totalline = text.length
    

    for(i=0;i<=text.length-1;i++){

        text[i] = text[i].replace('print', 'write')
        text[i] = text[i].replace('js', 'javascript')
        text[i] = text[i].replace('if ', 'if (')
        text[i] = text[i].replace(' :', '')
        text[i] = text[i].replace(':', '')
        text[i] = text[i].replace('=', '←')
        let inlinetab = (text[i].split('[tab]').length) -1
        

        if(text[i].includes('if ')){ 
            text[i] = text[i] + ') then' 
        }
        if(text[i].includes('while ') || text[i].includes('for ')){ 
            if(text[i].includes('(')){
                text[i] = text[i] + ') do' 
            } else {
                text[i] = text[i] + ' do' 
            }
        }
        if(text[i].includes('def ')){ 
            text[i] = text[i].replace('def', 'Fungsi') 
        }
        if(text[i].includes('input')){ 
            let inputsplit = text[i].split('=')
            inputsplit = inputsplit[0].replace('[tab]', '')
            text[i] = `read(${inputsplit})`
        }
        text[i] = text[i].replace(') )', ')')
        text[i] = text[i].replace('))', ')')




// for loop, endfor
        if(text[i].includes('for ') && text[i].includes('in range')){

            let tabinlinefor = tabcount(text[i])


            if(tabinlinefor == 0){
                let endfordone = false
                for(j=1;j<=totalline-1;j++){
                    if(i+j+1 > totalline-1){ idanj = i+j; break }
                    if(tabcount(text[i+j+1]) == 0){
                        text[i+j] = text[i+j] + '\n' + 'endfor'
                        endfordone = true
                        totalline += 1
                        break
                    }
                }
                if(endfordone == false){
                    text[totalline-1] = text[totalline-1] + '\n' + '[tab]'.repeat(0) +'endfor'
                    totalline += 1
                }
            }

            if(tabinlinefor > 0){
                let endfordone = false
                let idanj = 0
                for(j=1;j<=totalline-1;j++){
                    if(i+j+1 > totalline-1){ break }
                    if(tabcount(text[i+j]) <= tabinlinefor){
                        text[i+j] = text[i+j] + '\n' + '[tab]'.repeat(i+j) + 'endfor'
                        endfordone = true
                        totalline += 1
                        break
                    }
                    idanj = i+j
                }
                if(endfordone == false){
                    // if((text[totalline-1]).includes('endfor')){
                    //     text[totalline-2] = text[totalline-2] + '\n' + '[tab]'.repeat(tabinlinefor) +'endforxx'
                    //     totalline += 1

                    // } else {
                        text[totalline-1] = text[totalline-1] + '\n' + '[tab]'.repeat(tabinlinefor) +'endforx'
                        totalline += 1
                    // }



                }
            }











        }








// for loop (start, end, step)
if(text[i].includes('for ')){
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



truekah = totalline




    



    } //end for untuk per line split


    disarray(text)

    
    document.getElementsByName('outputtext')[0].value = ''
    document.getElementsByName('outputtext')[0].value = output
    document.getElementsByName('truekah')[0].value = truekah

}





function Reset(){
    document.getElementsByName('inputtext')[0].value = ''
    document.getElementsByName('outputtext')[0].value = ''
}