import { createSlice } from '@reduxjs/toolkit';

// import { useSelector, useDispatch } from 'react-redux';


export const chatsSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChat : '',
    chatFilter : '',
    rooms : {},
    message : {}
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    updateMessage: (state, action) => {
      if (state.rooms[action.payload.room]) {
        state.message = {...action.payload}
        state.rooms[action.payload.room] = [...state.rooms[action.payload.room], {...action.payload}]
      }
      
    },
    updateRooms: (state, action) => {
      if (state.rooms[action.payload.room] === undefined) {
          state.rooms[action.payload.room] = [...action.payload.messages]
      }
    },
    updateRoomMessages : (state, action)=>{
      state.rooms[action.payload.room] = [...state.rooms[action.payload.room],...action.payload.messages]  
    }
  },
});

export const { setCurrentChat,updateMessage,updateRooms,updateRoomMessages} = chatsSlice.actions;


// export const addprojectAsync = project => dispatch => {
//   setTimeout(() => {
//     dispatch(addProject({...project,id:Math.floor(Math.random() * 10)}));
//   }, 500);
// };
export const chatSelector = ({chat})=> ({...chat})
export default chatsSlice.reducer;
