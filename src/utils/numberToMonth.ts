export const numberToMonth = (monthNumber: string) => {
    if(monthNumber === '01') {
        return 'Janeiro'
    }else if(monthNumber === '02'){
        return 'Fevereiro'
    }else if(monthNumber === '03'){
        return 'Março'
    }else if(monthNumber === '04'){
        return 'Abril'
    }else if(monthNumber === '05'){
        return 'Maio'
    }else if(monthNumber === '06'){
        return 'Junho'
    }else if(monthNumber === '07'){
        return 'Julho'
    }else if(monthNumber === '08'){
        return 'Agosto'
    }else if(monthNumber === '09'){
        return 'Setembro'
    }else if(monthNumber === '10'){
        return 'Outubro'
    }else if(monthNumber === '11'){
        return 'Novembro'
    }else if(monthNumber === '12'){
        return 'Dezembro'
    }
}