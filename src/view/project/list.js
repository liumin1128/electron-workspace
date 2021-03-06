import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import ProjectItem from './item';
import Logs from './logs-bottom';

@connect(({ project }) => ({ project }))
export default class ProjiectList extends PureComponent {
  render() {
    const { project, dispatch } = this.props;
    console.log('project');
    console.log(project);
    const list = project
      .get('list').toJS();
    // console.log('list');
    // console.log(list);
    return (
      <Grid container spacing={16}>
        {
          list.length > 0 && list.map(i => (<Grid key={i.path} item xs={12}>
            <ProjectItem {...i} />
          </Grid>))
        }

        <Logs />
      </Grid>
    );
  }
}
