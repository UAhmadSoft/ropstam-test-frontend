import axios from 'axios';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useBlockLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import columns from './ContactsTableColumns';

const ContactsTable = () => {
  const fetchContactsByPage = async ({ pageParam = 1 }) => {
    const { data } = await axios.get('/api/contacts', {
      params: { page: pageParam },
    });
    return data;
  };

  const {
    // This will only be true on the first load and/or when the cache is empty.
    isLoading,
    // This will be true whenever a request is sent from fetchNextPage.
    isFetchingNextPage,
    isError,
    error,
    data,
    fetchNextPage,
  } = useInfiniteQuery('contacts', fetchContactsByPage, {
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  // React Table will call forEach on this, so it must be an array.
  // Also note that React Query's pages property is a 2D array (each page is its own array), so it must be flattened.
  const memoizedData = useMemo(
    () => (isLoading ? [] : data.pages.flat()),
    [isLoading, data]
  );
  const memoizedColumns = useMemo(() => columns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { data: memoizedData, columns: memoizedColumns },
      // This is crucial - we MUST use block layout since we converted all our table components to divs and spans.
      useBlockLayout
    );

  const isItemLoaded = (index) => index < rows.length;

  // This function needs to return a Promise<void> as it is awaited by InfiniteLoader internally.
  const loadMoreItems = async () => {
    if (!isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  // All of the React Window libraries use the "Function-as-Child" pattern.
  const fixedSizeListChild = ({ index, style }) => {
    // Render a placeholder in each cell when the user scrolls to the bottom.
    // For this to work, you have to set itemCount to greater than rows.length in FixedSizeList.
    if (!isItemLoaded(index)) {
      return (
        // Note that we ARE converting all table elements to divs/spans, but it's done globally in the theme.
        <TableRow sx={{ display: 'flex' }} style={style}>
          {columns.map(({ width }, i) => (
            <TableCell
              key={`skeleton-${i}`}
              sx={{ display: 'inline-block', boxSizing: 'border-box', width }}
            >
              <Skeleton variant='rectangular' animation='wave' />
            </TableCell>
          ))}
        </TableRow>
      );
    }

    const row = rows[index];
    prepareRow(row);

    return (
      <TableRow {...row.getRowProps({ style })}>
        {row.cells.map((cell) => (
          <TableCell
            // Emails can be long strings that don't wrap, so truncate them with CSS.
            sx={
              cell.column.id === 'emailAddress'
                ? { overflowX: 'hidden', textOverflow: 'ellipsis' }
                : undefined
            }
            {...cell.getCellProps()}
          >
            {cell.render('Cell')}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const autoSizerChild = ({ height, width }) => {
    const infiniteLoaderChild = ({ onItemsRendered, ref }) => (
      <FixedSizeList
        height={height}
        width={width}
        itemSize={56}
        itemCount={rows.length + 20}
        onItemsRendered={onItemsRendered}
        ref={ref}
      >
        {fixedSizeListChild}
      </FixedSizeList>
    );

    return (
      <InfiniteLoader
        // Item count here is different than the prop passed to FixedSizeList.
        // This is when to stop loading more rows.
        // In the real world, this would would be a "count" or "total" property in your API response. E.g.,
        //   { items: [], total: 0 }
        itemCount={Infinity}
        // Threshold of 20 means start loading the next rows when the user is within 20 rows of the bottom.
        // Default is 15.
        threshold={20}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
      >
        {infiniteLoaderChild}
      </InfiniteLoader>
    );
  };

  const HeaderGroup = ({ headerGroup }) => (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((header) => (
        <TableCell {...header.getHeaderProps()}>
          {header.render('Header')}
        </TableCell>
      ))}
    </TableRow>
  );

  // Or use yet another Brian Vaughn package, react-error-boundary.
  if (isError) return <span>{error.message}</span>;

  return (
    // Somewhere you have to set a fixed height, otherwise AutoSizer will set height to zero.
    // In the real world, this means accounting for navbars, footers, margin, etc., using calc().
    // Also, the Table component must be told to fill all available space with height: 100%.
    <TableContainer sx={{ height: '100vh' }}>
      <Table sx={{ height: '100%' }} {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <HeaderGroup key={`header-group-${i}`} headerGroup={headerGroup} />
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          <AutoSizer>{autoSizerChild}</AutoSizer>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
