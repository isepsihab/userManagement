
import React from 'react';
import {withFormik, Field, Form} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import { newUsersEdit, newUsersAdd} from '../actions/Users';
import { hideForm } from '../actions/Form';
import { clearIndex, clearMode } from '../actions/Edit';


const FormField = ({touched, errors, values, hideForm, newUsersEdit, users, userIndexToEdit, clearIndex, clearMode, newUsersAdd, writeMode}) => {
    
    let currentUsers = [...users]
    console.log(errors)
    const throwForm = (id,)=> {
        //hide form and clear everything
        if(values.first_name == '' || values.last_name == ''){
            //hideForm()
            return null
        }else{
            if(writeMode === 'edit_mode'){
                //newUsers[userIndexToEdit] = values
                newUsersEdit(currentUsers, id, userIndexToEdit, values, hideForm)
            }else if(writeMode === 'add_mode'){
                //newUsers.push(values)
                newUsersAdd(currentUsers, values, hideForm)
            }
            hideForm()
            clearIndex()
            clearMode()
        }
    }

    console.log(values)
    return (
        <Form className="form">
            {touched.first_name && errors.first_name && <p className="required">{errors.first_name}</p>}
            <Field type="text" name="first_name" placeholder="First Name"/>

            {touched.last_name && errors.last_name && <p className="required">{errors.last_name}</p>}
            <Field type="text" name="last_name" placeholder="Last Name"/>

            <button className="submit-btn" onClick={()=>throwForm(values.id)}>SUBMIT</button>
        </Form>
    )
};

const FormikComponent = withFormik({
    mapPropsToValues({first_name, last_name, id}){
        return {
            first_name,
            last_name, 
            id
        }
    }, 
    
    validationSchema : Yup.object().shape({
        first_name: Yup.string().required('required'),
        last_name: Yup.string().required('required'),
    }),

    handleSubmit(values, {resetForm, setErrors}){
        if(values.first_name !== '' && values.last_name !== ''){
            hideForm()
            clearIndex()
            clearMode()
            resetForm()
          
        }else{
            setErrors({first_name: "required"})
           
        }
    }
})(FormField);

const mapStateToProps = (store) => {
    return {
        state: store.formDisplayReducer,
        users: store.usersReducer.users,
        userIndexToEdit: store.editUserReducer.userIndexToEdit,
        writeMode: store.editUserReducer.writeMode
    }
};

export default connect(mapStateToProps, {hideForm, newUsersEdit, clearIndex, newUsersAdd, clearMode}) (FormikComponent);