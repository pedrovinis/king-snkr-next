export const PhoneNumberFormat = (number:string) => {
    const onlyNumbers:string = number.replace(/\D/g, "")
    
    let fNumber = `(XX) X XXXX-XXXX`
    for(let i=0; i < onlyNumbers.length; i++) {
        fNumber = fNumber.replace(`X`, onlyNumbers[i])
    }

    return fNumber
} 