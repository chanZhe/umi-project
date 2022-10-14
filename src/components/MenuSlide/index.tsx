import React from 'react';
import { Menu } from 'antd';
import router from 'umi/router';
import { connectDva } from '@/utils/common'
import { MenuItem } from '@/models/menu'
import SubMenu from 'antd/lib/menu/SubMenu';
import styles from './index.scss'

interface MenuState {
    openKeys: Array<string>,
    isClick: Boolean
}

interface NodeData {
    item: Object,
    key: string,
    keyPath: string,
    domEvent: DocumentAndElementEventHandlers
}

@connectDva(({ Menus, dispatch }: any) => ({ Menus, dispatch }))
class SlideMenu extends React.Component<any, MenuState> {
    constructor(props: { Menu: any, dispatch: any }) {
        super(props)
        this.state = {
            openKeys: [],
            isClick: false
        }
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'Menus/getMenus'
        })
    }
    onOpenChange(keys: Array<string>) {
        if (this.state.openKeys[0] !== keys[keys.length - 1]) {
            this.setState({ openKeys: [keys[keys.length - 1]], isClick: true })
        } else {
            this.setState({ openKeys: [], isClick: true })
        }
    }
    routerTo(nodeData: NodeData) {
        router.push(nodeData.key)
    }

    componentDidUpdate() {
        const keysArr = this.props.currentKey.current.split('/')
        if (this.state.openKeys[0] !== `/${keysArr[1]}` && !this.state.isClick) {
            this.setState({ openKeys: [`/${keysArr[1]}`] })
        }
    }

    render() {
        const { Menus, currentKey } = this.props
        return (
            <div className={styles.slide}>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[currentKey.current]}
                    inlineCollapsed={Menus.collapsed}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange.bind(this)}
                    onClick={this.routerTo}
                >
                    <Menu.Item key='/dashboard'>首页</Menu.Item>
                    {
                        Menus.menus.map((menuItem: MenuItem, index: Number) => {
                            if (!menuItem.children || !menuItem.children.length) {
                                return (
                                    <Menu.Item key={menuItem.path}>
                                        {menuItem.meta.title}
                                    </Menu.Item>
                                )
                            } else {
                                return (
                                    <SubMenu key={menuItem.path} title={menuItem.name}>
                                        {menuItem.children.map((subItem: MenuItem, num: Number) => (
                                            <Menu.Item key={menuItem.path + '/' + subItem.path}>
                                                {subItem.meta.title}
                                            </Menu.Item>
                                        ))}
                                    </SubMenu>
                                )
                            }
                        })
                    }
                </Menu>
            </div>
        )
    }
}

export default SlideMenu