import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    index:-1
}

export const typeSelect = createSlice({
    initialState:initialState,
    name:'indexing',
    reducers:{
        setCounter:(state,action)=>{
            state.index=action.payload;
        }
    },
});

export const {setCounter} = typeSelect.actions;
export default typeSelect.reducer