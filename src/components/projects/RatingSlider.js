import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Slider, Input, Popover, Button, Grid, IconButton, Tooltip } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { createRating } from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import Circle from 'react-circle';


const useStyles = makeStyles({
  root: {
    width: 250,
    color: '#FF2660',
    padding: '1rem'
  },
  input: {
    width: 42,
    margin: 'auto'
  },
});

function RatingSlider(props) {
  const classes = useStyles();
  const { id, ratings } = props
  const [value, setValue] = React.useState(30);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [ratingsArr, setRatingsArr] = useState(ratings)

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRating = () => {
    console.log(ratingLength, ratingTotal)

    handleClose();
    setRatingsArr(ratingsArr.concat(value))
    props.createRating(value, id);
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const ratingLength = ratingsArr.length
  const ratingTotal = ratingsArr.reduce((a,b) => a + b, 0)
  const rating = ratingLength 
                  ? (ratingTotal/ratingLength).toFixed(1)
                  : 0
  return (
    <div style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center' }}>
      <Tooltip placement="left" title={<Typography>{ratingLength} votes</Typography>}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Circle
            animate={true}
            animationDuration="1s"
            progress={rating}
            size={150}
            lineWidth={25}
            textColor="rbg(0,0,0)"
            progressColor="#FF2660"
            textStyle={{
                      font: 'bold 6rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                    }}
            // progressColor="rgb(89,242,221)"
            showPercentageSymbol={false}
          />
        </div>
      </Tooltip>
      <div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <div className={classes.root}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <IconButton onClick={handleRating} style={{ padding: '0.5rem' }}>
                  <AddBoxOutlinedIcon fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={value}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Popover>
        <Button onClick={handleClick} style={{ marginLeft: '1rem' }} variant="outlined" color="secondary">Rate</Button>

      </div>
    </div>

  );
}
const mapDispatchToProps = {
  createRating,
}

export default connect(null, mapDispatchToProps)(RatingSlider)
