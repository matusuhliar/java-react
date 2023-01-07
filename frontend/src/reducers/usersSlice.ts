import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from "../app/store";
import {axiosClient, setToken} from "../app/axios";

export interface User {
    id:number,
    name:string,
    email:string
}

export interface Role {
    id:number,
    key:string,
    name:string
}

export interface MoviesState {
    users: User[],
    roles: Role[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: MoviesState = {
    users: [],
    roles: [],
    status: 'idle'
};

export const fetchUsersAsync = createAsyncThunk(
    'movies/fetchUsers',
    async () => {
        const response = await axiosClient().get('/users/users.json');
        return response.data
    }
);


export const usersSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users = action.payload.data
            })
            .addCase(fetchUsersAsync.rejected, (state) => {
                state.status = 'failed';
            });


    },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectMovieLoadStatus = (state: RootState) => state.users.status;
export default usersSlice.reducer;