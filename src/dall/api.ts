import axios from "axios"


export const Api = {

    sendEmail(email: string,time:number,cost:string,name:string){
       return  axios.post('https://smpt-server.herokuapp.com/sendMail',{

            email,time,cost,name
        }).then(response =>{
          return  response.data
       })


    }
}