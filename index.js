const meter = document.getElementById('meter')
const passInput = document.getElementById('password-input')
const reasons =   document.getElementById('reasons')

// Checking at each input 
passInput.addEventListener('input',updateMeter)


function updateMeter(){
    const password = passInput.value 
    const weaknesses = calPasswordStrength(password)

    reasons.innerHTML = ''
    let strength = 100
    const temp = []
    weaknesses.forEach(weakness => {
          

        strength -= weakness.deduction
        meter.style.setProperty("--strength" , strength)
        
        const div = document.createElement('div')
        div.textContent = weakness.message
        temp.push(div)
    })
    
    reasons.append(...temp)
}

function calPasswordStrength(password){
    const weaknessArr  = []
    weaknessArr.push(lengthWeakness(password))
    weaknessArr.push(lowercaseWeakness(password))
    weaknessArr.push(uppercaseWeakness(password))
    weaknessArr.push(digitWeakness(password))
    weaknessArr.push(specialCharacterWeakness(password))
    
    return weaknessArr
}


// Checking for Length Weakness
function lengthWeakness(password){

    
    const length = password.trim().length 
    console.log(length)
    if(length <= 8){
        return {
            message:'Your password is too Short',
            deduction: 20
        }
    }
    else if (length <= 16){
        return {
            message:'I know it can be better',
            deduction: 10
        }
    }
    // No issue with Password 
    else{
        return{
            message : "",
            deduction : 0
        }
    }

}

function characterTypeWeakness(reg,password,message){
 
    const arr = password.match(reg)
    if(arr){
        if(arr.length <= 2){
            return {
                message : `add more ${message}`,
                deduction : 5
            }
        }else{
            return {
                message : "",
                deduction : 0
            }
        } 
    }
    return{
        message :  `doesn't consist ${message}`,
        deduction : 20
    }
}

function lowercaseWeakness(password){

    // regex for finding any 1 character which will be lowercase  
    const reg = /[a-z]/g
    return characterTypeWeakness(reg,password,'lowercase')
}

function uppercaseWeakness(password){

    // regex for finding any 1 character which will be uppcase  
    const reg = /[A-Z]/g
    return characterTypeWeakness(reg,password,'uppercase')    
}


function digitWeakness(password){  

    // regex for finding any 1 character which will be digit  
    const reg = /[0-9]/g
    return characterTypeWeakness(reg,password,'digit')
}


function specialCharacterWeakness(password){
    const reg = /[^0-9a-zA-Z\s]/g
    return characterTypeWeakness(reg,password,'Special Character')
}