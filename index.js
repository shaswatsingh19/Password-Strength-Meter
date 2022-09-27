const meter = document.getElementById('meter')
const passInput = document.getElementById('password-input')
const reasons =   document.getElementById('reasons')

// Checking at each input 
passInput.addEventListener('input',updateMeter)

function updateMeter(){
    const password = passInput.value 
    const weakness = calPasswordStrength(password)
    


}

function calPasswordStrength(password){
    const weakness  = []
    weakness.push(lengthWeakness(password))
    return weakness
}


// Checking for Length Weakness
function lengthWeakness(password){

    const length = password.length

    if(length <= 6){
        return {
            message:'Your password is too Short',
            deduction: 50
        }
    }
    else if (length <= 12){
        return {
            message:'I know it can be better',
            deduction: 25
        }
    }
    
    
}