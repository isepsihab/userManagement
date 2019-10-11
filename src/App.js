
import React, {Fragment, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {usersAction, deleteUser} from './actions/Users'
import { showForm } from './actions/Form'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { addMode, clearIndex, editMode, getIndex } from './actions/Edit'
import FormWrapper from './component/FormWrapper'
import { Layout } from './style/Layout';


function App(props){
    
    useEffect(()=>{
        props.usersAction()
    }, [])

    const editForm = (index) => {
        props.showForm()
        props.getIndex(index)
        props.editMode()
    }

    const addForm = () => {
        props.showForm()
        props.clearIndex()
        props.addMode()
    }

    const currentUsers = [...props.state.users]
    const confirmDeletion = (idxToDelete) =>{
        if(window.confirm('Delete user?')){
            props.deleteUser(currentUsers, idxToDelete)
            console.log(props.isDelete)
        }else{        
        } 
    }

    let isOneLeft = "show-delete-btn"
    if(props.state.users.length < 2){
        isOneLeft = "hide-delete-btn"
    }else{
        isOneLeft = "show-delete-btn"
    }

    console.log(props.state.users)

    const usersItem = 
        props.state.users.map((user, index) => {
            return (
                <div className="main-container-items" key={index}>

                    <div className="itemsinfo-Container">
                        <div className="itemsinfo">
                            <div className="main-info">
                                <p><strong>First Name:</strong> {user.first_name}</p>
                                <p><strong>Last Name:</strong> {user.last_name}</p>
                            </div>
                            <div className="main-btn">
                                <div onClick={() => editForm(index)} className="edit-btn "><FaEdit /></div>
                                <div onClick={()=>confirmDeletion(index)} className={"close-btn " + isOneLeft}><FaTrashAlt /></div>
                            </div>
                        </div>
                    </div>           
                </div>
            )
        })



    return (
        <Fragment>
            <Layout>
           <FormWrapper/>
           <div className="header">User Management</div>
            <div className="root-container">
                <div className="container">
                    <button className="add-btn" onClick={addForm}>+ Add New</button>
                    <div className="main-container">
                    {usersItem}
                    </div>
                </div>
            </div>
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = (store) => {
    return {
        state: store.usersReducer,
        userIndexToEdit: store.editUserReducer.userIndexToEdit, 
        isDelete: false
    }
}

export default connect(mapStateToProps, {usersAction, showForm, getIndex, clearIndex, editMode, addMode, deleteUser})(App);