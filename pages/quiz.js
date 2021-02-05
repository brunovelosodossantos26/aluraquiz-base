/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable space-before-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ 
  question, 
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
    <Widget.Header>
      {/*<BackLinkArrow href="/" />*/}
      <h3>
        Pergunta
        {` ${questionIndex} ` }
        de
        {` ${totalQuestions}`}
      </h3>
    </Widget.Header>

    <img 
      alt="Descrição"
      style={{
        width:'100%',
        height:'150px',
        objectFit:'cover',
      }}
      src={question.image}
    />
    <Widget.Content>
      <h2>
        {question.title}
      </h2>
      <p>
        {question.description}
      </p>

      <form onSubmit={(infosDoEvento) => {
        infosDoEvento.preventDefault();
        onSubmit();
      }}
      >
      {question.alternatives.map((alternative, alternativeIndex) => {
        const alternativeId = `alternative__${alternativeIndex}`;
        return (
          <Widget.Topic
          as="label"
           htmlFor={alternativeId}
          >
            <input 
              id={alternativeId}
              name={questionId}
              type="radio"
            />
            {alternative}
          </Widget.Topic>
        );
      })}
      {/*<pre>
      
      JSON.stringify(question, null, 4)}
      </pre>*/}
     
      <Button type="submit">
        Confirmar
      </Button>
      </form>
    </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage(){
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length; 
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions){
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
         {screenState === screenStates.QUIZ && (
         <QuestionWidget 
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
         />
         )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questôes, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}