import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import RotateIcon from "@mui/icons-material/ChangeCircle";

export default function CoordConfig(props) {
  const {
    coord,
    setRotateBoard,
    rotateBoard,
    setRandomCoord,
    showCoord,
    setShowCoord,
    wrongCoord,
  } = props.coordConfig;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item>
            <Typography variant="h5">
              Find
              <div
                className={`coord ${
                  wrongCoord ? "animate__animated animate__headShake animate__repeat-1 red" : ""
                }`}
              >
                <b>{coord}</b>
              </div>
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<RotateIcon />}
              onClick={() => {
                setRotateBoard(!rotateBoard);
              }}
            >
              Flip
            </Button>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Show Coord"
              onChange={() => {
                setShowCoord((showCoord) => !showCoord);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
