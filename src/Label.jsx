import { Button, TextField, Grid, Typography, Box } from "@mui/material";

export default function Label(props) {
  return (
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {props.children}
    </Typography>
  );
}
