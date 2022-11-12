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
import { deleteUser } from 'store/slices/users/extraReducers';

// ----------------------------------------------------------------------

const PREFIX = 'UserPage';
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
  { id: 'email', label: 'Email', alignRight: false },
];

const filterPopoverId = 'UserfilterPopOver';

function User({ filter }) {
  const { users, fetching } = useSelector((st) => st.users);
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

  const navigate = useNavigate();

  const [isDetailsOpen, toggleDetails] = useToggleInput(false);
  const [detailsUser, setDetailsUser] = useState();

  const [isDeleteOpen, toggleDeleteOpen] = useToggleInput(false);
  const [currentDeleteId, setCurrentDeleteId] = useState();
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

    dispatch(deleteUser(id));
  };

  const clearSearch = () => {
    setFilterName('');
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(currentDeleteId));
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
      users,
      getComparator(order, orderBy),
      filterName,
      'name'
    );
    // console.log('newUsers', newUsers);
    // setFilteredUsers(newUsers.filter((el) => el.role === filter));
    setFilteredUsers(newUsers);
    setPage(0);
  }, [users, fetching, order, orderBy, filterName, getComparator, filter]);

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
    <Page title='User'>
      {/* {console.log('filteredUsers', filteredUsers)} */}
      <StyledContainer>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={2}
        >
          <Typography variant='h4' gutterBottom>
            Users
          </Typography>
          <div>
            {(user.role === 'admin' || user.role === 'userManager') && (
              <Button
                component={Link}
                to='new'
                variant='contained'
                startIcon={<Icon icon={plusFill} />}
              >
                New User
              </Button>
            )}
          </div>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={0}
            filterName={filterName}
            onFilterName={handleFilterByName}
            searchSlug='Search Users'
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
                          firstName,
                          lastName,
                          email,
                          role,
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
                                <Avatar
                                  alt={name}
                                  src={
                                    row.avatar ||
                                    `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${name
                                      ?.split(' ')
                                      .join('%20')}`
                                  }
                                />
                                <Typography variant='subtitle2' noWrap>
                                  {firstName} {lastName}
                                  {/* {console.log('name', name)} */}
                                </Typography>
                              </Stack>
                            </TableCell>
                            {/* <TableCell align='left'>{sex}</TableCell> */}
                            {/* <TableCell align="left">{role}</TableCell> */}
                            <TableCell
                              align='left'
                              className={classes.hover}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelected(row);
                                toggleSendEmailOpen();
                              }}
                            >
                              {email}
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
            count={users.length}
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
            title='Delete This User'
            handleSuccess={handleDeleteUser}
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

export default User;
