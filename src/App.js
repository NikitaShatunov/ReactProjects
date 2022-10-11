import React from 'react'
import { Block } from './Block'
import './index.scss'

function App() {

  const [mainCurrency, setMainCurrency] = React.useState('UAH')
  const [secondCurrency, setSecondCurrency] = React.useState('USD')
  const [mainPrice, setMainPrice] = React.useState(0)
  const [secondPrice, setSecondPrice] = React.useState(1)

  //  const [rates, setRates] = React.useState({})
  const ratesRef = React.useRef({})
  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((result)=>result.json())
    .then((json)=>{
      ratesRef.current = json.rates
      onChangeSecondPrice(1)
    }).catch((err)=> {
      console.warn(err)
      alert('Error')
    })
  }, [])
  const onChangeMainPrice = (value) => {
    const price = value / ratesRef.current[mainCurrency]
    const result = price * ratesRef.current[secondCurrency]
    setMainPrice(value)
    setSecondPrice(result.toFixed(3))
  }
  const onChangeSecondPrice = (value) => {
    const result = (ratesRef.current[mainCurrency] / ratesRef.current[secondCurrency]) * value
    setMainPrice(result.toFixed(3))
    setSecondPrice(value)
  }
  React.useEffect(() => {
    onChangeMainPrice(mainPrice)
  }, [mainCurrency])
  React.useEffect(() => {
    onChangeSecondPrice(secondPrice)
  }, [secondCurrency])
  return (
    <div className="App">
      <Block value={mainPrice} 
      currency={mainCurrency} 
      onChangeCurrency={setMainCurrency} 
      onChangeValue={onChangeMainPrice}/>
      
      <Block value={secondPrice} 
      currency={secondCurrency} 
      onChangeCurrency={setSecondCurrency} 
      onChangeValue={onChangeSecondPrice}/>
    </div>
  )
}

export default App