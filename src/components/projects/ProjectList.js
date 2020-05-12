import React from 'react';
import ProjectSummary from './ProjectSummary'
import { Grid } from '@material-ui/core'



export default function ProjectList({projects}) {
  
  return (
    <Grid item justify="center" alignItems="center" container spacing={8}>
        { projects && projects.map(project => {
            return (
              <Grid item xs={12}  md={6}  key={project.id} >
                <ProjectSummary project={project}  />
              </Grid>
            )
          
        })}
    </Grid>
  );
}

