import React from 'react'

function Funding() {
  return (
    <div>
      <div>Top Up</div>
      <hr />
      <form>
            <div>
                <span>Balance:</span>
            </div>
            <div>
                <label>Plate Number:</label>
                <input />
            </div>     
            <div>
                <label>Class No:</label>
                <input />
            </div> 
            <div>
                <label>Last Pay Date:</label>
                <input />
            </div>  
            <div>
                <label>Payment From:</label>
                <input />
            </div> 
            <div>
                <label>Payment To:</label>
                <input />
            </div>   
            <button>Save</button>
      </form>
    </div>
  )
}

export default Funding
