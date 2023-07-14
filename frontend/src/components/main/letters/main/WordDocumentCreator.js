import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

function WordDocumentCreator() {
  // Construct the relative URL to the Word documents
  const APL = `${process.env.PUBLIC_URL}/templates/APL.docx`;
  const EL = `${process.env.PUBLIC_URL}/templates/EL.docx`;
  const RL = `${process.env.PUBLIC_URL}/templates/RL.docx`;
  const TL = `${process.env.PUBLIC_URL}/templates/TL.docx`;

  // Render a grid of buttons to download the Word documents
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" class="text-center">Download Word Document Templates</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" href={APL} download>
          Appreciation Letter
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" href={EL} download>
          Experience Letter
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" href={RL} download>
          Resignation Letter
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" href={TL} download>
          Testimonial Letter
        </Button>
      </Grid>
    </Grid>
  );
}

export default WordDocumentCreator;