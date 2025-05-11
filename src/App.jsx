import './App.css'
import Layout from './layout/Layout'
import ReviewList from './component/ReviewList';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="review" element={<ReviewList/>}/>
      </Route>
    </Routes>
  )
}

export default App
