import React from 'react'
import moment from 'moment'


 const Message = ({name,icat,body,profilepic,own,})=>
(    
    <li className= {own ? 'Message': 'Message own' }>

        {own && <div className = 'Message__info '>
            <span className = 'Message__sender'>{name}</span>
            <span className = 'Message__time own'>{moment.unix(icat).format("LT")}</span> 
        </div>}

        { own && (profilepic?
            <img src={'/users/image?img='+profilepic} className = 'Message__pp' alt ='Profile pic '/>
            :
            <span className = 'Message__pp'>{name && name.toUpperCase()[0]}</span>)
        }
        
        <p className = 'Message__body'>{body}</p>
    </li>
    )

    export default Message