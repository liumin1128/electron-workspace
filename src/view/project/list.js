import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import ProjectItem from './item';

@connect(({ project }) => ({ project }))
export default class ProjiectList extends PureComponent {
  render() {
    const { project } = this.props;
    console.log('project');
    console.log(project);
    const { list } = project;
    return (
      <div style={{ padding: 16 }}>
        <Grid container spacing={24}>
          {
            list.map(i => (<Grid key={i.path} item xs={12}>
              <ProjectItem {...i} />
            </Grid>))
          }
        </Grid>
      </div>
    );
  }
}
