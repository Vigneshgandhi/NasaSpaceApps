// "use client";
// import { useState, useEffect, useRef } from 'react';
// import Navbar from '../Components/Navbar';

// const NASA_API_KEY = '8pCVcBcBMeJfF29ZaEW40M8YfnNWDgqSqWfFgWoh';
// const NASA_API_URL = `https://images-api.nasa.gov/search?q=mission&media_type=image`;

// const page = () => {
//   const [milestones, setMilestones] = useState([]);
//   const [displayedMilestones, setDisplayedMilestones] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const itemsPerPage = 4; // 2 rows of 2 items each
// // Ensure all images have the same width and height using inline style CSS
// const IMAGE_WIDTH = 100; // px
// const IMAGE_HEIGHT = 100; // px
//   // Fetch NASA data
//   useEffect(() => {
//     const fetchMilestones = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${NASA_API_URL}&page=${page}`);
//         if (!response.ok) throw new Error('Failed to fetch data');
        
//         const data = await response.json();
//         console.log(data);
//         // Transform API data into milestone format
//         const newMilestones = data.collection.items
//           .filter(item => item.data[0].title && item.links)
//           .map((item, index) => {
//             const imageData = item.data[0];
//             const mediaLink = item.links[0];
            
//             return {
//               id: imageData.nasa_id || `${page}-${index}`,
//               title: imageData.title || 'Untitled Mission',
//               date: imageData.date_created ? new Date(imageData.date_created).getFullYear() : 'Unknown Date',
//               description: imageData.description || imageData.title || 'No description available',
//               imageUrl: mediaLink ? mediaLink.href : null,
//               center: imageData.center || 'NASA'
//             };
//           });
        
//         if (newMilestones.length === 0) {
//           setHasMore(false);
//         } else {
//           setMilestones(prev => [...prev, ...newMilestones]);
//           setDisplayedMilestones(prev => [...prev, ...newMilestones.slice(0, itemsPerPage)]);
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMilestones();
//   }, [page]);

//   // Load more data when needed
//   const loadMore = () => {
//     if (hasMore) {
//       setPage(prev => prev + 1);
//     }
//   };

//   // Navigation functions for grid view
//   const goToPrev = () => {
//     setCurrentIndex(prev => Math.max(0, prev - 1));
//   };

//   const goToNext = () => {
//     const maxIndex = Math.max(0, Math.ceil(displayedMilestones.length / itemsPerPage) - 1);
//     setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    
//     // Load more if we're near the end
//     if (currentIndex >= Math.ceil(displayedMilestones.length / itemsPerPage) - 2 && hasMore) {
//       loadMore();
//     }
//   };

//   if (loading && milestones.length === 0) {
//     return (
//         <>
//             <Navbar/>
//             <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
//                 <div className="text-center">
//                 <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                 <p className="mt-4 text-white text-xl">Loading NASA milestones...</p>
//                 </div>
//             </div>
//         </>
//     );
//   }

//   if (error && milestones.length === 0) {
//     return (
//         <>
//             <Navbar/>
//             <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
//                 <div className="text-center p-8 bg-gray-800/50 rounded-xl max-w-md">
//                 <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
//                 <p className="text-gray-300 mb-6">{error}</p>
//                 <button 
//                     onClick={() => window.location.reload()}
//                     className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
//                 >
//                     Try Again
//                 </button>
//                 </div>
//             </div>
//         </>
//     );
//   }

//   if (milestones.length === 0) {
//     return (
//         <>
//             <Navbar/>
//             <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
//                 <div className="text-center">
//                 <h2 className="text-2xl font-bold text-white">No Milestones Found</h2>
//                 <p className="text-gray-400 mt-2">Check back later for NASA updates</p>
//                 </div>
//             </div>
//         </>
//     );
//   }

//   // Calculate which milestones to display
//   const startIndex = currentIndex * itemsPerPage;
//   const currentMilestones = displayedMilestones.slice(startIndex, startIndex + itemsPerPage);

// return (
//     <>
//         <Navbar/>
//         <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8" style={{ backgroundColor: 'black' }}>
//             <div className="max-w-6xl mx-auto">
//                 <header className="text-center mb-12">
//                     <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//                         NASA Space Exploration Timeline
//                     </h1>
//             <p className="text-gray-300 max-w-2xl mx-auto">
//                 Journey through key moments in space exploration history
//             </p>
//             </header>

//             <div className="relative">
//             {/* Navigation buttons */}
//             {/* <button
//                 onClick={goToPrev}
//                 disabled={currentIndex === 0}
//                 className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border border-gray-700 rounded-full w-12 h-12 flex items-center justify-center transition-all md:w-14 md:h-14 ${
//                 currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 aria-label="Previous page"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//             </button>
            
