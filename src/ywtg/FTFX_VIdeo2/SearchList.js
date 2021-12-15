
import React, { Component } from 'react'
import { List, Avatar } from 'antd';

const data = [
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052051", deviceName: "凯旋公寓对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052052", deviceName: "凯旋公寓对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052001", deviceName: "长宁区幸福小学对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052002", deviceName: "长宁区幸福小学对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052051", deviceName: "凯旋公寓对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052052", deviceName: "凯旋公寓对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052001", deviceName: "长宁区幸福小学对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052002", deviceName: "长宁区幸福小学对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052051", deviceName: "凯旋公寓对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052052", deviceName: "凯旋公寓对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052001", deviceName: "长宁区幸福小学对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052002", deviceName: "长宁区幸福小学对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052051", deviceName: "凯旋公寓对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052052", deviceName: "凯旋公寓对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052001", deviceName: "长宁区幸福小学对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052002", deviceName: "长宁区幸福小学对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052051", deviceName: "凯旋公寓对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052052", deviceName: "凯旋公寓对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052001", deviceName: "长宁区幸福小学对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052002", deviceName: "长宁区幸福小学对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052051", deviceName: "凯旋公寓对面2H", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052052", deviceName: "凯旋公寓对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052001", deviceName: "长宁区幸福小学对面1HG", monitorType: "1"},
    {orderScore: 0, cameraFunc: "1", deviceId: "31010511001321052002", deviceName: "长宁区幸福小学对面2H", monitorType: "1"},
];
export default class SearchList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { onChangeDeviceId, searchList } = this.props
        return (
            <List
                style={{
                    color: '#fff'
                }}
                itemLayout="horizontal"
                dataSource={searchList}
                renderItem={item => (
                <List.Item 
                    style={{cursor: 'pointer'}}
                    onClick={() =>onChangeDeviceId(item.deviceId,item.deviceName)}
                >
                    <List.Item.Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={item.deviceName}
                        description={item.deviceId}
                    />
                </List.Item>
                )}
            />
        )
    }
}