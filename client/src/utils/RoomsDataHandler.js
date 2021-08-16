
import cookie from 'js-cookie'


const getUserRooms = async ()=>{
    const data = await fetch('/rooms/a',{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })
    return data.json()
}

const addRoom = async (id)=>{
    const data = await fetch('/rooms/u/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
        }
    })

    return data.json()
}
const getRoomMessages = async (id,skip=0,limit=10)=>{
    const data = await fetch('/messages/r/'+id+'?skip='+skip+'&limit='+limit,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })
    return data.json()
}

const getLastRoomMessage = async (id)=>{
    try {
        const data = await fetch('/messages/u/'+id,{
            headers:{
                'Authorization':'Bearer '+cookie.get('token')
             }
        })
        if (data) {
            return data.json()
        }
    } catch (error) {
        console.log(error)
    }
}

export {getRoomMessages,getLastRoomMessage,getUserRooms,addRoom}