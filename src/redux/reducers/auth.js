import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import {client} from '../../environment'


const loginMutation = gql`mutation login($object:LoginInput!) {
    login(arg1:$object) {
      response {
        message
        status
      }
      data{
        accessToken
        available_organizations
        current_organization
        user_id
      }
    }
  }
`;

export const login = createAsyncThunk('auth/login', async (payload) => {
  console.log("f44443444444444444...................",payload)
 const response= await client.mutate({mutation : loginMutation, variables:{
             object: payload}});
    console.log('response+++++++',response.data.login.data)
   
    return response.data.login.data;

})

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
      accessToken:"",
      available_organizations: [],
      current_organization: '',
      user_id: '',
     
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("dsfsdfsdfsdfdsfds.......",state,action);
     state.accessToken=action.payload.accessToken;
     state.current_organization = action.payload.current_organization;
     state.user_id = action.payload.user_id;
     state.available_organizations = action.payload.available_organizations;
     localStorage.setItem('token',action.payload.accessToken)
     return state;
    },},
    reducers: {
        logOut : (state) =>{
          console.log('----------------- Logout')
            state.accessToken = ""
            
        }}  
    }
)

export const { logOut } = authSlice.actions

export default authSlice.reducer