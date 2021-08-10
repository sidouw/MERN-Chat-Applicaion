import { createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
      isloged:false,
      user :{
      contacts:[],
      username:'',
      email:'',
      state:'',
      photo_url:false,
      picture:'',
      _id:''}
    },
  reducers: {
    setUserx: (state, action) => {
      state.user = {...action.payload};
    },
    setLoged: (state, action) => {
      state.isloged = action.payload;
    },
    updateContacts: (state, action) => {
      state.user.contacts = [...state.user.contacts,action.payload]
    },
    updatePhotoUrl: (state, action) => {
      state.user.picture = action.payload
    },
  },
});

export const { setUserx,setLoged,updateContacts,updatePhotoUrl} = userSlice.actions;

export default userSlice.reducer;