//             <button
//                 onClick={goToNext}
//                 disabled={!hasMore && startIndex + itemsPerPage >= displayedMilestones.length}
//                 className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border border-gray-700 rounded-full w-12 h-12 flex items-center justify-center transition-all md:w-14 md:h-14 ${
//                 !hasMore && startIndex + itemsPerPage >= displayedMilestones.length 
//                     ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 aria-label="Next page"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//             </button> */}

//             {/* Grid of milestones */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//                 {currentMilestones.map((milestone) => (
//                 <div 
//                     key={milestone.id}
//                     className="bg-gray-800/50 border mb-5  rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
//                 >
//                     <div className="md:flex">
//                     <div className="md:w-2/5 h-48 md:h-56 flex items-center justify-center">
//                         {milestone.imageUrl ? (
//                         <img 
//                             src={milestone.imageUrl} 
//                             alt={milestone.title}
//                             className="object-cover"
//                             style={{ width: IMAGE_WIDTH+"%", height: IMAGE_HEIGHT +"%" }}
//                             onError={(e) => {
//                             e.currentTarget.style.display = 'none';
//                             e.currentTarget.nextSibling.style.display = 'flex';
//                             }}
//                         />
//                         ) : null}
//                         {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
//                         <span className="text-gray-500">NASA Mission</span>
//                         </div> */}
//                     </div>
                    
//                     <div className="md:w-3/5 p-5 flex flex-col justify-center">
//                         <div className="mb-3">
//                         <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded-full">
//                             {milestone.date} • {milestone.center}
//                         </span>
//                         </div>
                        
//                         <h3 className="text-xl font-bold mb-2 line-clamp-2">
//                         {milestone.title}
//                         </h3>
                        
//                         <p className="text-gray-300 text-sm mb-4 line-clamp-3">
//                         {milestone.description}
//                         </p>
//                     </div>
//                     </div>
//                 </div>
//                 ))}
//             </div>

//             {/* Pagination controls */}
//             <div className="flex justify-center items-center space-x-4 mb-8">
//                 <button
//                 onClick={goToPrev}
//                 disabled={currentIndex === 0}
//                 className={`px-4 py-2 rounded-lg mr-3 ml-3 bg-primary text-white rounded ${
//                     currentIndex === 0 
//                     ? 'bg-gray-700 cursor-not-allowed' 
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//                 >
//                 Previous
//                 </button>
                
//                 <span className="text-gray-300 mx-2 my-2">
//                 Page {currentIndex + 1} of {Math.ceil(displayedMilestones.length / itemsPerPage) || 1}
//                 </span>
                
//                 <button
//                 onClick={goToNext}
//                 disabled={!hasMore && startIndex + itemsPerPage >= displayedMilestones.length}
//                 className={`px-4 py-2 bg-primary text-white rounded rounded-lg mr-3 ml-3 ${
//                     !hasMore && startIndex + itemsPerPage >= displayedMilestones.length
//                     ? 'bg-gray-700 cursor-not-allowed' 
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//                 >
//                 Next
//                 </button>
//             </div>

//             {/* Load more button */}
//             {hasMore && (
//                 <div className="text-center">
//                 <button
//                     onClick={loadMore}
//                     disabled={loading}
//                     className="px-6 py-3 mx-2 my-2 mb-2 bg-primary text-white rounded rounded-lg transition-colors flex items-center mx-auto"
//                 >
//                     {loading ? (
//                     <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                         Loading...
//                     </>
//                     ) : (
//                     'Load More Milestones'
//                     )}
//                 </button>
//                 </div>
//             )}
//             </div>

//             {/* Progress indicator */}
//             <div className="mt-8 text-center text-gray-400">
//             <p>Showing {displayedMilestones.length} of {milestones.length} loaded milestones</p>
//             </div>
//         </div>
//         </div>
//     </>
//   );
// };

// export default page;

"use client";
import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

const NASA_API_KEY = '8pCVcBcBMeJfF29ZaEW40M8YfnNWDgqSqWfFgWoh';
const NASA_API_URL = `https://images-api.nasa.gov/search?q=mission&media_type=image`;

