import React, { Component } from 'react';
import { ReactDOM } from 'react';
import styles from './index.less'
import { Select } from 'antd';
const { Option } = Select;
import yearBg from './img/yearBg.png'
import monthBg1 from './img/monthBg1.png'
import monthBg2 from './img/monthBg2.png'


// const dateFormat = 'YYYY-MM';
//year_month_double_li



export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handlers: '',
            type: '',
            yearTime:'',
            date:'',
            year: [{ "year": "2017", "value": "2017" }, { "year": "2018", "value": "2018" }, { "year": "2019", "value": "2019" }, { "year": "2020", "value": "2020" }, { "year": "2021", "value": "2021" }, { "year": "2022", "value": "2022" }, { "year": "2023", "value": "2023" }, { "year": "2024", "value": "2024" }],
            month: [{ "month": "一月", "value": "01" }, { "month": "二月", "value": "02" }, { "month": "三月", "value": "03" }, { "month": "四月", "value": "04" }, { "month": "五月", "value": "05" }, { "month": "六月", "value": "06" }, { "month": "七月", "value": "07" }, { "month": "八月", "value": "08" }, { "month": "九月", "value": "09" }, { "month": "十月", "value": "10" }, { "month": "十一月", "value": "11" }, { "month": "十二月", "value": "12" }],
            text: undefined,
            defaultValue: "",
            monthshow: "",
            yearshow: "none",
            hot:'year',

        }
    }

    componentDidMount() {
        try {
            const { buffEvent = [{ type: 'click' }] } = this.props;
            let eventValue = {};
            for (let i = 0; i < buffEvent.length; i++) {
                const eventObj = buffEvent[i];
                const { type, method, bindedComponents } = eventObj;
                if (type === 'click') {
                    eventValue = {
                        onClick: (data) => {
                            method && method({ ...data }, bindedComponents)
                        }
                    }
                }
            }
            this.setState({
                handlers: Object.assign({}, eventValue),

            })
            const { handlers,date } = this.state
            handlers && handlers.onClick && handlers.onClick({ date })

        } catch (error) {
            console.log(e)
        }
    }






    onChangeyear = (value) => {
        setTimeout(() => {
            this.setState({ text: undefined, monthshow: "", yearshow: "none", type: "年度情况",date: value,yearTime:value,hot:'year' })
            const { handlers, type,date } = this.state
            handlers && handlers.onClick && handlers.onClick({ value, type,date })

        }, 1);


    }

    onChangemonth = (value) => {
        setTimeout(() => {
            this.setState({ text: value, monthshow: "none", yearshow: "", type: "月度情况",date:this.state.yearTime + "-" + value,hot:'month' })
            const { handlers, type, date } = this.state
            handlers && handlers.onClick && handlers.onClick({ value, type, date })
            // console.log(value, type, 2,date)
        }, 1);
    }


    // onFocus =(value) => {
    //     this.setState({value: undefined,})
    // }





    render() {
       try {
        const { month, year, defaultValue, text, monthshow, yearshow, date,hot} = this.state
        const { dataProvider } = this.props;
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [];
        if(date == ""){
            data && data.length>0 && data[0].type =='年度情况' ? this.state.date = this.state.yearTime = data[0].A : this.state.date ="2021";
        }
        return (
            <div >
                <div  className={styles.yearmonths}>
                    <span style={{ marginLeft: 1112 }}></span>
                    <Select id='yeararea' placeholder={'请选择年份'} className={hot==='year' ? 'hot':''} getPopupContainer={() => document.getElementById('yeararea')} defaultValue={this.state.date} onSelect={this.onChangeyear}>
                        { year && year.length>0 ? year.map((item) => {
                            return <Option value={item.value} key={item.value}>{item.year}</Option>
                        }) : ""}
                    </Select>
                    <span style={{ margin: 20 }}></span>
                    <Select id='montharea' placeholder={'请选择月份'} className={hot==='month' ? 'hot':''} getPopupContainer={() => document.getElementById('montharea')} defaultValue={defaultValue} onSelect={this.onChangemonth} value={text} >
                        {month && month.length >0 ? month.map((item) => {
                            return <Option value={item.value} key={item.value}>{item.month}</Option>
                        }) : ""}
                    </Select>
                </div>
                {data && data.length>0 ? data.map((item,index)=>{
                    return <div key={index} className={styles.DigitalSigns} style={{ display: monthshow, width: 1626, height: 1100, background: `url(${yearBg}) no-repeat center/100% 100%` }}>
                    <div className={styles.smallBox}>
                        <h4>受理</h4>
                        <h5 >{item.B}</h5>
                    </div>
                    <div className={styles.smallBox1}>
                        <h4>办理结果</h4>
                        <h5>{item.E}</h5>
                    </div>
                    <div className={styles.smallBox2}>
                        <h4>先行联系</h4>
                        <h5>{item.C}</h5>
                    </div>
                    <div className={styles.smallBox3}>
                        <h4>满意度</h4>
                        <h5>{item.F}</h5>
                    </div>
                    <div className={styles.smallBox4}>
                        <h4>按时办结</h4>
                        <h5>{item.D}</h5>
                    </div>
                    <div className={styles.smallBox5}>
                        <h4>加分</h4>
                        <h5>{item.G}</h5>

                    </div>
                    <div className={styles.smallBox6}>
                        <h4>减分</h4>
                        <h5>{item.H}</h5>
                    </div>
                    <div className={styles.centerBox}>
                        <h5>{item.I||82.3}</h5>
                        <h4>最终得分</h4>
                    </div>
                </div>
                }) : ""}

            {data && data.length>0 ? data.map((item,index)=>{
                return <div key={index} className={styles.monthDigitalSigns} style={{ display: yearshow, width: 1628, height: 982 }}>
                <div className={styles.smallBox} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>工单办理量</h4>
                    <h5>{item.C}</h5>
                </div>
                <div className={styles.smallBox1} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>按时办结率</h4>
                    <h5>{item.D}</h5>
                </div>
                <div className={styles.smallBox2} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>回访量</h4>
                    <h5>{item.F}</h5>
                </div>
                <div className={styles.smallBox3} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>先行联系率</h4>
                    <h5>{item.H}</h5>

                </div>
                <div className={styles.smallBox4} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>解决率</h4>
                    <h5>{item.B}</h5>
                </div>
                <div className={styles.smallBox5} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>满意率</h4>
                    <h5>{item.E}</h5>
                </div>
                <div className={styles.smallBox6} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>不满意复核量</h4>
                    <h5>{item.G}</h5>
                </div>
                <div className={styles.smallBox7} style={{ width: 764, height: 202, background: `url(${monthBg2}) no-repeat center/100% 100%` }}>
                    <h4>不满意件复核按时办结率</h4>
                    <h5>{item.I}</h5>
                </div>
            </div>
            }) : ""}

            </div>
        )
        }
         catch(error){
        console.log(e)
       }

}
}
