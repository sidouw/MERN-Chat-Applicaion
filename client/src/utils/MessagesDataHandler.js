import cookie from 'js-cookie'


const setMessageSeen = async (id)=>{
    const data = await fetch('/messages/seen/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}
export {setMessageSeen}