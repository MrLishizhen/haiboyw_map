import { Select,Input, Button } from 'antd';
// import "./index.css"
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const App = () => (
  <>
    <Select
      defaultValue="一区"
      style={{
        width: 120,
      }}
      onChange={handleChange}
    >
      <Option value="一区">一区</Option>
      <Option value="二区">二区</Option>
      <Option value="三区">三区</Option>
    </Select>&emsp;
    <Select
      defaultValue="大厅"
      style={{
        width: 120,
      }}
      onChange={handleChange}
    >
      <Option value="大厅">大厅</Option>
      <Option value="大厅2">大厅2</Option>
      <Option value="大厅3">大厅3</Option>
    </Select>&emsp;
    <Input style={{width:'140px'}}></Input>&emsp;
    <Button className='ss' style={{backgroundColor: '#00A5D9',color:'#ffffff'}}>搜索</Button>
  </>
);

export default App;