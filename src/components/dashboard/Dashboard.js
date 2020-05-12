import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux' 
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Notifications from './Notifications'

class Dashboard extends Component {
    render(){
     //   console.log(this.props)
     const { projects, auth, notifications } = this.props;
     if (!auth.uid) return <Redirect to='/signup' />
        return(
            <div style={{backgroundColor: '#f4f5f9', height: '100%'}}>
                <Typography style={{fontSize:'3rem', paddingTop:'2%'}} align="center" variant="h6" >Portfolios</Typography>

                <Grid  justify="center" alignItems="center" container style={{paddingTop:'2rem'}}>
                    <Grid item xs={1} />
                    <Grid item xs={10} >
                            <ProjectList projects={projects} /> 
                    </Grid>
                    <Grid item xs={1} >
                    {// <Notifications notifications={notifications}/>
                    }
                    </Grid>            
                </Grid>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
   // console.log(state.firestore.ordered);
    return {
        auth: state.firebase.auth,
        projects: state.firestore.ordered.projects,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection: 'projects', orderBy:['createdAt', 'desc']}, {collection: 'notifications', limit: 3, orderBy:['time', 'desc']}])
    
)(Dashboard);