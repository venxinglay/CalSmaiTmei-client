import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UrlService from '../services/UrlService';
import Table from '@material-ui/core/Table';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

export default function InteractiveList() {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        axios
            .get(UrlService.SaveRandomizerList())
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleExport = () => {

        axios
            .get(UrlService.ExportUrl(), {
                responseType: "blob",
            })
            .then((response) => {
                const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                const fileLink = document.createElement("a");

                fileLink.href = fileURL;
                fileLink.setAttribute("download", "random.xls");
                document.body.appendChild(fileLink);

                fileLink.click();
            });
    };
    return (
        <div style={{ margin: '50px' }}>
            <Grid container justify='center'>
                <Grid item xs={8}>
                    <Typography variant='h6'>Randomizer Infromation</Typography>
                    <Grid>
                        <Table size='small' aria-label='a dense table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align='right'>Type</TableCell>
                                    <TableCell align='right'>Items</TableCell>
                                    <TableCell align='right'>Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell component='th' scope='row'>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align='right'>{item.type}</TableCell>
                                        <TableCell align='right'>
                                            {item.data.items.join(' | ')}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {item.data.result.join(' | ')}
                                        </TableCell>
                                        {/*<TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleDelete(item.id)}
                                                startIcon={<DeleteIcon />}
                                            >
                                            </Button>
                                        </TableCell>
                                        */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Grid style={{ margin: '30px' }}>
                    <Button
                        variant='contained'
                        className='bg-secondary text-light'
                        onClick={handleExport}
                        startIcon={<ImportExportIcon />}
                    ></Button>
                </Grid>
            </Grid>
        </div>
    );
}
// <div className={classes.demo}>
//     <List>
//         {data.map((item, index) => (

//             <ListItem>
//                 <ListItemAvatar>
//                     <Avatar>
//                         <FolderIcon />
//                     </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                     secondary={secondary ? 'Secondary text' : null}
//                 >{index + 1},  {item.data.items.join(",")}  {item.data.result}</ListItemText>
//                 <ListItemText
//                     secondary={secondary ? 'Secondary text' : null}
//                 ></ListItemText>
//                 <ListItemText

//                 >{ }</ListItemText>
//                 <ListItemSecondaryAction>
//                     <IconButton edge="end" aria-label="delete">
//                         <DeleteIcon />
//                     </IconButton>
//                 </ListItemSecondaryAction>
//             </ListItem>
//         ))}
//     </List>
// </div>
