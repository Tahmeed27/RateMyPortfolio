import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import moment from 'moment'
import AddCommentOutlinedIcon from '@material-ui/icons/AddComment';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TextField } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import {createComment} from '../../store/actions/projectActions'


const useStyles = makeStyles((theme) => ({
  card: {
    maxHeight: '20rem',
    overflow: 'auto'
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  commentContaier: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20rem',
    margin: '0.5rem',
    padding: '1rem',
  },
  textarea: {
     padding:'1rem', 
     fontFamily: 'Roboto', 
     flexGrow: 1, 
     marginRight: '1rem'
  }
}));

function dynamicsort(property,order) {
  var sort_order = 1;
  if(order === "desc"){
      sort_order = -1;
  }
  return function (a, b){
      // a should come before b in the sorted order
      if(a[property] < b[property]){
              return -1 * sort_order;
      // a should come after b in the sorted order
      }else if(a[property] > b[property]){
              return 1 * sort_order;
      // a and b are the same
      }else{
              return 0 * sort_order;
      }
  }
}

function Comments(props) {
  const classes = useStyles();
  const { id, profile } = props;
  const comments = props.comments.slice().sort(dynamicsort("time", "desc"))
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = useState('')
  const [commentArr, setCommentArr] = useState(comments)

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleComment = () => {
    handleClose();
    const newComment = {
      content: text,
      user: `${profile.firstName} ${profile.lastName}`,
      time: new Date()
    }
   // console.log(commentArr.concat(newComment).slice().sort(dynamicsort("time", "desc")))
    setCommentArr(commentArr.concat(newComment).slice().sort(dynamicsort("time", "desc")))
    props.createComment(text, id);
  }

  const open = Boolean(anchorEl);

  if (!commentArr) {
    return (
      <div style={{ margin: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ padding: '1rem', paddingTop: '3rem', fontSize: 'larger' }} align="left" variant="h6">Comments</Typography>
          <IconButton onClick={handleClick} style={{ marginTop: '2rem', marginRight: '1.5rem' }}>
            <AddCommentOutlinedIcon style={{ padding: '0.2rem' }} color="secondary" fontSize="large" />
          </IconButton>
        </div>
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
          <div>
            <TextField
              id="text"
              label="Write a comment"
              onChange={e => setText(e.target.value)}
              multiline
              rows="3"
            />
          </div>
        </Popover>
      </div>
    )
  } else {
    return (
      <div style={{ margin: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ padding: '1rem', paddingTop: '3rem', fontSize: 'larger' }} align="left" variant="h6">Comments</Typography>
          <IconButton onClick={handleClick} style={{ marginTop: '2rem', marginRight: '1.5rem' }}>
            <AddCommentOutlinedIcon style={{ padding: '0.2rem' , fontSize:'1.8rem'}} color="secondary" />
          </IconButton>

        </div>
        <div style={{ paddingLeft: "1rem", paddingBottom: '2rem' }} align="left">
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <div className={classes.commentContaier}>
              <TextareaAutosize
                className={classes.textarea}
                id="text"
                placeholder="Write a comment..."
                onChange={e => setText(e.target.value)}
              />
              <IconButton onClick={handleComment}>
                <SendOutlinedIcon />
              </IconButton>
            </div>
          </Popover>
          <div className={classes.card}>
            <List className={classes.root}>
              {commentArr.map(item => {
                const time = item.time.seconds 
                ? moment(item.time.toDate()).fromNow()
                : moment(item.time).fromNow()
                return (
                  <div >
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              variant="body2"
                              color="secondary">
                              {`${item.user}`}
                            </Typography>
                            <Typography>
                              {`${item.content}`}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textSecondary"> 
                              {time}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="middle" />
                  </div>
                )
              })}
            </List>
          </div>
        </div>
      </div >
    )
  }
}


const mapDispatchToProps = {
  createComment,
}

export default connect(null, mapDispatchToProps)(Comments)
