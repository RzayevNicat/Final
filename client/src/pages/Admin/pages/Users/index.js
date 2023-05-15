import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const columns = [
	{ id: 'id', label: 'ID', minWidth: 170 },
	{ id: 'name', label: 'Name', minWidth: 100 },
	{
		id: 'email',
		label: 'Email',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US')
	},
	{
		id: 'role',
		label: 'Role',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US')
	},
	{
		id: 'crud',
		label: 'Operations',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US')
	}
];

function createData(name, code, population, size) {
	const density = population / size;
	return { name, code, population, size, density };
}

const rows = [
	createData('India', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767)
];

export default function StickyHeadTable() {
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
	const [ data, setData ] = useState([]);
	const navigate = useNavigate();
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	useEffect(() => {
		axios
			.get('https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/users')
			.then((res) => setData(res.data.data));
	}, []);
	const handleDelete = (id) => {
		axios.delete(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/users/${id}`);
		let copy = data.filter((x) => x._id !== id);
		setData(copy);
	};
	const handleDetails = (id) => {
		navigate(`userProfile/${id}`);
	};
	return (
		<div className="users-tables">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Users</title>
			</Helmet>
			<div className="titlee">
				<h3>Users</h3>
				<Link to={'/admin/userCreate'}>Create User</Link>
			</div>

			<Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '3%' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table" className="table-users">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
										<TableCell align="center">{row._id.substr(0, 6)}</TableCell>
										<TableCell align="center">{row.name}</TableCell>
										<TableCell align="center">{row.email}</TableCell>
										<TableCell align="center">{row.role}</TableCell>
										<TableCell align="center">
											<Button
												size="small"
												variant="outlined"
												color="error"
												className="btn-user"
												onClick={() => handleDelete(row._id)}
											>
												Delete
											</Button>
											<Button
												onClick={() => handleDetails(row._id)}
												variant="outlined"
												size="small"
												color="success"
												className="btn-user"
											>
												Details
											</Button>
											{/* <Button variant="outlined" size="small" color="info" className="btn-user">
												Edit
											</Button> */}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 10, 25, 100 ]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
