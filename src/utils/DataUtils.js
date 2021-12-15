// 校验dataProvider
const getDataProvider = props => {
  const { dataProvider } = props;
  if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
    return [...dataProvider]
  } else {
    return [];
  }
}

export {
  getDataProvider
}