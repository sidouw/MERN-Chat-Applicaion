import cookie from 'js-cookie'


const getUser = async (id)=>{
    const data = await fetch('/users/'+id)

    return data.json()
}


const getUsers = async (id)=>{
    const data = await fetch('/users')

    return data.json()
}

const getFriends = async (id)=>{
    const data = await fetch('/users/f/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}


const getFriendsRequests = async ()=>{
    const data = await fetch('/users/f',{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}

const AddFriend = async (id)=>{
    const data = await fetch('/users/f',{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
            "Content-type": "application/json"
        },
         body:JSON.stringify({id})
    })

    return data.json()
}
const HandleRequest = async (id,type)=>{
    const data = await fetch('/users/f/'+id,{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
            "Content-type": "application/json"
        },
         body:JSON.stringify({type})
    })

    return data.json()
}

const DeleteFriend =async (id)=>{
    const data = await fetch('/users/f/'+id,{
        method:'DELETE',
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
            "Content-type": "application/json"
        }
    })

    return data.json()
}

const uploadUserImage = async (image)=>{
    return await fetch('/users/image',{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
            "Content-type": "application/json"
        },
         body:JSON.stringify({image})
    })

    // return data
}
export {getUser,getUsers,getFriends,getFriendsRequests,AddFriend,HandleRequest,DeleteFriend,uploadUserImage}