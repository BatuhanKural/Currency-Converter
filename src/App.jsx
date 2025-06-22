import './App.css'
import { BsCurrencyExchange } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { useEffect, useState } from "react"
import { FaExchangeAlt } from "react-icons/fa";
import { RiExchangeFill } from "react-icons/ri";



function App() {
  const [amount, setamount] = useState(1)
  const [sourceCurrency, setSourceCurrency] = useState("USD")
  const [targetCurrency, setTargetCurrency] = useState("TRY")
  const [exchangeRate, setExchangeRate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAmountChange = (e) => {
    setamount(e.target.value)
  }

  const handleSourceCurrencyChange = (e) => {
    setSourceCurrency(e.target.value)
  }

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value)
  }

  const currencies = ['USD', 'TRY', 'AUD', 'CAD', 'GBP', 'EUR', 'CHF']

  useEffect(() => {
  if (sourceCurrency === targetCurrency) {
    const firstAvailable = currencies.find(c => c !== sourceCurrency);
    if (firstAvailable) {
      setTargetCurrency(firstAvailable);
    }
  }
}, [sourceCurrency, targetCurrency, currencies]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try{
        setIsLoading(true)
        const response = await fetch(`https://v6.exchangerate-api.com/v6/b5558b2ad588ded417ce3437/latest/${sourceCurrency}`)
        const data = await response.json()
        setExchangeRate(data.conversion_rates[targetCurrency])
      }
      catch(err){
        alert('An error occured:', err.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    fetchExchangeRate()
  }, [sourceCurrency, targetCurrency])
  
 
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-indigo-700 to-blue-400 py-12 px-4'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white rounded-xl shadow-2xl md:px-6 px-4 py-8'>
          <h1 className='flex justify-center items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold'>
            <BsCurrencyExchange className='text-blue-500'/>
            Currency Converter
            </h1>
          <div className='mt-8'>
            <label for="amount">Amount:</label>
            <div className='flex items-center border-1 rounded-xl px-2 gap-2 py-2 mt-2'>
              <FaMoneyBill className='text-gray-700 size-5 sm:size-6 md:size-7' />
              <input type="number" min={0} id='amount' value={amount} onChange={handleAmountChange} className='focus:outline-none w-full' />
            </div>
          </div>
          <div className='mt-6'>
            <label for="sourceCurrency">Source Currency:</label>
            <div className='flex items-center border-1 rounded-xl px-2 gap-2 py-2 mt-2'>
              <MdCurrencyExchange className='text-gray-700 size-5 sm:size-6 md:size-7' />
              <select className='focus:outline-blue-400 w-full' id='sourceCurrency' onChange={handleSourceCurrencyChange} value={sourceCurrency}>
                {
                  currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)
                }
              </select>
            </div>
          </div>
          <div className='mt-6'>
            <label for="targetCurrency">Target Currency:</label>
            <div className='flex items-center border-1 rounded-xl px-2 gap-2 py-2 mt-2'>
              <MdCurrencyExchange className='text-gray-700 size-5 sm:size-6 md:size-7' />
              <select className='focus:outline-blue-400 w-full' id='targetCurrency' onChange={handleTargetCurrencyChange} value={targetCurrency}>
                {
                  currencies.map(currency => {
                      if(currency === sourceCurrency){
                      return 
                    }  
                    return <option key={currency} value={currency}>{currency}</option>
                  }
)
                }
              </select>
            </div>
          </div>
          <div className='bg-gray-100 rounded-xl py-8 mt-6'>
            {isLoading ? <div className='bg-gray-200 text-center w-3/4 mx-auto py-4 animate-pulse rounded-xl'>Loading...</div> : 
            (
             <div>
              <h2 className='flex justify-center items-center gap-3 md:text-2xl sm:text-xl text-lg font-semibold'>
                <span>{amount} {sourceCurrency}</span>
                <FaExchangeAlt className='text-blue-500' />
                <span>{(amount * exchangeRate)?.toFixed(2)} {targetCurrency}</span>
              </h2>
              <div className='flex mt-2 justify-center gap-1 items-center'>
                <RiExchangeFill className='text-blue-500 size-5' />
                <p className='text-xs text-gray-600'>1 {sourceCurrency} = {exchangeRate?.toFixed(4)} {targetCurrency}</p>
              </div>
             </div>
            )
            }
          </div>
        </div>
        <p className='mt-6 text-center font-semibold'>Last Update: {new Date().toLocaleString("tr-TR")}</p>
      </div>
    </div>
  )
}

export default App
