import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import { run } from '../../utils/common';
import Logs from './logs';

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

@connect(({ log }) => ({ log }))
class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      classes, name, path, scripts, dispatch, log,
    } = this.props;

    const list = log
      .get('list')
      .filter(i => i.project === name)
      .groupBy(i => i.script)
      .map((val, key) => {
        console.log('valxxx');
        console.log(val);
        const { data, message } = val.get(-1);
        console.log('data');
        console.log({ data });
        console.log('message');
        console.log({ message });
        const idx = data.lastIndexOf('\n');

        // console.log('idx');
        // console.log(idx);

        const newest = idx !== -1 ? data : data.substr(idx);

        // console.log('newest');
        // console.log(newest);

        return {
          key,
          data: val.map(i => i.data).join('\n'),
          message,
          newest,
        };
      });
      // .toJS();

    // console.log('list');
    // console.log(list);
    // console.log('list.toJS()');
    // console.log(list.toJS());

    const logs = log
      .get('list')
      .filter(i => i.project === name);
      // .toJS();

    return (
      <div>
        <ul>
          {
            // JSON.stringify(list)
          }
          {
            // list.map((val, key, obj) => {
            //   console.log(obj);
            //   return (<li key={'111'}>
            //     <span style={{ border: '1px red solid' }}>{key}</span>;
            //     <pre style={{
            //       // whiteSpace: 'nowrap',
            //       // textOverflow: 'ellipsis',
            //       // overflow: 'hidden',
            //     }}
            //     >
            //       {val.map(i => i.data)}
            //     </pre>

            //   </li>);
            // })
          }
        </ul>

        <Card className={classes.card}>
          <CardHeader
            // avatar={
            //   <Avatar aria-label="Recipe" className={classes.avatar}>
            //     R
            //   </Avatar>
            // }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={name}
            subheader={path}
          />

          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              onClick={async () => {
                const data = await run(
                  `./code ${path}`,
                  { cwd: '/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin' },
                );
                console.log('data');
                console.log(data);
              }}
              aria-label="Add to favorites"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={async () => {
                const data = await run(
                  'npm run start',
                  { cwd: path },
                );
                console.log('data');
                console.log(data);
              }}
              aria-label="Share"
            >
              <PlayIcon />
            </IconButton>

            <button
              onClick={async () => {
              const data = await run(
                'pwd -L',
                { cwd: path },
              );
              console.log('data');
              console.log(data);
              dispatch({
                type: 'log/push',
                payload: {
                  project: name,
                  script: 'pwd -L',
                  status: 'success',
                  message: '运行成功',
                  data,
                },
              });
            }}
            >pwd -L</button>

            <IconButton
              onClick={async () => {
                const data = await run(
                  'ls ./',
                  { cwd: path },
                );
                console.log('data');
                console.log(data);
                dispatch({
                  type: 'log/push',
                  payload: {
                    project: name,
                    script: 'ls ./',
                    status: 'success',
                    message: '运行成功',
                    data,
                  },
                });
              }}
              aria-label="Share"
            >
              <PlayIcon />
            </IconButton>

            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {
                  Object.keys(scripts).map(key => (<button
                    onClick={async () => {
                      const script = `npm run ${key}`;
                    const data = await run(
                      script,
                      { cwd: path },
                    );
                    console.log('data');
                    console.log(data);
                    dispatch({
                      type: 'log/push',
                      payload: {
                        project: name,
                        script,
                        status: 'success',
                        message: '运行成功',
                        data,
                      },
                    });
                  }}
                  >{key}</button>))
                }
            </CardContent>
          </Collapse>
        </Card>
        <Logs list={list} />

      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
