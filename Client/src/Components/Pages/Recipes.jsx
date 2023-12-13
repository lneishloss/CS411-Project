import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Recipes.css';


export const Recipes = () => {
  var chatInput = "";
  const [recipe, setRecipe] = useState();
  const [chatGPTResponse, setChatGPTResponse] = useState('');

  // Link to Spoonacular Search API Documentation: https://spoonacular.com/food-api/docs#Get-Random-Recipes
  async function getRandomRecipe() {
    try {
      //IMPORTANT! Update the below variable with your own api key!!
      const apiKey = '';

      //making spoonacular api call to get a random recipe
      let resp = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
      console.log(21, resp.data);

      //store the random recipe into the recipe variable
      setRecipe(resp.data.recipes[0]);


      // Get the instructions from the recipe
      const instructions = recipe?.analyzedInstructions?.flatMap(instruction => instruction.steps.map(step => step.step)).join(' ');
      console.log('Instructions:', instructions);

      chatInput = recipe?.instructions;
      var customPrompt = "Using the information below, please provide a very short discription of how long the recipe will take to make, how costly it will be (give an actual number and an estimation if needed), and what equipment will be needed. Answer these questions on the following text:";

      // Make ChatGPT API call
      const chatGPTApiKey = '';
      const chatGPTResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: customPrompt + instructions },
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatGPTApiKey}`,
        },

      });

      setChatGPTResponse(chatGPTResponse.data.choices[0].message.content);


    } catch (e) {
      console.log(e);
    }

  }





  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <div className="row">

      <button onClick={getRandomRecipe}>
        Generate Random Recipie
      </button>


      <div>
        Name:
        <a target="_blank" href={recipe?.sourceUrl}>
          {recipe?.title}
        </a>2
      </div>
      <img src={recipe?.image} />

      <div className="ingredients">
        <div>
          Ingredients needed:
        </div>
        {recipe?.extendedIngredients.map((ingredient, index) =>
          <span key={index}>

            {index != recipe?.extendedIngredients.length - 1 ? ingredient.name + ", " : ingredient.name}
          </span>
        )}
        {recipe?.analyzedInstructions.map((instruction) =>
          <ol>
            {instruction.steps?.map((step) =>
              <li>
                {step.step}
              </li>
            )}
          </ol>
        )
        }
      </div >
      <div>
        <div>
          <h2>Quick Summary of Cost, Time, and Equipment Needed</h2>
          <p>{chatGPTResponse}</p>
        </div>
      </div>

    </div >
  )
}
