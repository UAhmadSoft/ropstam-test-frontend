import { filter } from 'lodash';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Accordion,
  AccordionSummary,
  Box,
  AccordionDetails,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { useUpdateEffect } from 'hooks';

const PREFIX = 'UsersFilters';

const classes = {
  filter: `${PREFIX}-filter`,
  CategoriesList: `${PREFIX}-CategoriesList`,
  priceFilters: `${PREFIX}-priceFilters`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.filter}`]: {
    marginTop: theme.spacing(3),

    display: 'flex',
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'row',
    // },
    // [theme.breakpoints.up('md')]: {
    //   flexDirection: 'column',
    //   flexWrap: 'nowrap',
    // },
    '& .MuiPaper-root': {
      boxShadow: 'none',
      borderRight: '1px solid #ccc',
      borderRadius: 0,
      width: 200,
    },
    '& .MuiAccordion-root': {
      marginTop: 0,
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 'unset',
      height: 40,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: 0,
    },
    '& .MuiAccordionDetails-root': {
      paddingInline: 10,
      paddingTop: 0,
      flexGrow: 1,
    },
  },

  [`& .${classes.CategoriesList}`]: {
    '&.MuiList-root': {
      paddingInline: '0',
      width: '100%',
      '& .MuiListItem-root': {
        padding: 0,
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        },
      },
    },
  },

  [`& .${classes.priceFilters}`]: {
    '& .MuiTypography-root': { fontSize: 14 },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array = [], comparator, query, key = 'firstName') {
  // console.log('array', array);
  const stabilizedThis = array?.map((el, index) => [el, index]) || [];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => {
      // console.log('_user', _user);
      // console.log('query', query);
      return _user[key].toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

const TableFilter = ({ applyFilter, filterOptions, title }) => {
  const [filter, setFilter] = useState('all');

  useUpdateEffect(() => {
    // console.log('filter', filter);
    applyFilter(filter);
  }, [filter]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <StyledBox>
      {/* <Typography variant='h5'>Filter By</Typography> */}
      <div className={classes.filter}>
        <Accordion expanded>
          <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
            <Typography variant='subtitle2' className={classes.heading}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component='fieldset'>
              <RadioGroup
                aria-label='gender'
                name='controlled-radio-buttons-group'
                value={filter}
                onChange={handleChange}
              >
                {filterOptions.map((el, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={el.value}
                    control={<Radio />}
                    label={el.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </div>
    </StyledBox>
  );
};

export { getComparator, applySortFilter, TableFilter };
