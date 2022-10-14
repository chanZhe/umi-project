import React from 'react';
import { Row, Col, Statistic } from 'antd'
import { WechatFilled, MessageFilled, DollarCircleFilled, ShoppingFilled } from '@ant-design/icons';
import styles from './index.scss'

export default (props: any) => {
    return (
        <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={6}>
                <div onClick={() => props.handleSetLineChartData('newVisitis')} className={styles.card_panel}>
                    <div className={[styles.card_panel_icon_wrapper, styles.icon_people].join(' ')}>
                        <WechatFilled style={{ fontSize: '46px' }} />
                    </div>
                    <Statistic title="People" value={10400} />
                </div>
            </Col>
            <Col span={6}>
                <div onClick={() => props.handleSetLineChartData('messages')} className={styles.card_panel}>
                    <div className={[styles.card_panel_icon_wrapper, styles.icon_message].join(' ')}>
                        <MessageFilled style={{ fontSize: '46px' }} />
                    </div>
                    <Statistic title="Messages" value={8122} />
                </div>
            </Col>
            <Col span={6}>
                <div onClick={() => props.handleSetLineChartData('purchases')} className={styles.card_panel}>
                    <div className={[styles.card_panel_icon_wrapper, styles.icon_money].join(' ')}>
                        <DollarCircleFilled style={{ fontSize: '46px' }} />
                    </div>
                    <Statistic title="Purchases" value={9280} />
                </div>
            </Col>
            <Col span={6}>
                <div onClick={() => props.handleSetLineChartData('shoppings')} className={styles.card_panel}>
                    <div className={[styles.card_panel_icon_wrapper, styles.icon_shopping].join(' ')}>
                        <ShoppingFilled style={{ fontSize: '46px' }} />
                    </div>
                    <Statistic title="Shoppings" value={13600} />
                </div>
            </Col>
        </Row>
    )
}