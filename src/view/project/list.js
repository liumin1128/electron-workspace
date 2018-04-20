import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import ProjectItem from './item';

@connect(({ project }) => ({ project }))
export default class ProjiectList extends PureComponent {
  render() {
    const { project, dispatch } = this.props;
    const { list } = project;
    return (
      <Grid container spacing={16}>
        <button onClick={() => {
          dispatch({
            type: 'project/push',
            payload: {
              path: 'path11',
              name: 'name11',
            },
          });
        }}
        >222</button>
        {
          list.map(i => (<Grid key={i.path} item xs={12}>
            <ProjectItem {...i} />
          </Grid>))
        }
      </Grid>
    );
  }
}
