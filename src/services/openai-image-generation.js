

async function generate_image(prompt) {

  console.log("Generate image function called", prompt);
  console.log("OpenAI endpoint is", process.env.REACT_APP_OPENAI_API_URL);
  const body = JSON.stringify({
    "model": "dall-e-3",
    "prompt": prompt,
    "n": 1,
    "size": "1024x1024"
  })
  const response = fetch(process.env.REACT_APP_OPENAI_API_URL, 
    {
      method: 'POST',
      headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
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

export default generate_image;

