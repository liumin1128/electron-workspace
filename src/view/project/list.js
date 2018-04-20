import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import ProjectItem from './item';

@connect(({ project }) => ({ project }))
export default class ProjiectList extends PureComponent {
  render() {
    const { project } = this.props;
    const { list } = project;
    return (
      <Grid container spacing={16}>
        {
          list.map(i => (<Grid key={i.path} item xs={12}>
            <ProjectItem {...i} />
          </Grid>))
        }
      </Grid>
    );
  }
}
