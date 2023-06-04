import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Vans, { loader as vansloader } from './pages/Vans/Vans';

import "./server";
import VanDetail from './pages/Vans/VanDetail';
import Layout from './components/Layout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostLayout from './components/HostLayout';
import HostVans from './pages/Host/HostVans';
import HostVanDetails from './pages/Host/HostVanDetail';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import NotFound from './pages/NotFound';
import Error from './components/Error';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />}/>
    <Route path='about' element={<About />}/>
    <Route path='vans' element={<Vans />} loader={vansloader} errorElement={<Error />} />
    <Route path='vans/:id' element={<VanDetail />}/>

    <Route path='host' element={<HostLayout />}> 
      {/* your can speciy parent path and child relatively */}
        <Route index element={<Dashboard />} />
      {/* absolute path index */}
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetails />}>
        <Route index element={<HostVanInfo />} />
          <Route path="pricing" element={<HostVanPricing />} />
          <Route path="photos" element={<HostVanPhotos />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />}/>
  </Route>

))

function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Layout />}>
//           <Route index element={<Home />}/>
//           <Route path='about' element={<About />}/>
//           <Route path='vans' element={<Vans />} />
//           <Route path='vans/:id' element={<VanDetail />}/>

//           <Route path='host' element={<HostLayout />}> 
//           {/* your can speciy parent path and child relatively */}
//             <Route index element={<Dashboard />} />
//             {/* absolute path index */}
//             <Route path="income" element={<Income />} />
//             <Route path="reviews" element={<Reviews />} />
//             <Route path="vans" element={<HostVans />} />
//             <Route path="vans/:id" element={<HostVanDetails />}>
//               <Route index element={<HostVanInfo />} />
//               <Route path="pricing" element={<HostVanPricing />} />
//               <Route path="photos" element={<HostVanPhotos />} />
//             </Route>
//           </Route>
//           <Route path='*' element={<NotFound />}/>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// } 

export default App;
