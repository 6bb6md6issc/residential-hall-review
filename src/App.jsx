import './App.css'
import Layout from './layout/Layout'
import AuthProvider from './provider/authProvider';
import Routes from './routes';


function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}

export default App

