import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState(null)
  const [dateTime, setDateTime] = useState('')
  const [description, setDescription] = useState('')

  const [allTransactions, setAllTransactions] = useState([])


  useEffect(() => {
    getAllTransactions().then((transactions) => {
      setAllTransactions(transactions)
    })
      

  }, [])


  async function getAllTransactions(){
    const getUrl = import.meta.env.VITE_API_URL + '/all/transactions' 

    const response = await fetch(getUrl)
    return await response.json()
  }


  function addNewTransaction(e) {
    e.preventDefault();
    const postUrl = import.meta.env.VITE_API_URL + '/add/transaction';

    if(isNaN(amount)){
      alert("Enter Amount a numberic value only")
      setAmount(null)
      return 
    }

    if(description==='' || dateTime===''){
      alert("Enter all details")
      return
    }

    fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        { 
          amount,
          description, 
          dateTime 
        }
      )
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } 
        
        return getAllTransactions()
      })
      .then(transactions => setAllTransactions(transactions))
      .then( () => {
        setAmount(null)
        setDescription('')
        setDateTime('')
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  

  let balance = 0;
  for(const transaction of allTransactions){
    balance += transaction.amount
  }

  const deleteTransaction = (id) =>{
    const delUrl = import.meta.env.VITE_API_URL + `/delete/transaction/${id}`

    fetch(delUrl, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } 
      
      return getAllTransactions()
    })
    .then((transactions) => {
      setAllTransactions(transactions)
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  return (
    <main>
      <h1>₹ {balance}<span>.00</span></h1>

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text"
            value={amount === null ? '' : amount}
            onChange={ev => setAmount(ev.target.value)}
            placeholder={"Enter amount"}
          />

          <input type="datetime-local"
            value={dateTime}
            onChange={ev => setDateTime(ev.target.value)}
          />
        </div>

        <div className="description">
          <input type="text" 
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            placeholder={"description"}
          />
        </div>

        <button type="submit">Add new transaction</button>
      </form>


      
      <div className="transactions">
        {
          allTransactions.length > 0  &&  allTransactions.map(transaction => (
            <div className="transaction" key={transaction._id}>
              <div className="left">
                <div className="description transaction-desc">{transaction.description}</div>
              </div>
              
              <div className="right">
                <div>
                  <div className={"price " + (transaction.amount < 0  ?  "red"  :  "green")}>
                    ₹ {transaction.amount > 0  ?  transaction.amount  :  transaction.amount.toString().split('-')[1]}
                  </div>
                  <div className="datetime">{transaction.dateTime}</div>
                </div>
                <button onClick={() => deleteTransaction(transaction._id)} className='del-btn'>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default App
