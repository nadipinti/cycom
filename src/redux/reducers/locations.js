import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../environment'

const createLocationMutation = gql`mutation addLocation($object:location_insert_input!){
    insert_location_one(object:$object){
        id
    }
}`;

const getLocationsQuery = gql`query getLocations($name:String!){ location (where:{name:{_iregex:$name}}){
    parent
    org_id
    name
    level
    is_primary
    id
    color
    }  
}`;

const updateLocationMutation = gql`mutation update_location($object:[location_insert_input!]!) {
    insert_location(objects: $object
    ,
          on_conflict: {
            constraint: locations_pkey,
            update_columns: [name,parent]
          }
      ){
          affected_rows
      }
    }`;
const deleteLocationMutation = gql `mutation delete_location($id: Int!) {
    delete_location(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`;   



export const createLocation = createAsyncThunk('locations/create', async (payload) => {
    console.log("Create Location Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createLocationMutation, variables: {
                object: {
                    "name": "Erragadda 123",
                    "org_id": 93,
                    "color": "red",
                    "parent": 21
                }
            }
        });
        data = {
            status: true,
            message: 'Location Added Sucessfully'
        }
        console.log('response+++++++11', data)

    } catch (e) {
        console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        console.log('response+++++++', data)
    }
    return data
})

export const getLocations = createAsyncThunk('locations/getLocations', async (payload) => {
    console.log("getLocations...................", payload)
    try {
        const response = await client.query({
            query: getLocationsQuery, variables: {
                "name": `${payload}`
            }
        })
        console.log('getLocations', response.data.location)
        return response.data.location
    } catch (e) {
        console.log('error', e)
    }
})

export const updateLocation = createAsyncThunk('locations/updateLocation', async (payload) => {
    console.log("Update Department Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateLocationMutation, variables: {
                object: {
                    name: 'Erragadda 87946531',
                    id: 32,
                    parent: 26
                }
            }
        });
        data = {
            status: true,
            message: 'Location Updated Sucessfully'
        }
        console.log('response+++++++', data)
    } catch (e) {
        console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        console.log('response+++++++', data)
    }
    return data
})

export const deleteLocation = createAsyncThunk('locations/delete', async (payload) => {
    let data = {}
    console.log("deleteLocation...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteLocationMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Location Deleted Sucessfully'
        }
        console.log('response+++++++', data)
    } catch (e) {
        console.log('error', e)
        data = {
            status: true,
            message: 'Location Deleted Sucessfully'
        }
    }
    return data
})


export const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        locationsList: [],
        locationResponse: {}

    },
    extraReducers: {
        [createLocation.fulfilled]: (state, action) => {
            state.locationResponse = action.payload;
            console.log('2222222222222222222222222222222222222')
            return state;
        },
        [getLocations.fulfilled]: (state, action) => {
            console.log("dsfsdfsdfsdfdsfds.......", state, action);
            state.locationsList = action.payload;
            return state;
        },
        [updateLocation.fulfilled]: (state, action) => {
            state.locationResponse = action.payload;
            console.log('2222222222222222222222222222222222222')
            return state;
        },
        [deleteLocation.fulfilled]: (state, action) => {
            state.locationResponse = action.payload;
            console.log('2222222222222222222222222222222222222')
            return state;
        },
    },
    reducers: {
        logOut: (state) => {
            console.log('----------------- Logout')
            state.accessToken = ""

        }
    }
}
)

export const { } = departmentSlice.actions

export default departmentSlice.reducer