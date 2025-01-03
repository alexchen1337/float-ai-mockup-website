import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import BackgroundLines from './components/BackgroundLines'
import sovaImg from './assets/mockup/sova.png'
import cypherImg from './assets/mockup/cypher.png'
import aiCoachImg1 from './assets/mockup/1.png'
import aiCoachImg2 from './assets/mockup/2.png'
import aiCoachImg3 from './assets/mockup/3.png'
import aiCoachImg4 from './assets/mockup/4.png'

function App() {
  const [activeCard, setActiveCard] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const aiCoachingSlides = [aiCoachImg1, aiCoachImg2, aiCoachImg3, aiCoachImg4];

  const demoCards = [
    {
      id: 1,
      title: "Ingame Lineup Tool",
      description: "Access precise lineups and strategies while playing, enhancing your tactical advantage in real-time.",
      image: sovaImg
    },
    {
      id: 2,
      title: "Find Setups Real-Time",
      description: "Discover optimal agent setups and positions instantly, maximizing your effectiveness in every round.",
      image: cypherImg
    },
    {
      id: 3,
      title: "AI Coaching",
      description: "Receive personalized feedback and recommendations to improve your gameplay through advanced AI analysis.",
      image: aiCoachingSlides[currentSlide]
    }
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + aiCoachingSlides.length) % aiCoachingSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % aiCoachingSlides.length);
  };

  // Find the active card's image
  const activeImage = demoCards.find(card => card.id === activeCard)?.image;

  return (
    <>
      <NavBar />
      <div className="app">
        <div className="content-wrapper">
          {/* Hero Section */}
          <section className="hero">
            <BackgroundLines />
            <div className="hero-content">
              <h1>Float.GG</h1>
              <p className="hero-subtitle">Elevate Your VALORANT Experience with AI-Powered Insights</p>
              <button className="cta-button">Download</button>
              <p className="system-requirement"><em>Requires Windows 10 or higher</em></p>
            </div>
          </section>

          {/* Demo Videos Section */}
          <section className="demo-videos" id="demos">
            <div className="demo-container border-container">
              <div className="demo-cards">
                <h2>Demos</h2>
                {demoCards.map((card) => (
                  <div 
                    key={card.id}
                    className={`demo-card ${activeCard === card.id ? 'active' : ''}`}
                    onClick={() => setActiveCard(card.id)}
                  >
                    <div className="demo-card-header">
                      <h3>{card.title}</h3>
                      <span className="arrow-icon">▼</span>
                    </div>
                    <p className="demo-description">{card.description}</p>
                  </div>
                ))}
              </div>
              <div className="demo-video" data-slideshow={activeCard === 3}>
                <div className="video-container">
                  <img 
                    key={activeCard === 3 ? undefined : activeImage}
                    src={activeImage} 
                    alt="Demo Preview" 
                    className="demo-image"
                  />
                  {activeCard === 3 && (
                    <div className="slideshow-controls">
                      <button onClick={handlePrevSlide} className="slide-btn prev-btn">←</button>
                      <div className="slide-indicators">
                        {aiCoachingSlides.map((_, index) => (
                          <span 
                            key={index} 
                            className={`slide-dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                          />
                        ))}
                      </div>
                      <button onClick={handleNextSlide} className="slide-btn next-btn">→</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats" id="stats">
            <div className="stat-cards">
              <div className="stat-card">
                <span className="stat-number">50K+</span>
                <p>Matches Analyzed</p>
              </div>
              <div className="stat-card">
                <span className="stat-number">98%</span>
                <p>Accuracy Rate</p>
              </div>
              <div className="stat-card">
                <span className="stat-number">15+</span>
                <p>Pro Teams Using Float.GG</p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features" id="features">
            <div className="border-container">
              <h2>Advanced Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🎯</div>
                  <h3>Real-time Analysis</h3>
                  <p>Get instant feedback on your gameplay with our advanced AI algorithms</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3>Performance Tracking</h3>
                  <p>Track your progress with detailed statistics and personalized insights</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🤖</div>
                  <h3>AI Coach</h3>
                  <p>Receive personalized tips and strategies based on your playstyle</p>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Section */}
          <section className="technical" id="technical">
            <div className="border-container">
              <h2>Technical Excellence</h2>
              <div className="tech-grid">
                <div className="tech-item">
                  <h3>Secure & Scalable</h3>
                  <p>Enterprise-grade security with AWS infrastructure</p>
                </div>
                <div className="tech-item">
                  <h3>API Compliance</h3>
                  <p>Full compliance with Riot Games API guidelines</p>
                </div>
                <div className="tech-item">
                  <h3>Real-time Processing</h3>
                  <p>Sub-second data processing and analysis</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact" id="contact">
            <div className="contact-card">
              <h2>Get in Touch</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href="">x@x</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">GitHub:</span>
                  <a href="">xxxxxxx</a>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>© 2024 Float.GG - Changing The Way You Play VALORANT</p>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App
