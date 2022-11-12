import { Link } from '@mui/material';

const EmailAddressCell = ({ value }) => (
  <Link href={`mailto:${value}`}>{value}</Link>
);

const columns = [
  { Header: 'ID', accessor: 'id', width: 50 },
  { Header: 'First Name', accessor: 'firstName', width: 150 },
  { Header: 'Last Name', accessor: 'lastName', width: 150 },
  { Header: 'Phone Number', accessor: 'phoneNumber', width: 150 },
  {
    Header: 'Email Address',
    accessor: 'emailAddress',
    Cell: EmailAddressCell,
    width: 200,
  },
  { Header: 'Address', accessor: 'address', width: 200 },
  { Header: 'State', accessor: 'state', width: 50 },
  { Header: 'Zip Code', accessor: 'zipCode', width: 100 },
];

export default columns;
