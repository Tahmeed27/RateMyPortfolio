import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import {signUp} from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'


export class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',


    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    handleSignup = (event) => {
        this.props.signUp(this.state)
    }


    render() {
        const { auth, authError } = this.props
        if (auth.uid) return <Redirect to='/' />


        return (
            <Grid container>
                <Grid item xs={1} md={2} />
                <Grid item xs={10} md={8}>
                    <Paper style={styles.paper}>
                        <form style={styles.container} noValidate autoComplete="off">
                            <Typography variant="h2" style={styles.text1}> Sign Up</Typography>
                            <TextField
                                id="firstname"
                                label="First Name"
                                style={styles.text}
                                variant="outlined"
                                onChange={this.handleChange}
                            />

                            <TextField
                                id="lastname"
                                label="Last Name"
                                variant="outlined"
                                onChange={this.handleChange}
                            />

                            <TextField
                                id="email"
                                label="Email"
                                style={styles.text}
                                variant="outlined"
                                onChange={this.handleChange}
                            />

                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                onChange={this.handleChange}
                                type="password"
                            />
                            { authError ? <Typography color="secondary">{authError}</Typography> : null }
                            <div >
                            
                                <Button onClick={this.handleSignup} style={styles.btn} variant="contained" color="secondary" disableElevation>
                                    Sign Up
                                </Button>
                            </div>

                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={1} md={2} />
            </Grid >




        )
    }
}

const styles = {
    paper: {
        margin: 'auto',
        maxWidth: '70%'
    },
    container: {
        marginTop: '2rem',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    text1: {
        margin: '2rem',

    },
    text: {
        margin: '1rem',

    },
    btn: {
        margin: '1rem',
        marginTop: '2rem'
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = {
    signUp,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
