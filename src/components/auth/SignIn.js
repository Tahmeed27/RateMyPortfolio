import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Paper, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

export class SignIn extends Component {
    state = {
        email: '',
        password: '',

    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    handleSignin = (event) => {
        this.props.signIn(this.state)

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
                            <Typography variant="h2" style={styles.text}> Sign In</Typography>
                            <TextField
                                id="email"
                                label="Email"
                                style={styles.text}
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                            <br />
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                onChange={this.handleChange}
                                type="password"
                            />
                            <Button onClick={this.handleSignin} style={styles.btn} variant="contained" color="secondary" disableElevation>
                                Sign In
                        </Button>
                            {authError ? <Typography color="secondary">{authError}</Typography> : null}
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
    text: {
        margin: '2rem',
        marginBottom: '1rem',

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
    signIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
