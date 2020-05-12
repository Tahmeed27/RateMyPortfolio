import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        width: '-webkit-fill-available',
        margin: '2rem',

    },
    row: {
        borderBottom: "none",
        fontSize: 'large'


    },
    font: {
        fontSize: 'larger'
    }
});

export default function AllocationTable({ project }) {
    const rows = project.tickers.map((ticker, index) => {
        return {
            name: ticker,
            allocation: project.percentages[index]
        }
    }
    );

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.font} >Stock</TableCell>
                        <TableCell className={classes.font} align="right">Allocation&nbsp;(%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell className={classes.row} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell className={classes.row} align="right">{row.allocation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
