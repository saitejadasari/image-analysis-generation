import React, {useState} from 'react';
import analyze_image from './services/azure-image-analysis';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [imgData, setImageData] = useState({});

  async function click_analyze() {
    // console.log("Analyze button clicked", inputValue);
    const response = await analyze_image(inputValue);
    // console.log("Response is", response);
    if(response.error){
      console.log("Error in click_analyze", response);
    } 
    setImageData(response);
  }

  return (
  <div>
    <div style={{alignItems: "normal"}}>
      <h1 style={{font: 20}}>Computer Vision App</h1>
    </div>
    <div style={{}}>
      <div style={{}}>
        <text>Insert URL or Enter Prompt</text>
      </div>
      <div>
        <input 
          placeholder='Insert an URL or Enter the prompt to generate an image'
          style={{width: '400px'}}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          />
      </div>
      <button onClick={click_analyze}>Analyze</button>
      <button>Generate</button>

      {
        imgData.captionResult ?
        <div>
          <h3>Computer Vision Analysis</h3>
          <div style={{flexDirection: 'column'}}>
            <div>
              <img src={inputValue} alt="Input Analysis" style={{width:600, height:500}} />
            </div>
            <div>
              {
                imgData.captionResult ?
                <text>{imgData.captionResult.text} {imgData.captionResult.confidence}</text> : null
              }
            </div>
          </div>
        </div> : imgData.error ?
        <div>
          <text>Error loading the image</text>
        </div> : null
      }
      
    </div>
  </div>);

}

export default App;
