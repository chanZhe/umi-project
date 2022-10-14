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
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                bottom: '10',
                data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
            },
            calculable: true,
            series: [
                {
                    name: 'WEEKLY WRITE ARTICLES',
                    type: 'pie',
                    roseType: 'radius',
                    radius: [15, 95],
                    center: ['50%', '38%'],
                    data: [
                        { value: 320, name: 'Industries' },
                        { value: 240, name: 'Technology' },
                        { value: 149, name: 'Forex' },
                        { value: 100, name: 'Gold' },
                        { value: 59, name: 'Forecasts' }
                    ],
                    animationEasing: 'cubicInOut',
                    animationDuration: 2600
                }
            ]
        })
    }

    return (
        <div ref={chartRef as any} style={{ width: '100%', height: '320px' }}></div>
    )
}