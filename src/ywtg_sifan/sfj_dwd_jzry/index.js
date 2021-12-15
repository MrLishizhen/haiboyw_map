import React, { PureComponent } from 'react';
import { Select, Table } from 'antd';
import styles from './index.less';

const { Option } = Select;

const ITEM_COMPONENTS = {
    bangfu: {
        type: 'table',
        columns: [{
            title: '姓名',
            dataIndex: 'XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件类型',
            dataIndex: 'ZJLX',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件号码',
            dataIndex: 'ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '帮扶人员姓名',
            dataIndex: 'BF_XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '帮扶人员身份证号',
            dataIndex: 'BF_ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '发放机构',
            dataIndex: 'BF_DANWEI',
            align: 'center',
            // ellipsis: true
        }, {
            title: '发放金额',
            dataIndex: 'BF_MONCOUNT',
            align: 'center',
            // ellipsis: true
        }, {
            title: '发放日期',
            dataIndex: 'BF_DATE',
            align: 'center',
            // ellipsis: true
        }]
    },
    corpboss: {
        type: 'table',
        columns: [{
            title: '姓名',
            dataIndex: 'XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件类型',
            dataIndex: 'ZJLX',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件号码',
            dataIndex: 'ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '法人单位名称',
            dataIndex: 'CORP_NAME',
            align: 'center',
            // ellipsis: true
        }, {
            title: '注册地址',
            dataIndex: 'ADDRESS',
            align: 'center',
            // ellipsis: true
        }, {
            title: '注册资本（万元）',
            dataIndex: 'REG_CAPITAL',
            align: 'center',
            // ellipsis: true
        }, {
            title: '币种',
            dataIndex: 'CURRENCY',
            align: 'center',
            // ellipsis: true
        }, {
            title: '成立日期',
            dataIndex: 'ESTABLISH_DATE',
            align: 'center',
            // ellipsis: true
        }, {
            title: '注销日期',
            dataIndex: 'REPEAL_DATE',
            align: 'center',
            // ellipsis: true
        }, {
            title: '法定代表人证件号',
            dataIndex: 'PERSON_CERT_CODE',
            align: 'center',
            // ellipsis: true
        }, {
            title: '法定代表人',
            dataIndex: 'PERSON_NAME',
            align: 'center',
            // ellipsis: true
        }]
    },
    tax: {
        type: 'table',
        columns: [{
            title: '姓名',
            dataIndex: 'XM',
            align: 'center',
            // ellipsis: true,
            width: '10%',
        }, {
            title: '证件类型',
            dataIndex: 'ZJLX',
            align: 'center',
            // ellipsis: true
            width: '10%',
        }, {
            title: '证件号码',
            dataIndex: 'ZJHM',
            align: 'center',
            // ellipsis: true
            width: '15%',
        }, {
            title: '法人单位名称',
            dataIndex: 'CORP_NAME',
            align: 'center',
            // ellipsis: true
            width: '15%',
        }, {
            title: '注册地址',
            dataIndex: 'ADDRESS',
            align: 'center',
            // ellipsis: true
            width: '15%',
        },
        // {
        //     title: '法定代表人',
        //     dataIndex: 'PERSON_NAME',
        //     align: 'center',
        //     // ellipsis: true
        // },
        {
            title: '税收信息',
            dataIndex: 'TAX_INFO',
            align: 'center',
            // ellipsis: true,
            width: '35%'
        }]
    },
    eduexperience: {
        type: 'table',
        columns: [{
            title: '姓名',
            dataIndex: 'XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件类型',
            dataIndex: 'ZJLX',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件号码',
            dataIndex: 'ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '增加时间',
            dataIndex: 'DT_CREATE',
            align: 'center',
            // ellipsis: true
        }, {
            title: '修改时间',
            dataIndex: 'DT_UPDATE',
            align: 'center',
            // ellipsis: true
        }, {
            title: '学校名称',
            dataIndex: 'ST_NAME ST_SCHOOL_NAME',
            align: 'center',
            // ellipsis: true
        }, {
            title: '学校类别',
            dataIndex: 'ST_TYPE',
            align: 'center',
            // ellipsis: true
        }, {
            title: '学校学制',
            dataIndex: 'ST_LENGTH_TYPE',
            align: 'center',
            // ellipsis: true
        }]
    },
    jsb: {
        type: 'table',
        columns: [{
            title: '姓名',
            dataIndex: 'XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件类型',
            dataIndex: 'ZJLX',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件号码',
            dataIndex: 'ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '比中后证件号码',
            dataIndex: 'ZJHM_1',
            align: 'center',
            // ellipsis: true
        }, {
            title: '就诊类型',
            dataIndex: 'JZLX',
            align: 'center',
            // ellipsis: true
        }, {
            title: '就诊科室编码',
            dataIndex: 'JZKSBM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '就诊科室名称',
            dataIndex: 'JZKSMC',
            align: 'center',
            // ellipsis: true
        }, {
            title: '医保科室编码',
            dataIndex: 'JZKSBMYB',
            align: 'center',
            // ellipsis: true
        }, {
            title: '门诊就诊时间',
            dataIndex: 'JZKSRQ',
            align: 'center',
            // ellipsis: true
        }, {
            title: '门诊诊断说明',
            dataIndex: 'JZZDSM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '主诉',
            dataIndex: 'ZS',
            align: 'center',
            // ellipsis: true
        }, {
            title: '症状描述',
            dataIndex: 'ZZMS',
            align: 'center',
            // ellipsis: true
        }]
    },
    jiuzhu: {
        type: 'table',
        columns: [{
            title: '姓名',
            dataIndex: 'XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件类型',
            dataIndex: 'ZJLX',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件号码',
            dataIndex: 'ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '救助家庭人员姓名',
            dataIndex: 'JIUZHU_XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '救助家庭人员身份证号',
            dataIndex: 'JIUZHU_ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '救助家庭人员是否学生',
            dataIndex: 'JIUZHU_IS_STU',
            align: 'center',
            // ellipsis: true
        }, {
            title: '救助家庭人员残疾证号',
            dataIndex: 'JIUZHU_DISABLE_NO',
            align: 'center',
            // ellipsis: true
        }, {
            title: '发放机构',
            dataIndex: 'JIUZHU_DANWEI',
            align: 'center',
            // ellipsis: true
        }, {
            title: '发放金额',
            dataIndex: 'JIUZHU_MONCOUNT',
            align: 'center',
            // ellipsis: true
        }, {
            title: '发放月份',
            dataIndex: 'JIUZHU_DATE',
            align: 'center',
            // ellipsis: true
        }, {
            title: '救助内容',
            dataIndex: 'JIUZHU_DESC',
            align: 'center',
            // ellipsis: true
        }]
    },
    workexperience: {
        type: 'table',
        columns: [{
            title: '姓名',
            dataIndex: 'XM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件类型',
            dataIndex: 'ZJLX',
            align: 'center',
            // ellipsis: true
        }, {
            title: '证件号码',
            dataIndex: 'ZJHM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '工作开始日期',
            dataIndex: 'GZKSRQ',
            align: 'center',
            // ellipsis: true
        }, {
            title: '工作结束日期',
            dataIndex: 'GZJSRQ',
            align: 'center',
            // ellipsis: true
        }, {
            title: '统一信用代码',
            dataIndex: 'JTDWTYXYM',
            align: 'center',
            // ellipsis: true
        }, {
            title: '就业单位名称',
            dataIndex: 'JYDWMC',
            align: 'center',
            // ellipsis: true
        }, {
            title: '就业单位组织机构代码',
            dataIndex: 'JYDWZZJGDM',
            align: 'center',
            // ellipsis: true
        }]
    }
};