const page = () => {
  const [milestones, setMilestones] = useState([]);
  const [displayedMilestones, setDisplayedMilestones] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const itemsPerPage = 4; // 2 rows of 2 items each

  // Fetch NASA data
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${NASA_API_URL}&page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        // Transform API data into milestone format
        const newMilestones = data.collection.items
          .filter(item => item.data[0].title && item.links)
          .map((item, index) => {
            const imageData = item.data[0];
            const mediaLink = item.links[0];
            
            return {
              id: imageData.nasa_id || `${page}-${index}`,
              title: imageData.title || 'Untitled Mission',
              date: imageData.date_created ? new Date(imageData.date_created).getFullYear() : 'Unknown Date',
              description: imageData.description || imageData.title || 'No description available',
              imageUrl: mediaLink ? mediaLink.href : null,
              center: imageData.center || 'NASA',
              fullDescription: imageData.description_508 || imageData.description || imageData.title || 'No detailed description available'
            };
          });
        
        if (newMilestones.length === 0) {
          setHasMore(false);
        } else {
          setMilestones(prev => [...prev, ...newMilestones]);
          setDisplayedMilestones(prev => [...prev, ...newMilestones.slice(0, itemsPerPage)]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [page]);

  // Load more data when needed
  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Navigation functions for grid view
  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    const maxIndex = Math.max(0, Math.ceil(displayedMilestones.length / itemsPerPage) - 1);
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    
    // Load more if we're near the end
    if (currentIndex >= Math.ceil(displayedMilestones.length / itemsPerPage) - 2 && hasMore) {
      loadMore();
    }
  };

  const openMilestoneDetails = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const closeMilestoneDetails = () => {
    setSelectedMilestone(null);
  };

  if (loading && milestones.length === 0) {
    return (
        <>
            <Navbar/>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-white text-xl">Loading NASA milestones...</p>
                </div>
            </div>
        </>
    );
  }

  if (error && milestones.length === 0) {
    return (
        <>
            <Navbar/>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <div className="text-center p-8 bg-gray-800/50 rounded-xl max-w-md">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
                <p className="text-gray-300 mb-6">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                    Try Again
                </button>
                </div>
            </div>
        </>
    );
  }

  if (milestones.length === 0) {
    return (
        <>
            <Navbar/>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                <h2 className="text-2xl font-bold text-white">No Milestones Found</h2>
                <p className="text-gray-400 mt-2">Check back later for NASA updates</p>
                </div>
            </div>
        </>
    );
  }

  // Calculate which milestones to display
  const startIndex = currentIndex * itemsPerPage;
  const currentMilestones = displayedMilestones.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              NASA Space Exploration Timeline
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Journey through key moments in space exploration history
            </p>
          </header>

          {/* Milestone Detail View */}
          {selectedMilestone && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
              <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-800/80 rounded-2xl border border-gray-700 p-6 md:p-8">
                <button 
                  onClick={closeMilestoneDetails}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-700/50 rounded-full p-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{selectedMilestone.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-gray-300">
                    <span className="px-3 py-1 bg-blue-900/30 rounded-full text-sm">
                      {selectedMilestone.date}
                    </span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-sm">
                      {selectedMilestone.center}
                    </span>
                  </div>
                </div>
                
                {selectedMilestone.imageUrl && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-700">
                    <img 
                      src={selectedMilestone.imageUrl} 
                      alt={selectedMilestone.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </div>
                )}
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {selectedMilestone.fullDescription || selectedMilestone.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <button
                    onClick={closeMilestoneDetails}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Back to Timeline
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            {/* Grid of milestones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {currentMilestones.map((milestone) => (
                <div 
                  key={milestone.id}
                  className="bg-gray-800/50 border rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 h-48 md:h-56 flex items-center justify-center">
                      {milestone.imageUrl ? (
                        <img 
                          src={milestone.imageUrl} 
                          alt={milestone.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                          <span className="text-gray-500">NASA Mission</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:w-3/5 p-5 flex flex-col justify-between">
                      <div>
                        <div className="mb-3">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded-full">
                            {milestone.date} • {milestone.center}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {milestone.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {milestone.description}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => openMilestoneDetails(milestone)}
                        className="mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors w-full"
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={`px-6 py-2 rounded ${
                  currentIndex === 0 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Previous
              </button>
              
              <span className="text-gray-300 mx-3">
                Page {currentIndex + 1} of {Math.ceil(displayedMilestones.length / itemsPerPage) || 1}
              </span>
              
              <button
                onClick={goToNext}
                disabled={!hasMore && startIndex + itemsPerPage >= displayedMilestones.length}
                className={`px-6 py-2 rounded rounded-lg ${
                  !hasMore && startIndex + itemsPerPage >= displayedMilestones.length
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>

            {/* Load more button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded rounded-lg transition-colors flex items-center mx-auto"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    'Load More Milestones'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="mt-8 text-center text-gray-400">
            <p>Showing {displayedMilestones.length} of {milestones.length} loaded milestones</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;