import React, { useLayoutEffect } from 'react';
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme

export default () => {
    let chart = null
    const chartRef = React.createRef()

    useLayoutEffect(() => {
        initChart()
    }, [])

    const initChart = () => {
        chart = echarts.init(chartRef.current as any, 'macarons')
        chart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top: 10,
                left: '2%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                }
            }],
            series: [{
                name: 'pageA',
                type: 'bar',
                stack: 'vistors',
                barWidth: '60%',
                data: [79, 52, 200, 334, 390, 330, 220],
                animationDuration: 3000,
            }, {
                name: 'pageB',
                type: 'bar',
                stack: 'vistors',
                barWidth: '60%',
                data: [80, 52, 200, 334, 390, 330, 220],
                animationDuration: 3000,
            }, {
                name: 'pageC',
                type: 'bar',
                stack: 'vistors',
                barWidth: '60%',
                data: [30, 52, 200, 334, 390, 330, 220],
                animationDuration: 3000,
            }]
        })
    }

    return (
        <div ref={chartRef as any} style={{ width: '100%', height: '320px' }}></div>
    )
}