const vision_endpoint = process.env.REACT_APP_VISION_ENDPOINT
const vision_key = process.env.REACT_APP_VISION_KEY

function analyze_image(url) {
  console.log("Analyze image function called", url);
  console.log("Vision endpoint is", vision_endpoint);
  console.log("Vision key is", vision_key);
  var body = JSON.stringify({
    "url": url
  });
  const response = fetch(vision_endpoint, 
  {
    method: 'POST',
    headers:{
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": vision_key
    }, 
    body: body
  }).then(response => {
    if(!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json()
  })
  .then(data => {
    console.log("Data is fetched", data);
    return data;
  })
  .catch(error => {
    console.log("Error", error);
    return {error: error};
  });
  return response;
}

export default analyze_image;