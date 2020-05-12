import React, { useState, useEffect } from 'react'
import { Divider, Typography, Grid, Paper, Button, Popover } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import LineGraph from './graphs/LineGraph'
import DonutGraph from './graphs/DonutGraph'
import AllocationTable from './AllocationTable'
import Comments from './Comments'
import Tooltip from '@material-ui/core/Tooltip';
import RatingSlider from './RatingSlider'

function ProjectDetails(props) {
    console.log(props);
    const id = props.match.params.id;


    const { auth, project, profile } = props;

    const containerStyle = {
        margin: "2%",
    }


    if (!auth.uid) return <Redirect to='/signup' />

    if (project) {
        return (
            <Container style={{ backgroundColor: '#f4f5f9' }} align="center">
                <Container style={containerStyle} maxWidth="lg">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography align="left" style={{ fontSize: '3rem', paddingBottom: '1rem' }} variant="h6" >{project.title}</Typography>
                        <RatingSlider ratings={project.ratings} id={id} />
                    </div>
                    <Grid style={{ marginBottom: '1rem', overflow: 'auto' }} container alignItems="center" spacing={3}>

                        {project && project.tickers.map((ticker, index) => {
                            return (
                                <Grid zeroMinWidth item xs={12} sm={6} md={3} key={index} >
                                    <Paper>
                                        <LineGraph ticker={ticker} tickerName={project.tickerNames[index]} />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid container justify="flex-end" direction="row-reverse" spacing={4}>
                        <Grid zeroMinWidth item md={7}>
                            <Paper style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                                <DonutGraph project={project} />
                            </Paper>
                            <Paper style={{ marginTop: '2rem' }}>
                                <Comments id={id} comments={project.comments} profile={profile} />
                            </Paper>
                        </Grid>
                        <Grid zeroMinWidth item md={5}>
                            <AllocationTable project={project} />
                            <Paper style={{ marginTop: '2rem' }}>
                                <div style={{ margin: '2rem' }}>
                                    <Typography style={{ padding: '1rem', paddingTop: '3rem', fontSize: 'larger' }} align="left" variant="h6">Description</Typography>
                                    <Typography style={{ paddingLeft: "1rem", paddingBottom: '2rem' }} align="left">
                                        {project.description}
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Divider style={{ marginBottom: "1rem", backgroundColor: '#e91e63' }} variant="fullWidth" />
                    <Typography color="textSecondary" variant="subtitle1" align="left" > Posted by {project.authorFirstName} {project.authorLastName} </Typography>
                    <Typography color="textSecondary" variant="subtitle2" align="left" > {moment(project.createdAt.toDate()).calendar()}</Typography>

                </Container>
            </Container>
        )

    } else {
        return (
            <Container align="center">
                <Typography> Loading Project </Typography>
            </Container>
        )
    }

    /*
    <Container style={{containerStyle}}>
            <Typography style={{fontSize:'3rem'}} align="left" variant="h6" >{project.title}</Typography>
            <Typography style={{paddingBottom: "2%"}} variant="body1">
            {project.description}
            </Typography>
            <Divider style={{marginBottom: "1rem", backgroundColor: '#e91e63'}}  variant="fullWidth" /> 
            <Typography color="textSecondary" variant="subtitle1" align="left" > Posted by {project.authorFirstName} {project.authorLastName} </Typography>
            <Typography color="textSecondary" variant="subtitle2" align="left" > {moment(project.createdAt.toDate()).calendar()}</Typography>
    </Container>
    */

}
/*
    } else {
        return (
            <Container align="center">
                <Typography> Loading Project </Typography>
            </Container>
        )
    }
    */


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    console.log(state)
    const project = projects ? projects[id] : null
    return {
        auth: state.firebase.auth,
        project: project,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        const id = props.match.params.id;
        return (
            [{ collection: 'projects', doc: id, storeAs: 'project' },
            ]
        )
    })
)(ProjectDetails)
