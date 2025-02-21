import React, { useState } from 'react'; 
 
function App() { 
  const [jsonData, setJsonData] = useState(''); 
  const [response, setResponse] = useState(null); 
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [error, setError] = useState(null); 
 
  const handleInputChange = (e) => { 
    setJsonData(e.target.value); 
    setError(null); // Clear any previous errors 
  }; 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      JSON.parse(jsonData); // Check if JSON is valid 
      const res = await fetch('/http://127.0.0.1:5000', { // Replace with your backend 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
        }, 
        body: jsonData, 
      }); 
 
      if (!res.ok) { 
        const errorData = await res.json(); // Try to get error 
        throw new Error(errorData.error || `HTTP error! status: 
${res.status}`); // Display backend error or generic error 
      } 
 
      const data = await res.json(); 
      setResponse(data); 
    } catch (err) { 
      setError(err.message); // Set the error message to display 
      setResponse(null); // Clear any previous response 
    } 
  }; 
 
  const handleSelectChange = (e) => { 
    const options = Array.from(e.target.selectedOptions, (option) => 
option.value); 
    setSelectedOptions(options); 
  }; 
 
  const renderResponse = () => { 
    if (!response) { 
      return null; 
    } 
 
    const filteredResponse = {}; 
    selectedOptions.forEach((option) => { 
      filteredResponse[option] = response[option]; 
    }); 
 
    return ( 
      <div> 
        <h2>Response:</h2> 
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre> 
      </div> 
    ); 
  }; 
 
  return ( 
    <div> 
      <h1>22BCS13329</h1> 
      <form onSubmit={handleSubmit}> 
        <textarea value={jsonData} onChange={handleInputChange} 
placeholder="Enter JSON data"></textarea><br /> 
        <button type="submit">Submit</button> 
      </form> 
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* 
Display error message */} 
      {response && ( 
        <div> 
          <select multiple value={selectedOptions} 
onChange={handleSelectChange}> 
            <option value="alphabets">Alphabets</option> 
            <option value="numbers">Numbers</option> 
            <option value="highest_alphabet">Highest Alphabet</option> 
          </select> 
          {renderResponse()} 
        </div> 
      )} 
    </div> 
  ); 
} 
export default App;