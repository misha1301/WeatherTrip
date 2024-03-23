import responseStatusCodeMsg from "./responseStatusCodeMsg"

const getErrorMsg = (responseCode) => {
   const errMsg = responseStatusCodeMsg?.[responseCode];
   if(errMsg === '' || errMsg === undefined || errMsg === null) return "Opps! Unexpected error :(";
   else return errMsg;
}

export default getErrorMsg;