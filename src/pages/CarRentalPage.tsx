
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Car, MapPin, Clock } from "lucide-react";

// Sample car data
const cars = [
  {
    id: 1,
    name: "Mercedes Benz",
    type: "Luxury",
    price: 100,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Luxurious Mercedes for a comfortable ride",
    features: ["5 Seats", "Automatic", "GPS", "Leather Interior"],
  },
  {
    id: 2,
    name: "Toyota Spacio",
    type: "Family",
    price: 60,
    image: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Spacious family car with great fuel economy",
    features: ["7 Seats", "Automatic", "Good Fuel Economy", "Large Trunk"],
  },
  {
    id: 3,
    name: "Toyota Sienta",
    type: "Family",
    price: 55,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Compact minivan perfect for family trips",
    features: ["6 Seats", "Automatic", "Sliding Doors", "Fuel Efficient"],
  },
  {
    id: 4,
    name: "Toyota Mark X",
    type: "Sedan",
    price: 75,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Stylish sedan with powerful performance",
    features: ["5 Seats", "Automatic", "Sporty Design", "Powerful Engine"],
  },
];

const CarRentalPage: React.FC = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [carType, setCarType] = useState("all");
  
  // Filter cars based on selected type
  const filteredCars = carType === "all" 
    ? cars 
    : cars.filter(car => car.type.toLowerCase() === carType.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Hero Section */}
      <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504215680853-026ed2a45def')] bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Car Rentals
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Rent premium vehicles at competitive prices with our easy booking system
          </p>
          <div className="bg-white/90 w-full max-w-4xl p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? format(pickupDate, "PPP") : <span>Pick date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : <span>Return date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Select value={carType} onValueChange={setCarType}>
                <SelectTrigger>
                  <SelectValue placeholder="Car Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-blue-600 hover:bg-blue-700">
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Available Cars</h2>
        
        <Tabs defaultValue="grid" className="mb-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              Showing {filteredCars.length} cars
            </div>
          </div>
          
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-blue-800">{car.name}</CardTitle>
                    <CardDescription>{car.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold text-lg">${car.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-1 text-blue-600" />
                        <span className="text-sm text-gray-500">{car.type}</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {car.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/car-details/${car.id}`} className="w-full">
                      <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {filteredCars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 h-48 md:h-auto">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-blue-800">{car.name}</h3>
                          <p className="text-gray-500">{car.type}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <p className="font-bold text-xl">${car.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{car.description}</p>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {car.features.map((feature, index) => (
                          <p key={index} className="flex items-center text-sm text-gray-600">
                            <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                            {feature}
                          </p>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link to={`/car-details/${car.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Features Section */}
      <div className="py-12 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-blue-50 border-none">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">Premium Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our fleet consists of well-maintained premium vehicles to ensure comfort and safety.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-none">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">GPS Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All our cars come with GPS tracking for security and ease of navigation.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-none">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our customer support team is available 24/7 to assist you with any queries or issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-blue-800 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Book Your Car?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Experience premium car rental services at competitive prices. Book now and get special discounts!
        </p>
        <Button className="bg-white text-blue-800 hover:bg-blue-100">
          Browse All Cars
        </Button>
      </div>
    </div>
  );
};

export default CarRentalPage;
