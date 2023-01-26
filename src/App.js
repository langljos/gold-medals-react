import Country from './components/Country';
import './App.css';

import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';


function App() {
  return (
    <div className="App">
        {/* <header className="App-header">
          nugatory
        </header> */}
      <Box
    component="span"
    sx={{ display: 'inline-block', mx: '12px', transform: 'scale(1.8)' }}
  >
    <Country />
  </Box>
          
     
        
      </div>
  );
}

export default App;
