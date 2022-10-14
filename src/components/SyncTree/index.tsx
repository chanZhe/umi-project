import React, { useState } from 'react';
import { Input, Tree } from 'antd';

const { Search } = Input

export default (props: any) => {
    const { treeData, loadData, showSearch, searchMethod, selectHandler, loadedKeys, onLoad } = props
    const [loading, setLoading] = useState(false)

    return (
        <div>
            {
                showSearch ?
                    <Search placeholder="输入关键字搜索" onSearch={(value: string) => searchMethod(value, setLoading)} loading={loading} /> : null
            }
            <Tree onLoad={onLoad} loadedKeys={loadedKeys} onSelect={selectHandler} loadData={loadData} treeData={treeData} />
        </div>
    )
}