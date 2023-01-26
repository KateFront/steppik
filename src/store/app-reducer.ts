import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "../api/authApi";
import {setIsLoggedInAC} from "./auth-reducer";


const initialState = {
    isInitialized: false,
    status: 'idle',
    error: null,
    myUserID: '',
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value;
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: null }>) {
            state.error = action.payload.error
        },
        setAppMyUserIdAC(state, action: PayloadAction<{ myUserID: string }>) {
            state.myUserID = action.payload.myUserID
        }
    }
});

export const appReducer = slice.reducer;
export const {setIsInitializedAC, setAppStatusAC, setAppErrorAC, setAppMyUserIdAC} = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authApi.me()
        .then((res) => {
            dispatch(setAppStatusAC({status:'succeeded'}))
            dispatch(setIsLoggedInAC({value:true}));
            dispatch(setAppMyUserIdAC({ myUserID: res.data._id}))
        })
        .catch((err) => {})
        .finally(() => {
            dispatch(setIsInitializedAC({value:true}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
}