import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Skeleton,
  IconButton,
  Popover,
  Button,
  CircularProgress,
  styled,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/user';
//
import { useToggleInput } from 'hooks/index';
import UserDetails from './UserDetails';
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import ConfirmDelete from 'components/ConfirmDelete';

import { applySortFilter, getComparator } from 'components/table_reusables';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import SendEmail from 'dialogs/sendEmail';
import { RestartAlt } from '@mui/icons-material';
import editIcon from '@iconify/icons-eva/edit-fill';
import { deleteCar, deleteUser } from 'store/slices/cars/extraReducers';

// ----------------------------------------------------------------------

const PREFIX = 'CarsPage';
const classes = {
  hover: `${PREFIX}-hover`,
};

const StyledContainer = styled(Container)({
  [`& .${classes.hover}`]: {
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: '#5BE584',
    },
  },
});

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'model', label: 'Model', alignRight: false },
  { id: 'color', label: 'Color', alignRight: false },
  { id: 'registrationNumber', label: 'Registration Number', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },
  // { id: 'superior', label: 'Superior', alignRight: false },
  // { id: 'subOrdinates', label: '# Subordinates', alignRight: false },
];

const filterPopoverId = 'UserfilterPopOver';

function Cars({ filter }) {
  const { cars, fetching } = useSelector((st) => st.cars);
  const { user } = useSelector((st) => st.auth);
  const dispatch = useDispatch();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [isSendEmailOpen, toggleSendEmailOpen] = useToggleInput();
  const [selected, setSelected] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput();
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  const navigate = useNavigate();

  const [isDetailsOpen, toggleDetails] = useToggleInput(false);
  const [detailsUser, setDetailsUser] = useState();

  const [anchorEl, setAnchorEl] = useState(null);

  const [reachedTheEnd, setReachedTheEnd] = useState(false);

  const tableEl = useRef();
  const [loading, setLoading] = useState(false);
  const [distanceBottom, setDistanceBottom] = useState(0);

  // hasMore should come from the place where you do the data fetching
  // for example, it could be a prop passed from the parent component
  // or come from some store
  const [hasMore] = useState(true);

  const handleDeleteButton = (e) => {
    e.stopPropagation();
    const { id } = e.currentTarget.dataset;
    setCurrentDeleteId(id);
    toggleDeleteOpen();

    // dispatch(deleteCar(id));
  };

  const clearSearch = () => {
    setFilterName('');
  };

  const handleDeleteCar = () => {
    dispatch(deleteCar(currentDeleteId));
    toggleDeleteOpen();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = filteredUsers.length === 0;

  useEffect(() => {
    let newUsers = applySortFilter(
      cars,
      getComparator(order, orderBy),
      filterName,
      'name'
    );
    // console.log('newUsers', newUsers);
    // setFilteredUsers(newUsers.filter((el) => el.role === filter));
    setFilteredUsers(newUsers);
    setPage(0);
  }, [cars, fetching, order, orderBy, filterName, getComparator, filter]);

  const isUserNotFound = filteredUsers.length === 0;

  const handleClick = (event) => {
    // console.log(`event`, event);
    setAnchorEl(event.currentTarget);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Page title='Cars'>
      {/* {console.log('filteredUsers', filteredUsers)} */}
      <StyledContainer>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={2}
        >
          <Typography variant='h4' gutterBottom>
            Cars
          </Typography>
          <div>
            <Button
              component={Link}
              to='new'
              variant='contained'
              startIcon={<Icon icon={plusFill} />}
            >
              New Car
            </Button>
          </div>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={0}
            filterName={filterName}
            onFilterName={handleFilterByName}
            searchSlug='Search Cars'
            filterPopoverId={filterPopoverId}
            handleClick={handleClick}
            handleClose={handleClose}
            noFilter
            showCSV
            clearSearch={clearSearch}
            data={filteredUsers}
          />

          {/* <Scrollbar> */}
          <TableContainer sx={{ minWidth: 800, maxHeight: 600 }} ref={tableEl}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={filteredUsers.length}
                numSelected={0}
                onRequestSort={handleRequestSort}
              />
              <TableBody style={{ position: 'relative' }}>
                {fetching
                  ? Array(5)
                      .fill()
                      .map((_, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Skeleton variant='circular' />
                          </TableCell>
                          {Array(4)
                            .fill()
                            .map((_, idx) => (
                              <TableCell key={idx * 2}>
                                <Skeleton />
                              </TableCell>
                            ))}
                        </TableRow>
                      ))
                  : filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        // console.log('row', row);
                        const {
                          _id,
                          name,
                          model,
                          color,
                          registrationNumber,
                          category,
                          // phone,
                          // rank,
                          // startDate,
                          // superior,
                          // subOrdinates,
                        } = row;

                        return (
                          <TableRow key={_id} tabIndex={-1} role='checkbox'>
                            <TableCell padding='checkbox'>
                              {/* <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, fullName)}
                            /> */}
                            </TableCell>
                            <TableCell
                              component='th'
                              scope='row'
                              padding='none'
                            >
                              <Stack
                                direction='row'
                                alignItems='center'
                                spacing={2}
                              >
                                <Typography variant='subtitle2' noWrap>
                                  {name}
                                  {/* {console.log('name', name)} */}
                                </Typography>
                              </Stack>
                            </TableCell>
                            {/* <TableCell align='left'>{sex}</TableCell> */}
                            {/* <TableCell align="left">{role}</TableCell> */}
                            <TableCell align='left'>{model}</TableCell>

                            <TableCell align='left'>
                              <div
                                style={{
                                  backgroundColor: color,

                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  display: 'inline-block',
                                  marginRight: 10,
                                }}
                              />
                            </TableCell>
                            <TableCell align='center'>
                              {registrationNumber}
                            </TableCell>
                            <TableCell align='left'>
                              {category?.name || 'No Category'}
                            </TableCell>
                            <TableCell align='left'>
                              <IconButton
                                color='secondary'
                                onClick={() => {
                                  navigate(`/dashboard/cars/${row._id}`);
                                }}
                                data-id={row._id}
                              >
                                <Icon icon={editIcon} width={24} height={24} />
                              </IconButton>
                              <IconButton
                                color='error'
                                onClick={handleDeleteButton}
                                data-id={row._id}
                              >
                                <Icon
                                  icon={trash2Outline}
                                  width={24}
                                  height={24}
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6}></TableCell>
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align='center' colSpan={12} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={cars.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* </Scrollbar> */}

          <UserDetails
            open={isDetailsOpen}
            toggleDialog={toggleDetails}
            user={detailsUser}
          />
          <ConfirmDelete
            open={isDeleteOpen}
            toggleDialog={toggleDeleteOpen}
            title='Delete This Car ?'
            handleSuccess={handleDeleteCar}
          />
          <SendEmail
            open={isSendEmailOpen}
            toggleDialog={toggleSendEmailOpen}
            email={selected?.email}
          />
        </Card>
      </StyledContainer>
    </Page>
  );
}

export default Cars;
