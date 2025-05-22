
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Car, Info, Clock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import CarMapView from "@/components/CarMap/CarMapView";

// Sample data for rented cars
const rentedCars = [
  {
    id: 101,
    carId: 1,
    name: "Mercedes Benz",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800&h=500",
    rentalStartDate: new Date("2025-05-18T10:00:00"),
    rentalEndDate: new Date("2025-05-22T10:00:00"),
    currentLocation: { lat: -1.2921, lng: 36.8219 },
    previousLocations: [
      { lat: -1.2921, lng: 36.8219, timestamp: "2025-05-18T12:30:00" },
      { lat: -1.2971, lng: 36.8129, timestamp: "2025-05-18T14:45:00" },
      { lat: -1.3021, lng: 36.8319, timestamp: "2025-05-19T09:15:00" },
    ],
    stats: {
      distanceTraveled: 78.5,
      fuelRemaining: 65,
      averageSpeed: 42
    }
  },
  {
    id: 102,
    carId: 2,
    name: "Toyota Spacio",
    image: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=800&h=500",
    rentalStartDate: new Date("2025-05-17T14:00:00"),
    rentalEndDate: new Date("2025-05-21T14:00:00"),
    currentLocation: { lat: -1.3011, lng: 36.7909 },
    previousLocations: [
      { lat: -1.2921, lng: 36.8219, timestamp: "2025-05-17T15:00:00" },
      { lat: -1.2951, lng: 36.7999, timestamp: "2025-05-18T10:30:00" },
      { lat: -1.3011, lng: 36.7909, timestamp: "2025-05-19T08:45:00" },
    ],
    stats: {
      distanceTraveled: 45.2,
      fuelRemaining: 78,
      averageSpeed: 38
    }
  },
  {
    id: 103,
    carId: 4,
    name: "Toyota Mark X",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800&h=500",
    rentalStartDate: new Date("2025-05-19T09:00:00"),
    rentalEndDate: new Date("2025-05-23T09:00:00"),
    currentLocation: { lat: -1.2651, lng: 36.8419 },
    previousLocations: [
      { lat: -1.2921, lng: 36.8219, timestamp: "2025-05-19T09:30:00" },
      { lat: -1.2751, lng: 36.8319, timestamp: "2025-05-19T11:15:00" },
      { lat: -1.2651, lng: 36.8419, timestamp: "2025-05-19T14:00:00" },
    ],
    stats: {
      distanceTraveled: 32.7,
      fuelRemaining: 88,
      averageSpeed: 45
    }
  },
];

