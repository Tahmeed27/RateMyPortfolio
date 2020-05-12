import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '1rem',
    maxWidth: '40ch'

  },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Notifications(props) {
  const classes = useStyles();
  const { notifications } = props;

  if (!notifications) return null;

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <List className={classes.root}>
          {notifications.map(item => {
            return (
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
                        color="textSecondary"
                      >
                        {moment(item.time.toDate()).fromNow()}
                      </Typography>
                    </React.Fragment>
                  }
                />
            </ListItem>

            )
          })}
          
        </List>
      </CardContent>
    </Card>
  );
}