/**
 * 2124 * 1236
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: 'bangfu'
        };
        this.ref = React.createRef();
    }

    render() {
        const { dataProvider = [] } = this.props;
        const { type } = this.state;
        const data = dataProvider ? dataProvider.filter(dp => dp && dp.dataType === type) : [];
        const { columns } = ITEM_COMPONENTS[type];

        return (
            <div className={styles.basic_wrapper}>
                <div className={styles.select_wrapper}>
                    <div ref={this.ref} style={{ position: 'relative' }}>
                        <Select getPopupContainer={() => this.ref.current} dropdownClassName={styles.dropdown_wrapper} value={type} style={{ width: 1200 }} onChange={(type) => this.setState({ type })}>
                            <Option value='bangfu'>矫正对象按市民政帮扶人员及历史记录</Option>
                            <Option value='corpboss'>矫正对象按法人代表查询法人信息</Option>
                            <Option value='tax'>矫正对象税收信息</Option>
                            <Option value='eduexperience'>矫正对象就学信息</Option>
                            <Option value='jsb'>矫正对象按门诊信息查看精神疾病</Option>
                            <Option value='jiuzhu'>矫正对象按市民政家庭救助记录</Option>
                            <Option value='workexperience'>矫正对象劳动就业经历</Option>
                        </Select>
                    </div>
                </div>
                <div className={styles.content_wrapper}>
                    {ITEM_COMPONENTS[type] && ITEM_COMPONENTS[type].type === 'table' &&
                        <div className={styles.table_wrapper}>
                            <Table
                                rowKey={(record) => record.id}
                                columns={columns.map(col => ({ width: `${100 / columns.length}%`, ...col }))}
                                dataSource={Array.isArray(data) ? data.map((d, index) => ({ ...d, id: index })) : []}
                                locale={{ emptyText: '暂无数据' }}
                                pagination={{
                                    position: 'bottom',
                                    defaultPageSize: 9,
                                    pageSize: 9
                                }}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}