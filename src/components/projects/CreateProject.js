import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Card, CardContent, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { Doughnut } from 'react-chartjs-2';
import { createProject } from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useMediaQuery } from 'react-responsive'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'

export class CreateProject extends Component {

    state = {
        searchResults: [],
        error: false,
        comments: [],
        title: '',
        ticker: '',
        tickerName: '',
        percent: 0,
        description: '',
        tickers: [],
        tickerNames: [],
        percentages: [],
        ratings: [],
    };

    cancel = ''

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.valueAsNumber || event.target.value,
        })
    }

    handleSearch = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        }, () => {
            this.fetchSearch(this.state.ticker)
        })
    }
    
    fetchSearch = (query) => {
        const API_key = 'bqo7povrh5reqlm366jg';
        let API_call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_key}`

        if (this.cancel) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios
            .get(API_call, {
                cancelToken: this.cancel.token
            })
            .then((resp) => {
               // debugger;
                console.log(resp.data.bestMatches.slice(0, 3));
                this.setState({
                    searchResults: resp.data.bestMatches.slice(0, 3),
                })

            })
            .catch((error) => {
                console.log(error)

                if (axios.isCancel(error) || error) {
                    this.setState({
                    })
                }
            })
    }
    // Object.keys(searchResults).length && 

    handleAdd = () => {
        this.setState(state => {
            const tickers = [...state.tickers, state.ticker];
            const percentages = [...state.percentages, state.percent];
            const tickerNames = [...state.tickerNames, state.tickerName];
            return {
                tickers,
                percentages,
                tickerNames
            }
        })
    }
    onTagsChange = (event, value) => {
        if (value) {
            this.setState({
                ticker: value['1. symbol'],
                tickerName: value['2. name']
            }, () => {
                // This will output an array of objects
                // given by Autocompelte options property.
                console.log(this.state.ticker);
            });
        }
    }
    handleDelete = (event) => {
        this.setState(state => {
            return {
                tickers: state.tickers.slice(0, -1),
                percentages: state.percentages.slice(0, -1)
            }
        })
    }
    handleCreate = (event) => {
        console.log(this.state);

        let sum = this.state.percentages.reduce((a, b) => {
            return a + b
        }, 0);
        if (sum == 100) {
            this.props.createProject(this.state)
            this.props.history.push('/');
        } else {
            this.setState({
                error: true                    
            })
        }
    }

    render() {
        const { auth } = this.props;
        const { tickers, percentages } = this.state;
        const chartData = {
            labels: tickers,
            datasets: [
                {
                    label: 'Asset Allocation',
                    data: percentages,
                }
            ]
        }

        if (!auth.uid) return <Redirect to='/signup' />

        return (
            <div style={{ backgroundColor: '#f4f5f9' }} >
                <Typography style={{ fontSize: '3rem', paddingTop: '4%', paddingBottom: '2%' }} align="center" color="textPrimary" variant="h6" >Create a Portfolio</Typography>
                <Grid container>
                    <Grid item xs={1} md={2} />
                    <Grid item xs={10} md={8}>
                        <div style={styles.formContainer}>
                            <Card style={styles.container} raised={true}>
                                <CardContent  >
                                        <div style={styles.innerContainer}>
                                            <div>
                                                <TextField
                                                    id="title"
                                                    label="Title"
                                                    required
                                                    fullWidth
                                                    style={styles.text}
                                                    variant="outlined"
                                                    onChange={this.handleChange}
                                                />
                                                <br />
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{width:'14ch', marginRight:'0.5rem'}}>
                                                        <Autocomplete
                                                            id="ticker"
                                                            onChange={this.onTagsChange}
                                                            getOptionLabel={(item) => item['1. symbol']}
                                                            // options={Object.keys(this.state.searchResults).length ? this.state.searchResults : [] }
                                                            options={this.state.searchResults}
                                                            renderInput={(params) => (
                                                                <TextField {...params} onChange={this.handleSearch} label="Ticker" variant="outlined" />
                                                            )}/>
                                                    </div>
                                                    <TextField
                                                        id="percent"
                                                        label="Percent"
                                                        type="number"
                                                        style={{width:'12ch'}}
                                                        variant="outlined"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <br />
                                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                    <IconButton onClick={this.handleAdd} aria-label="add">
                                                        <AddCircleOutlineIcon
                                                            color="secondary"
                                                            style={{ fontSize: 30 }}
                                                        />

                                                    </IconButton>
                                                    <IconButton onClick={this.handleDelete} aria-label="delete">
                                                        <DeleteOutlineIcon
                                                            color="secondary"
                                                            style={{ fontSize: 30 }}
                                                        />
                                                    </IconButton>
                                                </div>
                                            </div>

                                            <div>
                                                <Doughnut
                                                    data={chartData}
                                                    options={{
                                                        cutoutPercentage: 60,
                                                        responsive: true,
                                                        plugins: {
                                                            colorschemes: {
                                                                scheme: "office.Metro6",
                                                                // scheme: 'tableau.HueCircle19',
                                                                // reverse: true
                                                            }
                                                        },
                                                        legend: {
                                                            position: 'right',
                                                        },
                                                        tooltips: {
                                                            callbacks: {
                                                                label: function (tooltipItem, data) {
                                                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                                                    var currentValue = dataset.data[tooltipItem.index];
                                                                    return currentValue + '%';
                                                                },
                                                                title: function (tooltipItem, data) {
                                                                    return data.labels[tooltipItem[0].index];
                                                                }
                                                            }
                                                        },
                                                    }}
                                                />
                                            </div>`
                                            </div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <TextField
                                                id="description"
                                                label="Description"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                multiline
                                                fullWidth
                                                rows="5"
                                            />
                                        </div>
                                
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={2} />
                    <div style={styles.btnContainer}>
                       { this.state.error ? <Typography style={{marginTop: '0.5rem'}} color="secondary">"You're allocations do not sum to 100"</Typography> : null }

                        <Button onClick={this.handleCreate} style={styles.btn} variant="contained" color="secondary" size="large" disableElevation>
                            Create
                        </Button>
                    </div>
                </Grid>
            </div>
        )
    }
}

const styles = ({
   formContainer:{
       margin: 'auto',
       maxWidth: 'fit-content'
   },
   btnContainer: {
       margin: 'auto',
       display: 'flex',
       flexDirection: 'column',
       justifyContent:'center'
   },
    searchContainer: {
        marginTop: '0.2rem',
        borderStyle: 'solid',
        borderColor: '#e9e9e9'

    },
    container: {
        padding:'2rem',
        display: 'block',
    },

    innerContainer: {
        display: 'inline-flex',
        marginTop: '2rem'
    },

    text: {
        marginBottom: '1rem',

    },
    
    btn: {
        margin: 'auto',
        marginTop: '1rem',
        marginBottom: '5%'
    }

})

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

/*
const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}
*/
const mapDispatchToProps = {
    createProject,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
