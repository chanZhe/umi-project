import React, {useEffect} from 'react';
import { CHART_CELL } from '@/pages/dashboard';
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme

export default (props: { chartData: CHART_CELL }) => {
    let chart:any = null

    const chartRef = React.createRef()

    useEffect(()=> {
        initChart()
    },[props.chartData])

    const initChart = () => {
        chart = echarts.init(chartRef.current as any, 'macarons')
        setOption(props.chartData)
    }

    const setOption = ({expectedData, actualData}:CHART_CELL) => {
        chart.setOption({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              boundaryGap: false,
              axisTick: {
                show: false
              }
            },
            grid: {
              left: 10,
              right: 10,
              bottom: 20,
              top: 30,
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              padding: [5, 10]
            },
            yAxis: {
              axisTick: {
                show: false
              }
            },
            legend: {
              data: ['expected', 'actual']
            },
            series: [{
              name: 'expected', itemStyle: {
                normal: {
                  color: '#FF005A',
                  lineStyle: {
                    color: '#FF005A',
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              data: expectedData,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: 'actual',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: actualData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
          })
    }

    return (
        <div ref={chartRef as any} style={{width: '100%', height: '260px'}}></div>
    )
}