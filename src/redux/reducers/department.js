import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../environment'

const createDepartmentMutation = gql`mutation addDepartment($object:department_insert_input!){
    insert_department_one(object:$object){
        id
    }
}`;

const getDepartmentsQuery = gql `query getDepartments($name:String!){ department(where:{name:{_iregex:$name}}){
    id
    name
    parent
    color
    }  
}`;

const updateDepartmentMutation = gql `mutation update_department($object:[department_insert_input!]!) {
    insert_department(objects: $object
    ,
          on_conflict: {
            constraint: department_pkey,
            update_columns: [name,parent]
          }
      ){
          affected_rows
      }
}`;



export const createDepartment = createAsyncThunk('department/create', async (payload) => {
    console.log("Create Department Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createDepartmentMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Department Added Sucessfully'
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

export const getDepartments = createAsyncThunk('department/getDepartments', async (payload) => {
    console.log("getDepartments...................", payload)
    try {
        const response = await  client.query({query : getDepartmentsQuery , variables: {
            "name":`${payload}`
        }})
          console.log('skjgshfgdsfhgdsfhdsfgdsf', response.data.department)
          return response.data.department
    } catch (e) {
        console.log('error', e)
    }
})

export const updateDepartment = createAsyncThunk('department/updateDepartment', async (payload) => {
    console.log("Update Department Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateDepartmentMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Department Updated Sucessfully'
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

// export const deleteDepartment = createAsyncThunk('locations/delete', async (payload) => {
//     let data = {}
//     console.log("deleteLocation...................", payload)
//     try {
//         const response = await client.mutate({
//             mutation: deleteLocationMutation, variables: {
//                 "id": `${payload}`
//             }
//         })
//         data = {
//             status: true,
//             message: 'Location Deleted Sucessfully'
//         }
//         console.log('response+++++++', data)
//     } catch (e) {
//         console.log('error', e)
//         data = {
//             status: true,
//             message: 'Location Deleted Sucessfully'
//         }
//     }
//     return data
// })

export const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        departmentsList: [],
        updatedepartmentResponse: {},
        createDepRes :{},

    },
    extraReducers: {
        [createDepartment.fulfilled]: (state, action) => {
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
            state.createDepRes = action.payload;
            console.log('2222222222222222222222222222222222222',state)
            return state;
        },
        [getDepartments.fulfilled]: (state, action) => {
            console.log("dsfsdfsdfsdfdsfds.......", state, action);
            state.departmentsList = action.payload;
            return state;
        },
        [updateDepartment.fulfilled]: (state, action) => {
            state.updatedepartmentResponse = action.payload;
            console.log('update department return ', action.payload, state.departmentResponse)
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