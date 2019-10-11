import React from 'react';
import {connect} from 'react-redux';
import { clearIndex } from '../actions/Edit';
import { hideForm } from '../actions/Form';
import FormikComponent from './FormField';

function FormWrapper(props) {
    console.log(props.userIndexToEdit)
    const showForm = props.state.display ? "show" : "hide"

    const hideFormParent = (e) => {
        if(e.target.dataset.name === 'parent'){
            props.hideForm();
            props.clearIndex()
        }
    }

    const ln = props.allUsers.users.length + 1
    console.log(ln)
    const FormikMount = () => {
        if(props.userIndexToEdit != undefined && props.writeMode === 'edit_mode'){
            return (
                <FormikComponent 
                    first_name={props.allUsers.users[props.userIndexToEdit].first_name} 
                    last_name={props.allUsers.users[props.userIndexToEdit].last_name}
                    id={props.allUsers.users[props.userIndexToEdit].id}
                />
            ) 
        }else if(props.userIndexToEdit === undefined && props.writeMode === 'add_mode'){
            return (
                <FormikComponent 
                    first_name="" 
                    last_name=""
                    id={ln}
                />
            )
        }
        else{
            return null
        }
    }
    
    return (
        <div data-name="parent" className={"form-wrapper-fixed " + showForm} onClick={hideFormParent}>
            <div className="form-container">
                {FormikMount()}   
            </div>
        </div>
    )
};

const mapStateToProps = (store) => {
    return {
        state: store.formDisplayReducer,
        allUsers: store.usersReducer,
        userIndexToEdit: store.editUserReducer.userIndexToEdit,
        writeMode: store.editUserReducer.writeMode
    }
};

export default connect(mapStateToProps, {hideForm, clearIndex})(FormWrapper);
