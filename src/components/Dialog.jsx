import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function Dial() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selRow, setSelRow] = useState([]);
  const [counter, setCounter] = useState(0);
  const baseURL = 'http://127.0.0.1:8000/book/';

  const peticionGet = async () => {
    await axios.get(baseURL)
      .then((response) => {
        setRows(response.data);
      });
  };

  const onRowClick = (pk) => () => {
    const index = rows.findIndex((row) => row.pk === pk);
    setCounter(index); /* Define el valor del contador como la posición del libro en el array */
    setSelRow(rows[index]);/* Añade al estado el libro seleccionado */
    setOpen(true);
  };

  useEffect(async () => {
    await peticionGet();
  }, []);

  const before = () => {
    setSelRow(rows[counter - 1]);
    setCounter(counter - 1);
  };

  const next = () => {
    setSelRow(rows[counter + 1]);
    setCounter(counter + 1);
  };

  return (
    <>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.pk}
              onClick={onRowClick(row.pk)}
            >
              <TableCell component="th" scope="row">
                <Button color="primary">{row.title}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={selRow.image}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {selRow.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h4">
                      Author:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`${selRow.author?.first_name} ${selRow.author?.last_name}`}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h4">
                      Summary:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {selRow.summary}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h4">
                      ISBN:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {selRow.isbn}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h4">
                      Genre:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {selRow.genre}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <BottomNavigation>
                  <BottomNavigationAction label="before" value="before" icon={<NavigateBeforeIcon />} onClick={(counter > 0) ? () => before() : () => { setCounter(rows.length - 1); setSelRow(rows[rows.length - 1]); }} />
                  <BottomNavigationAction label="next" value="next" icon={<NavigateNextIcon />} onClick={(counter !== rows.length - 1) ? () => next() : () => { setCounter(0); setSelRow(rows[0]); }} />
                </BottomNavigation>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="primary"
          >
            Close
            <CheckIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
