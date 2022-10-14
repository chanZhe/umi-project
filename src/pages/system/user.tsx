import React, { useEffect, useState } from 'react';
import { connectDva, parseTime } from '@/utils/common';
import { Row, Col, Table, Switch, Space, Popconfirm } from 'antd';
import SyncTree from '@/components/SyncTree'
import { Dispatch } from 'react-redux/node_modules/@types/react';

const Users = (props: any) => {
    const { User, dispatch } = props

    const [tableLoading, setTableLoading] = useState(false)
    const [loadedKeys, setLoadedKeys] = useState([])

    useEffect(() => {
        dispatch({
            type: 'User/getTree',
            payload: {}
        })
        dispatch({
            type: 'User/getManager',
            payload: { setTableLoading }
        })
    }, [])

    const onLoadData = ({ key, children }: any) => {
        return new Promise(resolve => {
            dispatch({
                type: 'User/getTree',
                payload: { key, children, resolve }
            })
        })
    }

    const searchMethod = (value: string, setLoading: Dispatch<Boolean>) => {
        setLoading(true)
        const payload = value.trim() !== '' ? {
            name: value,
            setLoading
        } : {
            setLoading,
            setLoadedKeys
        }
        dispatch({
            type: 'User/searchTree',
            payload
        })
    }

    const selectHandler = (selectedKeys: Array<React.Key>) => {
        dispatch({
            type: 'User/getManager',
            payload: {
                deptId: selectedKeys[0],
                setTableLoading
            }
        })
    }

    const onLoad = (loadKeys: Array<string>) => {
        setLoadedKeys(loadKeys as any)
    }

    const confirmChangeStatus = (enabled: Boolean, record: any) => {
        enabled = !enabled
        const state = { ...record, ...{ enabled } }
        dispatch({
            type: 'User/setDataSource',
            payload: {
                state,
                setTableLoading
            }
        })
    }

    const columns = [
        {
            title: '账号名称',
            dataIndex: 'username'
        }, {
            title: '角色名称',
            dataIndex: 'roles',
            render: (roles: Array<any>) => `${roles.length ? roles[0].name : ''} `
        }, {
            title: '姓名',
            dataIndex: 'nickName',
        }, {
            title: '手机号',
            dataIndex: 'phone'
        }, {
            title: '部门',
            dataIndex: 'dept',
            render: (dept: any) => `${dept.name}`
        }, {
            title: '状态',
            dataIndex: 'enabled',
            render: (enabled: Boolean, record: any) => (
                <Popconfirm
                    title={`此操作将${enabled ? '禁用' : '启用'}${record.username},是否继续`}
                    okText='确认'
                    cancelText='取消'
                    onConfirm={(e: DocumentEventMap) => confirmChangeStatus(enabled, record)}
                >
                    <Switch checked={enabled} />
                </Popconfirm>
            )
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            render: (createTime: number) => `${parseTime(createTime)}`
        }, {
            title: '操作',
            key: 'action',
            width: '120',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <a>编辑</a>
                    <a>重置密码</a>
                </Space>
            )
        }
    ]

    return (
        <div className={'flex-container'}>
            <Row gutter={24}>
                <Col span={6}>
                    <SyncTree onLoad={onLoad} loadedKeys={loadedKeys} selectHandler={selectHandler} searchMethod={searchMethod} treeData={User.treeData} showSearch={true} loadData={onLoadData} />
                </Col>
                <Col span={18}>
                    <Table loading={tableLoading} rowKey={(record: any) => record.id} columns={columns} dataSource={User.content} />
                </Col>
            </Row>
        </div>
    );
}

export default connectDva((state: any) => ({ ...state }))(Users)