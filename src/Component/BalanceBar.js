import React from 'react'
import './BalanceBar.css'

const BalanceBar = () => {
  return (
    <div id="balance-box">
    <div id='balance-title'>Balance</div>
    <div id='accout-balance'>
        {/* {accountList.map((row) => { */}
            {/* return ( */}
                <div className='account-row'>
                    <span className='account-name'></span>
                    {/* <span className='account-balance' style={{color:(row[1]>0)?'rgb(3, 255, 3)':'rgb(255, 47, 0)'}}>{'₹ '+row[1]}</span> */}
                </div>
            {/* ) */}
        {/* })} */}
        <div className='account-row' id='total'>
            <span className='account-name'>Total Balance</span>
            {/* <span className='account-balance' style={{color:(total>0)?'rgb(3, 255, 3)':'rgb(255, 47, 0)'}}>{'₹ '+total}</span> */}
        </div>
    </div>
</div>
  )
}

export default BalanceBar
