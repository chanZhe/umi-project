import React, { useState } from 'react';
import GithubCorner from '@/components/Echarts/GithubCorner';
import PanelGroup from '@/components/PanelGroup';
import LineChart from '@/components/Echarts/LineChart';
import RadarChart from '@/components/Echarts/RadarChart';
import PieChart from '@/components/Echarts/PieChart';
import BarChart from '@/components/Echarts/BarChart';
import { Row, Col } from 'antd'
import styles from './index.scss'

export interface CHART_CELL {
    expectedData: Array<number>,
    actualData: Array<number>
}

interface CHART_DATA {
    newVisitis: CHART_CELL,
    messages: CHART_CELL,
    purchases: CHART_CELL,
    shoppings: CHART_CELL
}

export default (props: any) => {
    const lineChartData: CHART_DATA = {
        newVisitis: {
            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
        }
    }

    const [chartData, setChartData] = useState(lineChartData.newVisitis)

    const handleSetLineChartData = (type: keyof CHART_DATA) => {
        setChartData(lineChartData[type])
    }

    return (
        <div className={["flex-container", styles.container].join(' ')}>
            <div className={styles.github_corner}>
                <GithubCorner />
            </div>
            <PanelGroup handleSetLineChartData={handleSetLineChartData} />
            <div className={styles.chart_cell} >
                <LineChart chartData={chartData} />
            </div>
            <Row gutter={12}>
                <Col span={8}>
                    <div className={styles.chart_cell} >
                        <RadarChart />
                    </div>
                </Col>
                <Col span={8}>
                    <div className={styles.chart_cell} >
                        <PieChart />
                    </div>
                </Col>
                <Col span={8}>
                    <div className={styles.chart_cell} >
                        <BarChart />
                    </div>
                </Col>
            </Row>
        </div>
    )
}