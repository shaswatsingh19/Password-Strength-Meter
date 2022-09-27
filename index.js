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
        
        console.log(weakness.message)

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
    console.log(weaknessArr)
    return weaknessArr
}


// Checking for Length Weakness
function lengthWeakness(password){

    const length = password.length 
    if(length <= 7){
        return {
            message:'Your password is too Short',
            deduction: 40
        }
    }
    else if (length <= 15){
        return {
            message:'I know it can be better',
            deduction: 15
        }
    }
    // No issue with Password 
    else{
        return{
            message : "Great, will be removed",
            deduction : 0
        }
    }

}


function lowercaseWeakness(password){

    // regex for finding any 1 character which will be lowercase  
    const reg = /[a-z]/g
    const arr = password.match(reg)
    if(arr){
        if(arr.length <= 2){
            return {
                message : "consist low lowercase",
                deduction : 5
            }
        }else{
            return {
                message : "consist lot of lowercase",
                deduction : 0
            }
        }
        
    }
    return{
        message : "doesn't consist lowercase",
        deduction : 20
    }
}

function uppercaseWeakness(password){

    // regex for finding any 1 character which will be uppcase  
    const reg = /[A-Z]/g
    const arr = password.match(reg)
    if(arr){
        if(arr.length <= 2){
            return {
                message : "consist low uppercase",
                deduction : 5
            }
        }else{
            return {
                message : "consist lot of uppercase",
                deduction : 0
            }
        }
        
    }
    return{
        message : "doesn't consist lowercase",
        deduction : 20
    }
}


function digitWeakness(password){  

    // regex for finding any 1 character which will be digit  
    const reg = /[0-9]/g
    const arr = password.match(reg)
    if(arr){
        return {
            message : "consist digit",
            deduction : 0
        }
    }
    return{
        message : "doesn't consist digit ",
        deduction : 25
    }
}
