import './App.css'
import Layout from './layout/Layout'
import HallReviewPage from './pages/HallReviewPage';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ShareReviewPage from './pages/ShareReviewPage';
import MyReviewPage from "./pages/MyReviewPage";

const wasatchHall = {
  hallName: "wasatch", 
  reviews: [
    {
      rating: 5,
      term: "2024-2025",
      date: "Mar 17th, 2025",
      content:
        "A WONDERFUL Professor. She is very good at what she does, teaches very clearly, and ACTUALLY SHOWS EXAMPLES. Even though it was at 8 am, Zhang managed to teach things very clearly. Tests were very fair in my opinion, very similar to practice exam. Would take her again, I hope i get her for 6A",
    },
    {
      rating: 4,
      term: "2023-2025",
      date: "Mar 10th, 2025",
      content:
        "A WONDERFUL Professor. She is very good at what she does, teaches very clearly, and ACTUALLY SHOWS EXAMPLES. Even though it was at 8 am, Zhang managed to teach things very clearly. Tests were very fair in my opinion, very similar to practice exam. Would take her again, I hope i get her for 6A",
    },
    {
      rating: 3,
      term: "2022-2023",
      date: "Mar 16th, 2025",
      content:
        "A WONDERFUL Professor. She is very good at what she does, teaches very clearly, and ACTUALLY SHOWS EXAMPLES. Even though it was at 8 am, Zhang managed to teach things very clearly. Tests were very fair in my opinion, very similar to practice exam. Would take her again, I hope i get her for 6A",
    },
  ]};

const reviews = [
  {building: "wasatch hall", date:"March 17, 2025"},
  {building: "wasatch hall", date:"March 17, 2025"},
  {building: "wasatch hall", date:"March 17, 2025"},
  {building: "wasatch hall", date:"March 17, 2025"},
  {building: "wasatch hall", date:"March 17, 2025"},
]

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="review" element={<HallReviewPage hall={wasatchHall}/>}/>
        <Route path="share" element={<ShareReviewPage hall={wasatchHall}/>}/>
        <Route path="my-review" element={<MyReviewPage reviews={reviews}/>}/>
      </Route>
    </Routes>
  )
}

export default App