const CarTrackingPage: React.FC = () => {
  const [selectedCarId, setSelectedCarId] = useState(rentedCars[0]?.id.toString());
  const selectedCar = rentedCars.find(car => car.id.toString() === selectedCarId);
  const [activeTab, setActiveTab] = useState("liveTracking");

  // Calculate rental progress percentage
  const calculateProgress = (startDate: Date, endDate: Date) => {
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    
    if (now < startDate) return 0;
    if (now > endDate) return 100;
    
    const progress = (elapsedDuration / totalDuration) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  if (!selectedCar) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No rented cars found</h2>
          <Link to="/car-rental">
            <Button className="bg-blue-600">Rent a Car</Button>
          </Link>
        </div>
      </div>
    );
  }

  const rentalProgress = calculateProgress(
    selectedCar.rentalStartDate,
    selectedCar.rentalEndDate
  );

  // Calculate rental duration in days
  const calculateDuration = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rentalDuration = calculateDuration(
    selectedCar.rentalStartDate,
    selectedCar.rentalEndDate
  );

  const daysRemaining = calculateDuration(
    new Date(),
    selectedCar.rentalEndDate
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-6">
        <Link to="/car-rental" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Car Rentals
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Car Tracking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with car selection */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Rented Cars</CardTitle>
              <CardDescription>Select a car to track</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedCarId} onValueChange={setSelectedCarId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a car" />
                </SelectTrigger>
                <SelectContent>
                  {rentedCars.map((car) => (
                    <SelectItem key={car.id} value={car.id.toString()}>
                      {car.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Rental Information</CardTitle>
              <div className="flex items-center mt-2">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-16 h-10 object-cover rounded-md mr-3"
                />
                <h3 className="font-bold">{selectedCar.name}</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Rental Period</p>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">
                      {format(selectedCar.rentalStartDate, "MMM dd")} - {format(selectedCar.rentalEndDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{Math.round(rentalProgress)}%</span>
                    </div>
                    <Progress value={rentalProgress} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="font-bold text-blue-800">{rentalDuration} days</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 mb-1">Remaining</p>
                    <p className="font-bold text-blue-800">{daysRemaining} days</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Distance Traveled</span>
                    <span className="font-medium">{selectedCar.stats.distanceTraveled} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Fuel Remaining</span>
                    <span className="font-medium">{selectedCar.stats.fuelRemaining}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Avg. Speed</span>
                    <span className="font-medium">{selectedCar.stats.averageSpeed} km/h</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Info className="h-4 w-4 mr-2" />
                  View Full Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main tracking content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Car Location & Tracking</CardTitle>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-green-600">Live Tracking</span>
                </div>
              </div>
              <CardDescription>
                Track the current location and movement history of your rented car
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-2">
                  <TabsList className="w-full">
                    <TabsTrigger value="liveTracking" className="flex-1">Live Tracking</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">Route History</TabsTrigger>
                    <TabsTrigger value="statistics" className="flex-1">Statistics</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="liveTracking" className="p-6 pt-4">
                  <div className="h-[500px] rounded-lg overflow-hidden">
                    <CarMapView 
                      location={selectedCar.currentLocation} 
                      carName={selectedCar.name}
                      showRoute={true} 
                      routePoints={selectedCar.previousLocations.map(loc => ({ lat: loc.lat, lng: loc.lng }))}
                    />
                  </div>
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                      <Car className="h-4 w-4 mr-2" />
                      Current Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Last Updated</span>
                        <span className="font-medium">Just now</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Current Speed</span>
                        <span className="font-medium">45 km/h</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Position</span>
                        <span className="font-medium truncate">
                          Lat: {selectedCar.currentLocation.lat.toFixed(4)}, 
                          Lng: {selectedCar.currentLocation.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="p-6 pt-4">
                  <div className="h-[400px] rounded-lg overflow-hidden mb-6">
                    <CarMapView 
                      location={selectedCar.currentLocation} 
                      carName={selectedCar.name} 
                      showRoute={true}
                      routePoints={selectedCar.previousLocations.map(loc => ({ lat: loc.lat, lng: loc.lng }))}
                      showMarkers={true}
                    />
                  </div>
                  <h3 className="font-medium text-blue-800 mb-3">Location History</h3>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-3 bg-blue-50 p-3 border-b text-sm font-medium">
                      <div>Location</div>
                      <div>Timestamp</div>
                      <div>Actions</div>
                    </div>
                    {selectedCar.previousLocations.map((location, index) => (
                      <div key={index} className="grid grid-cols-3 p-3 border-b last:border-b-0 text-sm">
                        <div>
                          Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                        </div>
                        <div>{new Date(location.timestamp).toLocaleString()}</div>
                        <div>
                          <Button variant="link" className="h-auto p-0 text-blue-600">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="statistics" className="p-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Distance Traveled</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold">{selectedCar.stats.distanceTraveled}</span>
                          <span className="text-lg ml-1 mb-1">km</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Total distance traveled since rental start date
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Fuel Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2">
                          <Progress value={selectedCar.stats.fuelRemaining} className="h-3" />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Empty</span>
                          <span className="font-medium">{selectedCar.stats.fuelRemaining}% Remaining</span>
                          <span>Full</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Usage Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Average Speed</p>
                          <p className="text-xl font-bold">{selectedCar.stats.averageSpeed} km/h</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Days Used</p>
                          <p className="text-xl font-bold">
                            {Math.min(
                              Math.ceil((new Date().getTime() - selectedCar.rentalStartDate.getTime()) / (1000 * 60 * 60 * 24)),
                              rentalDuration
                            )} / {rentalDuration}
                          </p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Stops Made</p>
                          <p className="text-xl font-bold">{selectedCar.previousLocations.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarTrackingPage;
