import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import {
	Link,
	Spinner,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	User,
	Pagination,
	table,
} from '@nextui-org/react';

import { getApiKey, reset } from '../../features/tsm/tsmSlice';

//const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'status', 'actions'];
const realmOptions = [
	{ uid: 1, name: 'realm 1' },
	{ uid: 1, name: 'realm 1' },
];

const data = {
	columns: [
		{
			key: 'name',
			label: 'ITEM NAME',
		},
		{
			key: 'avgPrice',
			label: 'AVG PRICE',
		},
		{
			key: 'status',
			label: 'DEAL',
		},
	],

	rows: [
		{
			id: 1,
			name: 'Item 1',
			role: 'CEO',
			team: 'Management',
			status: 'yes',
			avgPrice: '29',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
			email: 'tony.reichert@example.com',
		},
		{
			id: 2,
			name: 'Item 2',
			role: 'Tech Lead',
			team: 'Development',
			status: 'no',
			avgPrice: '25',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
			email: 'zoey.lang@example.com',
		},
	],
};

function Dashboard() {
	const dispatch = useDispatch();

	const { tsmApiKey, isError, isSuccess, message } = useSelector(
		(state) => state.tsm
	);

	const [tableData, setTableData] = useState({ columns: [], rows: [] });
	const [filterValue, setFilterValue] = useState('');
	// const [visibleColumns, setVisibleColumns] = useState(
	// 	new Set(INITIAL_VISIBLE_COLUMNS)
	// );
	const [realmFilter, setRealmFilter] = useState('all');
	const [auctionHouseFilter, setAuctionHouseFilter] = useState('all');
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [page, setPage] = useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const navigate = useNavigate();
	const { user } = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}

		//make a fetch for token
		dispatch(getApiKey());
		setTableData((prevState) => ({
			...prevState,
			data,
		}));

		columns = tableData.columns;
		rows = tableData.rows;

		dispatch(reset());
	}, [dispatch]);

	let { columns, rows } = data;

	const onSearchChange = useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	const onRowsPerPageChange = React.useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const topContent = useMemo(() => {
		return (
			<div>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between gap-3 items-end'>
						<Input
							isClearable
							className='w-full sm:max-w-[44%]'
							placeholder='Search by name...'
							startContent={<FaSearch />}
							value={filterValue}
							onClear={() => onClear()}
							onValueChange={onSearchChange}
						/>
						<div className='flex gap-3'>
							{/* REALMS DROPDOWN */}
							<Dropdown>
								<DropdownTrigger className='hidden sm:flex'>
									<Button
										endContent={<FaChevronDown className='text-small' />}
										variant='flat'>
										Realms
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									disallowEmptySelection
									aria-label='Table Columns'
									closeOnSelect={false}
									selectedKeys={realmFilter}
									selectionMode='multiple'
									onSelectionChange={setRealmFilter}>
									{realmOptions.map((realm) => (
										<DropdownItem key={realm.uid}>{realm.name}</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>

							{/* AH DROPDOWN */}

							<Dropdown>
								<DropdownTrigger className='hidden sm:flex'>
									<Button
										endContent={<FaChevronDown className='text-small' />}
										variant='flat'>
										Auction House
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									disallowEmptySelection
									aria-label='Table Columns'
									closeOnSelect={false}
									selectedKeys={auctionHouseFilter}
									selectionMode='multiple'
									onSelectionChange={setAuctionHouseFilter}>
									{realmOptions.map((realm) => (
										<DropdownItem key={realm.uid}>{realm.name}</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>

							{/* more options */}
							<Button color='primary'>Add New</Button>
						</div>
					</div>
					<div className='flex justify-between items-center'>
						<span className='text-default-400 text-small text-white'>
							Total {rows.length} items
						</span>
						<label className='flex items-center text-default-400 text-small text-white'>
							Rows per page:
							<select
								className='bg-transparent outline-none text-default-400 text-small text-white'
								onChange={onRowsPerPageChange}>
								<option value='5'>5</option>
								<option value='10'>10</option>
								<option value='15'>15</option>
							</select>
						</label>
					</div>
				</div>
			</div>
		);
	});

	const DashboardNullTsmToken = () => {
		return (
			<div>
				No token detected, please follow instructions{' '}
				<Link underline='always' color='foreground'>
					<NavLink to={'/profile'}>here</NavLink>
				</Link>
			</div>
		);
	};

	const DashboardWithTsmToken = () => {
		return (
			<div>
				Dashboard
				<div>
					<Table
						aria-label='Example table with dynamic content'
						topContent={topContent}
						topContentPlacement='outside'>
						<TableHeader columns={columns}>
							{(column) => (
								<TableColumn key={column?.key}>{column?.label}</TableColumn>
							)}
						</TableHeader>
						{rows.length === 0 ? (
							<TableBody emptyContent={'No rows to display.'}>{[]}</TableBody>
						) : (
							<TableBody items={rows}>
								{(item) => (
									<TableRow key={item?.key}>
										{(columnKey) => (
											<TableCell>{getKeyValue(item, columnKey)}</TableCell>
										)}
									</TableRow>
								)}
							</TableBody>
						)}
					</Table>
				</div>
			</div>
		);
	};

	return (
		<>
			<div>
				{!user ? (
					navigate('/login')
				) : user?.tsmToken ? (
					<DashboardWithTsmToken></DashboardWithTsmToken>
				) : (
					<DashboardNullTsmToken></DashboardNullTsmToken>
				)}
			</div>
		</>
	);
}

export default Dashboard;
