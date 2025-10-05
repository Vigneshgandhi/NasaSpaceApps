"use client";

import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { Calendar, Users, Rocket, ArrowLeft } from "lucide-react";
import Navbar from "../Components/Navbar";

export default function AstronautStories() {
  const [astronauts, setAstronauts] = useState([]);
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Fetch astronauts from SpaceDevs API
  const fetchAstronauts = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ll.thespacedevs.com/2.2.0/astronaut/?limit=12&offset=${(pageNum - 1) * 12}&ordering=name`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch astronauts: ${response.status}`);
      }
      
      const data = await response.json();
      setAstronauts(prev => pageNum === 1 ? data.results : [...prev, ...data.results]);
      setHasNextPage(Boolean(data.next));
    } catch (err) {
      setError(err.message || "An unknown error occurred");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAstronauts(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAstronauts(nextPage);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-500";
      case "retired": return "bg-blue-500";
      case "deceased": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  if (loading && astronauts.length === 0) {
    return (
        <>        <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Astronaut Stories</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover the incredible journeys of space explorers
            </p>
          </header>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
      </>
    );
  }

  if (error && astronauts.length === 0) {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
            <header className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Astronaut Stories</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                Discover the incredible journeys of space explorers
                </p>
            </header>
            <div className="text-center py-12">
                <p className="text-red-400 mb-4">Error: {error}</p>
                <Button 
                onClick={() => {
                    setError(null);
                    fetchAstronauts(1);
                }} 
                className="mt-4"
                >
                Retry
                </Button>
            </div>
            </div>
        </div>
        </>
    
    );
  }

  if (selectedAstronaut) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Button 
            onClick={() => setSelectedAstronaut(null)} 
            variant="outline" 
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Astronauts
          </Button>
          
          <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 p-6 flex flex-col items-center">
                {selectedAstronaut.profile_image ? (
                  <img 
                    src={selectedAstronaut.profile_image} 
                    alt={selectedAstronaut.name}
                    className="w-full rounded-xl object-cover aspect-square"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-square flex items-center justify-center">
                    <Users className="h-16 w-16 text-gray-500" />
                  </div>
                )}
                
                <div className="mt-6 w-full">
                  <h2 className="text-2xl font-bold mb-2">Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Status</span>
                      <Badge className={`${getStatusColor(selectedAstronaut.status?.name || "")} text-white`}>
                        {selectedAstronaut.status?.name || "Unknown"}
                      </Badge>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Agency</span>
                      <span>{selectedAstronaut.agency?.abbrev || selectedAstronaut.agency?.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Nationality</span>
                      <span>{selectedAstronaut.nationality || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Born</span>
                      <span>
                        {selectedAstronaut.date_of_birth 
                          ? new Date(selectedAstronaut.date_of_birth).toLocaleDateString() 
                          : "N/A"}
                      </span>
                    </div>
                    {selectedAstronaut.date_of_death && (
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Died</span>
                        <span>
                          {new Date(selectedAstronaut.date_of_death).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Missions</span>
                      <span>{selectedAstronaut.missions?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold">{selectedAstronaut.name}</h1>
                    <p className="text-xl text-gray-300">
                      {selectedAstronaut.agency?.name || "Space Agency"}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Biography</h2>
                    <div className="max-w-none">
                      <p className="text-gray-300 leading-relaxed">
                        {selectedAstronaut.bio || "No biography available for this astronaut. This remarkable individual has contributed to space exploration through their service and dedication."}
                      </p>
                    </div>
                  </div>
                  
                  {selectedAstronaut.missions?.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">Missions</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedAstronaut.missions.map((mission, index) => (
                          <Card key={index} className="bg-gray-700/50 border-gray-600">
                            <Card.Body className="p-4">
                              <div className="flex items-center gap-3">
                                <Rocket className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <span className="font-medium">
                                  {mission.mission?.name || `Mission ${index + 1}`}
                                </span>
                              </div>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
    );
  }

  return (
    <>
        <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Astronaut Stories</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore the lives and achievements of space explorers from around the world
          </p>
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-400">Error: {error}</p>
            <Button 
              onClick={() => {
                setError(null);
                fetchAstronauts(1);
              }} 
              className="mt-2"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {astronauts.map((astronaut) => (
            <Card 
              key={astronaut.id} 
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all cursor-pointer group overflow-hidden"
              onClick={() => setSelectedAstronaut(astronaut)}
            >
              <Card.Body className="p-0">
                <div className="relative">
                  {astronaut.profile_image_thumbnail ? (
                    <img 
                      src={astronaut.profile_image_thumbnail} 
                      alt={astronaut.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                      <Users className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  <Badge 
                    className={`absolute top-3 right-3 ${getStatusColor(astronaut.status?.name || "")} text-white`}
                  >
                    {astronaut.status?.name?.slice(0, 12) || "Unknown"}
                  </Badge>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors mb-1">
                    {astronaut.name}
                  </h3>
                  <p className="text-gray-400 mb-3">
                    {astronaut.agency?.abbrev || astronaut.agency?.name || "Space Agency"}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Rocket className="h-4 w-4" />
                      <span>{astronaut.missions?.length || 0} missions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {astronaut.date_of_birth 
                          ? new Date(astronaut.date_of_birth).getFullYear() 
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300">
                    <span className="text-sm font-medium">View story</span>
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={loadMore} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Loading...
                </span>
              ) : (
                "Load More Astronauts"
              )}
            </Button>
          </div>
        )}

        {!hasNextPage && astronauts.length > 0 && (
          <div className="text-center text-gray-500 mt-12">
            You've reached the end of astronaut stories
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by The Space Devs API</p>
        </div>
      </div>
    </div>
    </>    
  );
}