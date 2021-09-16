import i18n from "./i18n"

const useTranslateIfExist:any = (path:string, stringIfNoExist:string)=>{
    if(i18n.exists(path)){
      return i18n.t(path)
    }
    else return stringIfNoExist
}

export { 
    useTranslateIfExist
}