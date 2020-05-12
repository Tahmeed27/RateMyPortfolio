import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import Circle from 'react-circle';
import 'chartjs-plugin-colorschemes';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '0.6rem',
  },
  text: {
    textDecoration: 'none'

  },
  titleChart: {
    display: 'flex',
    justifyContent: 'space-between'

  },

  link: {
    maxWidth: 450,
    margin: 'auto',
    backgroundColor: 'rbg(0,0,0)',
    textDecoration: 'none',
    '&:active': {
      outline: 'none',
    },
  }

}));

const ProjectSummary = ({ project }) => {
  const ratingsArr = project.ratings
  const ratingLength = ratingsArr.length
  const ratingTotal = ratingsArr.reduce((a,b) => a + b, 0)
  const rating = ratingLength 
                  ? (ratingTotal/ratingLength).toFixed(1)
                  : 0
  const classes = useStyles();

  const chartData = {
    labels: project.tickers,
    datasets: [
      {
        label: 'Asset Allocation',
        data: project.percentages,
        // backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
      }],
  }

  const [raised, setRaised] = useState(true);
  const toggleRaised = () => setRaised(!raised);
  return (

    <Link to={"/projects/" + project.id} className={classes.link}>
      <Card onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised} className={classes.root}>
        <CardContent style={{ padding: '1rem' }}>
          <div className={classes.titleChart}>
            <div className={classes.names}>
              <Typography style={{ fontSize: '1.5rem' }} variant="h6">{project.title}</Typography>
              <Typography style={{ paddingLeft: '0.2rem', fontSize: '0.8rem' }} color="secondary">{project.authorFirstName} {project.authorLastName}</Typography>
            </div>
            <Tooltip  title={<Typography>{ratingLength} votes</Typography>}>
              <div>
                  <Circle
                    animate={true}
                    animationDuration="3s"
                    progress={rating}
                    size={60}
                    lineWidth={25}
                    progressColor="#FF2660"
                    textColor="rbg(0,0,0)"

                    // progressColor="rgb(89,242,221)"
                    showPercentageSymbol={false}
                    textStyle={{
                      font: 'normal 6rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                    }} />
                </div>
            </Tooltip>
            </div>

          <Doughnut
            data={chartData}
            options={{
              cutoutPercentage: 60,
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
            }}
          />
        </CardContent>
      </Card>
    </Link>


  )

}



export default ProjectSummary;