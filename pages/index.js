import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [jobTitleInput, setJotTitleInput] = useState('');
  const [jobLocationInput, setJobLocationInput] = useState('');
  const [jobRespInput, setJobRespInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "title" : jobTitleInput, "responsibilities" : jobRespInput, "location": jobLocationInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedTitleText = (event) => {
    setJotTitleInput(event.target.value);
  };

  const onUserChangedRespText = (event) => {
    setJobRespInput(event.target.value);
  };

  const onUserChangedLocationText = (event) => {
    setJobLocationInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Next gen job descriptions</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate perfect job descriptions in seconds</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get smart results with job description maker!</h2>
          </div>
        </div>
        <div className="prompt-container">
        <textarea placeholder="Enter job title" className="prompt-box" value={jobTitleInput} onChange={onUserChangedTitleText} />
        <textarea placeholder="Enter job posting's location" className="prompt-box" value={jobLocationInput} onChange={onUserChangedLocationText} />
          <textarea placeholder="Enter job responsibilities" className="prompt-box" value={jobRespInput} onChange={onUserChangedRespText} />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Job Description</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
