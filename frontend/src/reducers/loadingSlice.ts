import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from "../app/store";
import {axiosClient, setToken} from "../app/axios";

export interface LoadingState {
    loading:boolean
}

const initialState: LoadingState = {
    loading: false
};



export const loadingSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true
        },
        endLoading(state) {
            state.loading = false
        }
    },
    extraReducers: (builder) => {
    },
});

export const {startLoading,endLoading} = loadingSlice.actions
export const selectLoadingState = (state: RootState) => state.loading.loading;
export default loadingSlice.reducer;