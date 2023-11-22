import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    img:''
}

export const uploadedImage = createSlice({
    initialState:initialState,
    name:'uploadedImg',
    reducers:{
        setImg:(state,action)=>{
            state.img=action.payload;
        }
    },
});

export const {setImg} = uploadedImage.actions;
export default uploadedImage.reducer;