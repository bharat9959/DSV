import { Button, TextField, Grid, Typography, Box } from "@mui/material";

export default function Content(props) {
  return (
    <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
