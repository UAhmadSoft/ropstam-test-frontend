import React, { useEffect, useRef } from 'react';
// material
import { Card, Stack, Container, Typography, styled } from '@mui/material';
// components
import Page from '../components/Page';
//

import { useDispatch, useSelector } from 'react-redux';
import { createChart, ColorType } from 'lightweight-charts';
import backtestData from '../backtests.json';
// ----
// -----------------------------------------------------------------
const PREFIX = 'DocumentPage';
const classes = {
  hover: `${PREFIX}-hover`,
};

const data = Array.from(backtestData).slice(0, 50);

const StyledContainer = styled(Container)({
  [`& .${classes.hover}`]: {
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: '#5BE584',
    },
  },
});

function Backtests({ filter }) {
  const { backtests, fetching } = useSelector((st) => st.backtests);

  const backgroundColor = 'white';

  const lineColor = '#2962FF';

  const textColor = 'black';

  const areaTopColor = '#2962FF';

  const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

  const dispatch = useDispatch();

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const barSeries = chart.addBarSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    barSeries.setData(
      data.map((el) => ({
        // ...el,
        time: new Date(el.time).getTime(),
        open: +el.open,
        high: +el.high,
        low: +el.low,
        close: +el.close,
      }))
    );

    const lineSeries = chart.addLineSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    lineSeries.setData(
      data.map((el) => ({
        // ...el,
        time: new Date(el.time).getTime(),
        value: el.rl10,
        // dragon_upper: el.dragon_upper,
        // dragon_lower: el.dragon_lower,
        // dragon_middle: el.dragon_middle,
      }))
    );

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <>
      <Page title='Backtests '>
        {/* {console.log('filteredDoc', filteredDoc)} */}
        <StyledContainer>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            mb={2}
          >
            <Typography variant='h4' gutterBottom>
              Backtests
            </Typography>
          </Stack>

          <Card>
            <div ref={chartContainerRef}></div>
          </Card>
        </StyledContainer>
      </Page>
    </>
  );
}

export default Backtests;
