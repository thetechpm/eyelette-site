// Libraries
import { useState, useEffect } from 'react';

// Components
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

// Define the things that we're pulling from the content JSON file
interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  description: string;
  link: string;
}

interface GameItem {
  id: number;
  title: string;
  image: string;
  link: string;
  description: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface Content {
  siteTitle: string;
  backgroundImage: string;
  about: {
    title: string;
    profileImage: string;
    intro: string;
    list: string[];
  };
  games: {
    title: string;
    items: GameItem[];
  };
  portfolio: {
    title: string;
    items: PortfolioItem[];
  };
  socialLinks: SocialLink[];
  footer: {
    copyrightName: string;
  };
}


function App() {
 // React stuff. Essentially manages the current tab, which content to show, and whether stuff is loading 
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load content from JSON file
    fetch('/content.json')
      .then(response => response.json())
      .then((data: Content) => {
        setContent(data);
        setLoading(false);
        // Update document title
        document.title = data.siteTitle;
      })
      .catch(error => {
        console.error('Error loading content:', error);
        setLoading(false);
      });
  }, []);

  // Gets the current year to show in the copyright footer
  const currentYear = new Date().getFullYear();


  // This shows a loading spinner if the content is still being loaded
  if (loading) {
    return (
      <Container className="loading-container">
        <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 text-white">Loading...</p>
      </Container>
    );
  }

  // Show an error thing if the content didn't fetch properly
  if (!content) {
    return (
      <Container className="error-container">
        <Alert variant="danger">
          Error loading content. Please check that content.json exists.
        </Alert>
      </Container>
    );
  }

  
  return (
    <div>
      {/* This is where your banner image is added */}
      <Container fluid className="header-background-image mb-o">
        <img
          src={content.backgroundImage}
          alt="Banner"
          className="header-img"
        />
        <header>
          <Col xs={12}>
            <Container className='header-body-container'>
              <h1>{content.siteTitle}</h1>
            </Container>
          </Col>
        </header>
      </Container>
      {/* This is the main content panel */}
      <Container className="app-container mt-0">
        <Container fluid className= "mb-3">

          {/* This is the about section.*/}
          <Container>
            <h2>{content.about.title}</h2>
            <Row>
              <Col md={4} className="text-center mb-4 mb-md-0">
                <div className="profile-container mx-auto">
                  <img 
                    src={content.about.profileImage} 
                    alt="Profile" 
                    className="profile-image"
                  />
                </div>
              </Col>
              <Col md={8}>
                <Container className="about-text">
                  <Row><h3>{content.about.intro}</h3></Row>
                  <Row className= "mx-3">
                    { /* This is where your list of items is iterated over and shown as bullets. */ }
                    <ul>
                      {content.about.list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Row>
                  <br></br>
                  <Row className="about-text">
                    <h3>Find me on: </h3>
                  </Row>
                  <Row className= "mx-3">
                    { /* This is where your social accounts are iterated over and shown as bullets. */ }
                    <ul>
                      {content.socialLinks.map((social, index) => (
                        <li><a 
                          key={index}
                          className="text-decoration-none about-social-links"
                          href={social.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label={social.platform}
                        >
                          <p><i className={social.icon}></i> {social.platform}</p>
                        </a></li>
                      ))}
                  </ul>
                </Row>
                </Container>
              </Col>
            </Row>
          </Container>

          {/* This is the image grid for the games section. */}
          <Container className="game-section mt-3">
            <h2>{content.games.title}</h2>

            <Row xs={1} md={3} className="g-4">
              {content.games.items.map((item) => (
                <Col key={item.id}>
                  <a href={item.link}>
                    <Card className="game-card h-100">
                      <Card.Img variant="top" src={item.image} alt={item.title}  />
                      <Card.ImgOverlay className="game-card-overlay">
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          {item.description}
                        </Card.Text>
                      </Card.ImgOverlay>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </Container>

          {/* This is the image grid for the art portfolio section. */}
          <Container className="portfolio-section mt-3">
            <h2>{content.portfolio.title}</h2>

            <Row xs={1} md={2} className="g-4">
              {content.portfolio.items.map((item) => (
                <Col key={item.id}>
                  <a href={item.link}>
                    <Card className="portfolio-card h-100">
                      <Card.Img variant="top" src={item.image} alt={item.title}  />
                      <Card.ImgOverlay className="portfolio-card-overlay">
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          {item.description}
                        </Card.Text>
                      </Card.ImgOverlay>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </Container>
        </Container>

        {/* This is the footer with the social media links and copyright information */}
        <footer>
          <Container className="my-5 text-center">
                <Row className ="social-links">
                  {content.socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.platform}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
                </Row>
                <Row>
                  <p className="copyright">©{currentYear} {content.footer.copyrightName}. All rights reserved.</p>
                </Row>
          </Container>
        </footer>
      </Container>
    </div>
  );
}

export default App