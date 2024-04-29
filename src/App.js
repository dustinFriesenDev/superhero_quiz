import './App.css';
import React, { useState } from 'react';
import heroes from './superheroDataSheet.json';
import bang from "./images/comic_graphics/vecteezy_bang-comic-explosion-with-yellow-and-red-colors-explosion_24800846.png";
import graphic from "./images/comic_graphics/vecteezy_poof-comic-explosion-comic-blast-vector-with-bubble_8878650.png";

function App() {
  const [counter, setCounter] = useState(1);
  const [addPoint, setAddPoint] = useState(0);
  const [score, setScore] = useState(0);
  const [onomatopoeia] = useState(document.getElementById("onomatopoeia"));
  const [answer] = useState(document.getElementById("answer"));

  const correctAnswer = (e) => {
    const oc = document.getElementById("option-container");
    const answer = document.getElementById("answer");
    const option = e.target;
    const onomatopoeia = document.getElementById("onomatopoeia")
    const correct = document.getElementById("correct");
    if(option.innerText === correct.innerText){
      oc.style.display = "none";
      onomatopoeia.style.display = "inline";
      onomatopoeia.classList.add("add-onomatopoeia");
      setTimeout(growGraphic, 1000);
      setAddPoint(addPoint + 1);
    } else {
      if(option.id !== "option-container"){
        option.style.backgroundColor = "#054553";
        option.style.color = "white";
        option.style.opacity = "0.7";
        option.classList.add("add-shake");
        setAddPoint(addPoint - 1);
        console.log(nextQuestion("flight"));
      }
    }
  }

  function growGraphic() {
    const answer = document.getElementById("answer");
    const onomatopoeia = document.getElementById("onomatopoeia")
    onomatopoeia.classList.remove("onomatopoeia");
    onomatopoeia.style.display = "none";
    answer.style.display = "block";
  }

  function graphicTransition(td) {
    const graphic = document.getElementById("graphic");
    const answerImage = document.getElementById('answerImage');
    answerImage.style.display = "none";
    graphic.style.display = "inline";
    graphic.setAttribute("class", {td});
  }

  function nextId(){
    setCounter(counter +1);
  }

  function nextQuestion(td) {
    graphicTransition(td);
    if(addPoint > 0){
      setScore(score + 1);
    }
    setAddPoint(0);
    setTimeout(nextId, 1000);
    
  }

  

  const princessList = heroes.map((e) => {
    if(counter === e.id){
      return (
        <div key={e.id}>
          <div className="question" id="question">{e.id}. {e.question}</div>
          <div className='option-container' id="option-container" onClick={correctAnswer}>
            <p className='option o1' id="o1">{e.o1}</p>
            <p className='option o2' id="o2">{e.o2}</p>
            <p className='option o3' id="o3">{e.o3}</p>
            <p className='option o4' id="o4">{e.o4}</p>
          </div>

          <img id="onomatopoeia" src={bang} alt="bang" />

        {/* Answer */}
          <div className='answer' id="answer">
            <h3>{e.name}</h3>
            <p style={{display: "none"}} id="correct">{e.answer}</p>
            <img id="answerImage" src={e.img} alt={e.altText} />
            <img id="graphic" src={e.transition} alt={e.transitionAlt} />
            <p className='option btn-next' id="btnNext" onClick={nextQuestion}>Next</p>
          </div>
        </div>
      )
    } 
  });

  function endPage() {
    if (counter > heroes.length){
      return (
        <div>
          <h3>Congratulations!! You finished the quiz.</h3>
          <p>You got {score} out of {heroes.length} answers correct on the first try.</p>
          <p>Click the button below to start again.</p>
          <p className='option btn-next btn-again' id="btnAgain" onClick={startOver}>Start Over</p>
        </div>
      )
    }
  }

  const startOver = () => {
    setCounter(1);
    setAddPoint(0);
    setScore(0);
  }

//HTML Return Statement
  return (
    <div className="App">
      <header className="App-header">      
        <div>Superhero Quiz</div>
      </header>
        <div className='main-container'>
          {princessList}
          {endPage()}
        </div>
      <footer>
        <small>Quiz created by Dustin Friesen. All images and characters are owned by Marvel and DC Comics . This quiz is for demonstration purposes only.</small>
        <small><a href="https://www.vecteezy.com/free-png/comic-bang">Comic onomatopoeias PNGs by Vecteezy</a></small>
      </footer>
    </div>
  );
}

export default App;
