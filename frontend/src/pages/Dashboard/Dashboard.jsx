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

import { getApiKey, getRealms, reset } from '../../features/tsm/tsmSlice';

let regionOptions = [{}];
let regionsWithRealms = [{}];

let realmOptions = [{}];

let auctionHouseOptions = [{}];

//TODO: after selecting the AH pull items alphabetically and paginate
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

	const { tsmApiKey, tsmRealms, isError, isSuccess, message } = useSelector(
		(state) => state.tsm
	);

	const [tableData, setTableData] = useState({ columns: [], rows: [] });
	const [filterValue, setFilterValue] = useState('');
	const [regionFilter, setRegionFilter] = useState(null);
	const [realmFilter, setRealmFilter] = useState(null);
	const [auctionHouseFilter, setAuctionHouseFilter] = useState(null);
	const [selectedFilters, setSelectedFilters] = useState({
		region: null,
		realm: null,
		auctionHouse: null,
	});
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

		if (!tsmRealms) {
			dispatch(getRealms());
		}

		//make a fetch for token
		dispatch(getApiKey(user));

		const filterRegions = (tsmRealms) => {
			const englishRegions = tsmRealms.items.filter((item) => {
				if (
					(item.regionPrefix === 'us' || item.regionPrefix === 'eu') &&
					(item.gameVersion === 'Season of Discovery' ||
						item.gameVersion === 'Classic Era - Hardcore' ||
						item.gameVersion === 'Wrath')
				) {
					return item;
				}
			});
			return englishRegions;
		};

		if (tsmRealms) {
			const filteredRegions = filterRegions(tsmRealms);
			regionsWithRealms = filteredRegions;
			const finalRegions = filteredRegions.map((region) => {
				return {
					uid: region.regionId,
					name: region.name + ' | ' + region.gameVersion,
				};
			});
			regionOptions = finalRegions;
		}

		setTableData((prevState) => ({
			...prevState,
			data,
		}));

		columns = tableData.columns;
		rows = tableData.rows;

		dispatch(reset());
	}, [dispatch, tsmRealms]);

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

	const onChangeRegion = (id) => {
		realmOptions = regionsWithRealms[id].realms;
		setSelectedFilters((prevState) => ({
			...prevState,
			region: regionsWithRealms[id],
		}));
	};

	const onChangeRealm = (id) => {
		auctionHouseOptions = realmOptions[id].auctionHouses;
		setSelectedFilters((prevState) => ({
			...prevState,
			realm: realmOptions[id],
		}));
	};

	const onChangeAuctionHouse = (id) => {
		setSelectedFilters((prevState) => ({
			...prevState,
			auctionHouse: auctionHouseOptions[id],
		}));
		console.log(auctionHouseOptions[id]);
	};

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
							{/* REGION DROPDOWN */}
							<Dropdown>
								<DropdownTrigger className='hidden sm:flex'>
									<Button
										endContent={<FaChevronDown className='text-small' />}
										variant='flat'>
										{selectedFilters.region
											? selectedFilters.region.name +
											  ' | ' +
											  selectedFilters.region.gameVersion
											: 'Region'}
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									disallowEmptySelection
									onAction={onChangeRegion}
									aria-label='Table Columns'
									closeOnSelect={true}
									selectedKeys={regionFilter}
									selectionMode='single'
									onSelectionChange={setRegionFilter}>
									{regionOptions.map((region, index) => (
										<DropdownItem key={index}>{region.name}</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>

							{/* REALMS DROPDOWN */}
							<Dropdown isDisabled={regionFilter === null}>
								<DropdownTrigger className='hidden sm:flex'>
									<Button
										endContent={<FaChevronDown className='text-small' />}
										variant='flat'>
										{selectedFilters.realm
											? selectedFilters.realm.name
											: 'Realm'}
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									disallowEmptySelection
									onAction={onChangeRealm}
									aria-label='Table Columns'
									closeOnSelect={true}
									selectedKeys={realmFilter}
									selectionMode='single'
									onSelectionChange={setRealmFilter}>
									{realmOptions.map((realm, index) => (
										<DropdownItem key={index}>{realm.name}</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>

							{/* AH DROPDOWN */}

							<Dropdown isDisabled={realmFilter === null}>
								<DropdownTrigger className='hidden sm:flex'>
									<Button
										endContent={<FaChevronDown className='text-small' />}
										variant='flat'>
										{selectedFilters.auctionHouse
											? selectedFilters.auctionHouse.type
											: 'Auction House'}
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									disallowEmptySelection
									onAction={onChangeAuctionHouse}
									aria-label='Table Columns'
									closeOnSelect={false}
									selectedKeys={auctionHouseFilter}
									selectionMode='single'
									onSelectionChange={setAuctionHouseFilter}>
									{auctionHouseOptions.map((ah, index) => (
										<DropdownItem key={index}>{ah.type}</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
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
