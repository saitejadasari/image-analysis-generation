import React, {useState} from 'react';
import analyze_image from './services/azure-image-analysis';
import generate_image from './services/openai-image-generation';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [imgData, setImageData] = useState({});
  const [imgUrl, setImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function click_analyze() {
    setIsLoading(true);
    setImgUrl('');
    // console.log("Analyze button clicked", inputValue);
    const response = await analyze_image(inputValue);
    // console.log("Response is", response);
    if(response.error){
      console.log("Error in click_analyze", response);
    } 
    setImageData(response);
    setIsLoading(false);
  }

  async function click_generate() {
    setIsLoading(true);
    setImageData({});
    console.log("Generate button clicked", imgUrl);
    const response = await generate_image(inputValue);
    console.log("Response is", response);
    if(response.error){
      console.log("Error in click_generate", response);
    }
    if(response.data && response.data[0] && response.data[0].url){
      setImgUrl(response.data[0].url);
    }
    setIsLoading(false);
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
      <button onClick={click_analyze} disabled={isLoading}>Analyze</button>
      <button onClick={click_generate} disabled={isLoading}>Generate</button>

      {isLoading ? <text>Loading...</text> : null}

      {/* Section for Image Analysis */}
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

      {/* Section for Image Generation */}
      {
        imgUrl ?
        <div>
          <h3>Image Generation</h3>
          <div style={{flexDirection: 'column'}}>
            <div>
              <img src={imgUrl} alt="Generated data" style={{width:600, height:500}} />
            </div>
          </div>
        </div> : null
      }
      
    </div>
  </div>);

}

export default App;
