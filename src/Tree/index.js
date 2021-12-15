import React from 'react';
import { TreeSelect, DatePicker, Select } from 'antd';
import styles from './index.less';
import defaultTree from './treeData';

const { TreeNode } = TreeSelect;
const { Option } = Select;
const levelField = ['A', 'B', 'C', 'D'];

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeList: this.getRootLevel(defaultTree, 'A', 'D')
        };
        this.state.organization = this.state.treeList[0].A;
    }

    getRootLevel = (list, idField, parentIdField) => {
        return list.filter(item => {
            if (item[idField] === item[parentIdField]) {
                return { ...item };
            }
        });
    }

    organizationChange = (value) => {
        this.setState({ organization: value });
    }

    dateChange = (date, dateString) => {
        console.info(date, dateString);
    }

    onLoadData = (treeNode) => {
        return new Promise(resolve => {
            const { level, value } = treeNode.props;
            const children = defaultTree.filter(item => item['A'] === item[levelField[level - 1 >= 0 ? level - 1 : 0]] && item[levelField[level]] === value && item['A'] !== value);

            const loop = (list, id, appends) => {
                let flag = false;

                return list.map(item => {
                    if (item['A'] === id) {
                        flag = true;
                        return { ...item, children: appends }
                    } else {
                        if (!flag) {
                            if (item.children) {
                                const { children, ...rest } = item;
                                return { ...rest, children: loop(children, id, appends) };
                            }
                        }
                        return { ...item };
                    }
                });
            }

            this.setState({ treeList: loop(this.state.treeList, value, children) });
            resolve();
        });
    }

    renderTree = (list, level) => {
        return list.map(item => {
            const { A: id, E: name, children } = item;
            console.info(name, children);
            return (
                <TreeNode value={id} title={name ? name.trim() : name} key={id} isLeaf={level === 0 || (children && children.length === 0)} level={level}>
                    {children && children.length > 0 &&
                        this.renderTree(children, level - 1 >= 0 ? level - 1 : 0)
                    }
                </TreeNode>
            );
        });
    }

    render() {
        return (
            <div className={styles.search_wrapper}>
                <div>
                    <span className={styles.label}>机构：</span>
                    <TreeSelect
                        dropdownStyle={{ maxHeight: 400, minWidth: 400, overflow: 'auto' }}
                        treeNodeFilterProp='title'
                        placeholder='请选择机构'
                        showSearch
                        style={{ width: 160 }}
                        value={this.state.organization}
                        loadData={this.onLoadData}
                        onChange={this.organizationChange}
                    >
                        {this.renderTree(this.state.treeList, 3)}
                    </TreeSelect>
                </div>
                <div>
                    <span className={styles.label}>日期：</span>
                    <DatePicker
                        placeholder='请选择时间'
                        style={{ width: 160 }}
                        onChange={this.dateChange}
                    />
                </div>
                <div>
                    <span className={styles.label}>币种：</span>
                </div>
            </div>
        );
    }
}