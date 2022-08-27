// 1.2
import { Input, Table, Space, Popconfirm, Button } from 'antd'
import axios from 'axios'
import React from 'react'
import './App.css'

// 1. 找到对应的组件，把页面搭起来--搜索框+table
// 2. 渲染Table 发送请求(componentDidMount)，拿到数据，交给list(this.setState)
// 3. 删除功能 点哪个就用哪个id 调用删除接口 重新拉取列表
// 4. 搜索功能 拿到关键词，调用接口获取列表数据

// 1.2
const { Search } = Input


class App extends React.Component {
  state = {
    list: [],
    columns: [
      {
        title: '任务编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: '操作',
        // 3.1 学文档的写法
        render: (_, record) => (
            <Popconfirm
                title="Sure to delete?"
                // 3.2 加参数
                onConfirm={() => this.delData(_, record)}>
                <a>Delete</a>
            </Popconfirm>
            )
      },
    ]
  }

  // 3.1 开始删除
  // 3.2 加参数
  // 3.4 加异步
  delData = async (_, record) => {
    console.log('开始删除')
    console.log(_, record)
    // 3.3 调用删除接口
    axios.delete(`http://localhost:3001/data/${record.id}`)
    // 3.5 重新拉取列表
    this.loadList()
  }

  // 1.3 搜索 点击回车清空时触发
  onSearch = async (value) => {
    console.log(value)
    // 4.1 发送一个搜索接口就可以了
    // 4,2 会收到一个结果 把结果接受一下
    const res = await axios.get(`http://localhost:3001/data/?q=${value}`)
    console.log(res)
    this.setState({
      list: res.data
    })
  }

  // 2 加载列表
  loadList = async() => {
    const res = await axios.get('http://localhost:3001/data')
    console.log(res)
    // 传list就能渲染出来，是因为columns里有key
    this.setState({
      list: res.data
    })
  }
  // 2
  componentDidMount () {
    // 发送接口请求
    this.loadList()
  }

  render () {
    return (
      <div className="container">
        {/*<Button type={"primary"}>测试Button</Button>*/}
        {/*1.1 复制代码*/}
        {/*1.2 Search报错*/}
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            // 1.3 onSearch 是个事件 要定义
            onSearch={this.onSearch}
        />
        {/*2.1 一个遍历渲染，一个定义列*/}
        <Table dataSource={this.state.list} columns={this.state.columns} />

      </div>
    )
  }
}

export default App
