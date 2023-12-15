import React, {useState} from 'react';
import analyze_image from './services/azure-image-analysis';
import generate_image from './services/openai-image-generation';
import './styles.css';

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
    <div className="computer-vision-app">
      <div className="header">
        <h1>Computer Vision App</h1>
      </div>
      <div className="content">
        <div className="input-section">
          <label htmlFor="imageInput">Insert URL or Enter Prompt</label>
          <input
            id="imageInput"
            type="text"
            placeholder="Insert URL or Enter the prompt to generate an image"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="button-pos">
            <button onClick={click_analyze} disabled={isLoading}>Analyze</button>
            <button onClick={click_generate} disabled={isLoading}>Generate</button>
          </div>
          {isLoading && <span>Loading...</span>}
        </div>

        {/* Section for Image Analysis */}
        {inputValue && imgData.captionResult && (
          <div className="analysis-section">
            <h3>Computer Vision Analysis</h3>
            <div className="image-container">
              <img className="image-style" src={inputValue} alt="Input Analysis" />
            </div>
            <div className="result">
              {imgData.captionResult.text && (
                <p>{imgData.captionResult.text} {imgData.captionResult.confidence}</p>
              )}
            </div>
          </div>
        )}

        {/* Section for Image Generation */}
        {imgUrl && (
          <div className="generation-section">
            <h3>Image Generation</h3>
            <div className="image-container">
              <img src={imgUrl} alt="Generated data" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
