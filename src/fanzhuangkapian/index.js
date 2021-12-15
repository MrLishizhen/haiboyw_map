import React, { Component } from 'react';
// import { getDataProvider } from '../../utils/DataUtils';
import BackPit from './assets/photo.png';



//_chongming_fangzhuang
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transform: false,
            show: false,
            id:0,
            list:{
                title:'三年计划',
                value:2021,
                connet:"大大撒旦就ask大声对你说电脑"
                
            }
        }
    }
    // getOption = data =>{
    //     data.length <= 0 ? data = this.state.list : data
    //     const titleList=[],valueList=[], dataList =[];
    //     for (let i=0;i<data.length;i++){
    //         const el =data[i]
    //         titleList.push(el['title'])
    //         valueList.push(el['value'])
    //     }
    //     for(var i=0;i<titleList.length;i++){
    //         if(titleList.indexOf(valueList[i] == 1)){
    //             dataList.push([titleList[i],valueList[i]])
    //         }else{
    //           console.log(-1);
    //         }
    //     }
    //     return titleList
        
    // }
    getOption = data =>{
        data.length <= 0 ? data = this.state.list : data     
        // console.log(data[this.state.id].title)   
        return data
        
    }


    display = () => {
        this.setState({
            transform: !this.state.transform
        });
        setTimeout(()=>{
            this.setState({
                show: !this.state.show
            });
        }, 400)
    }

    render() {
        // const data = getDataProvider(this.props);
        const data = [{
            title:'三年计划',
            value:2021,
            connet:"大大撒旦就ask大声对你说电脑"

        }]
        let { show, transform } = this.state;
        const style = transform ? {
            transform: 'rotateY(180deg)'
        } : {}

        return (
                <div 
                onClick={this.display} 
                style={{ color:'#FFFFFF', width: 400, height: 400,background:`url(${BackPit}) no-repeat center`, textAlign:'center',display:'flex',lineHeight:4,position: 'absolute', top: 0, transition: 'all 0.8s', ...style }}
                >
                    {!show ?
                        <div style={{margin:'auto'}}>
                            {this.getOption(data)[this.state.id].title}
                            <br/>
                            {this.getOption(data)[this.state.id].value}
                        </div>
                         :
                        <div 
                        style={show ?
                            { transform: 'rotateY(180deg)' ,margin:'auto'} :
                            { transform: 'rotateY(0deg)' ,margin:'auto'}
                        }
                        >
                           {this.getOption(data)[this.state.id].connet}
                           <br/>
                            {this.getOption(data)[this.state.id].title}
                        </div>
                    }
                </div>
          
        )
    }
}

export default Index;