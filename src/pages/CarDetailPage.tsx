
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft, CheckCircle, MapPin, Clock, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CarMapView from "@/components/CarMap/CarMapView";

// Sample car data (in a real app, this would come from an API)
const cars = [
  {
    id: 1,
    name: "Mercedes Benz",
    type: "Luxury",
    price: 100,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Experience luxury and comfort with our premium Mercedes Benz. This high-end vehicle offers superior performance, elegant design, and advanced features to make your journey exceptional.",
    features: ["5 Seats", "Automatic", "GPS", "Leather Interior", "Bluetooth", "Backup Camera", "Cruise Control", "Premium Sound System"],
    gallery: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800&h=500",
      "https://images.unsplash.com/photo-1605515298946-d7bea634d1d1?auto=format&fit=crop&q=80&w=800&h=500",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800&h=500",
    ],
    specs: {
      engine: "3.0L V6",
      transmission: "Automatic",
      fuel: "Gasoline",
      mileage: "25,000 km",
      year: "2022",
      doors: "4",
    },
    location: {
      lat: -1.2921,
      lng: 36.8219,
      address: "Nairobi Central Hub"
    },
    availability: true,
    ratings: 4.9,
    reviews: 120,
  },
  {
    id: 2,
    name: "Toyota Spacio",
    type: "Family",
    price: 60,
    image: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=800&h=500",
    description: "The Toyota Spacio is the perfect family car offering spacious interiors, great fuel economy, and reliability. Ideal for family trips with ample storage space.",
    features: ["7 Seats", "Automatic", "Good Fuel Economy", "Large Trunk", "Child Safety Locks", "Air Conditioning", "Fold-down Seats", "Rear Entertainment System"],
    gallery: [
      "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=800&h=500",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800&h=500",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800&h=500",
    ],
    specs: {
      engine: "1.8L 4-Cylinder",
      transmission: "Automatic",
      fuel: "Gasoline",
      mileage: "35,000 km",
      year: "2020",
      doors: "5",
    },
    location: {
      lat: -1.2921,
      lng: 36.8219,
      address: "Nairobi Downtown Branch"
    },
    availability: true,
    ratings: 4.6,
    reviews: 95,
  },
  {
    id: 3,
    name: "Toyota Sienta",
    type: "Family",
    price: 55,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Compact and versatile, the Toyota Sienta combines the convenience of a minivan with the efficiency of a compact car. Perfect for families who need space without sacrificing fuel economy.",
    features: ["6 Seats", "Automatic", "Sliding Doors", "Fuel Efficient", "Compact Size", "Backup Camera", "USB Ports", "Bluetooth"],
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800&h=500", 
      "https://images.unsplash.com/photo-1605515298946-d7bea634d1d1?auto=format&fit=crop&q=80&w=800&h=500",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800&h=500",
    ],
    specs: {
      engine: "1.5L 4-Cylinder",
      transmission: "CVT Automatic",
      fuel: "Gasoline",
      mileage: "29,000 km",
      year: "2021",
      doors: "5",
    },
    location: {
      lat: -1.2921,
      lng: 36.8219,
      address: "Nairobi South Branch"
    },
    availability: true,
    ratings: 4.7,
    reviews: 78,
  },
  {
    id: 4,
    name: "Toyota Mark X",
    type: "Sedan",
    price: 75,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800&h=500",
    description: "The Toyota Mark X offers the perfect blend of performance and luxury in a sleek sedan package. Its powerful engine and comfortable interior make it ideal for both business and pleasure.",
    features: ["5 Seats", "Automatic", "Sporty Design", "Powerful Engine", "Leather Seats", "Premium Sound", "Push-Start Button", "Sport Mode"],
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800&h=500",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=800&h=500",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800&h=500",
    ],
    specs: {
      engine: "2.5L V6",
      transmission: "Automatic",
      fuel: "Gasoline",
      mileage: "31,000 km",
      year: "2020",
      doors: "4",
    },
    location: {
      lat: -1.2921,
      lng: 36.8219,
      address: "Nairobi Airport Branch"
    },
    availability: true,
    ratings: 4.8,
    reviews: 102,
  },
];

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const car = cars.find(c => c.id === Number(id));
  
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [activeTab, setActiveTab] = useState("info");
  const [activeImage, setActiveImage] = useState(car ? car.image : "");
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Car not found</h2>
          <Link to="/car-rental">
            <Button className="bg-blue-600">Go Back to Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate rental duration in days
  const calculateDuration = () => {
    if (!pickupDate || !returnDate) return 0;
    const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const duration = calculateDuration();
  const totalPrice = duration * car.price;

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-6">
        <Link to="/car-rental" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cars
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Car Images and Details */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="relative h-96 rounded-lg overflow-hidden mb-4">
              <img src={activeImage} alt={car.name} className="w-full h-full object-cover" />
              {car.availability && (
                <Badge className="absolute top-4 right-4 bg-green-600">
                  Available
                </Badge>
              )}
            </div>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {car.gallery.map((img, index) => (
                <div 
                  key={index}
                  className={`w-24 h-16 rounded-md overflow-hidden flex-shrink-0 cursor-pointer border-2 ${
                    activeImage === img ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${car.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-blue-800">{car.name}</h1>
            <div className="flex items-center mt-2 mb-4">
              <Badge variant="outline" className="mr-2 bg-blue-50 border-blue-200 text-blue-800">
                {car.type}
              </Badge>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(car.ratings) ? "text-amber-500" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">({car.reviews} reviews)</span>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="w-full justify-start border-b border-gray-200 pb-0">
                <TabsTrigger value="info" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                  Information
                </TabsTrigger>
                <TabsTrigger value="specs" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="location" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                  Location & Tracking
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="pt-4">
                <p className="text-gray-700 mb-4">{car.description}</p>
                <h3 className="font-bold text-lg mb-3">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(car.specs).map(([key, value]) => (
                    <div key={key} className="border rounded-lg p-4">
                      <p className="text-sm text-gray-500 capitalize">{key}</p>
                      <p className="text-lg font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="pt-4">
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-2">Pickup Location</h3>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <p>{car.location.address}</p>
                  </div>
                </div>
                <div className="h-64 rounded-lg overflow-hidden mb-4">
                  <CarMapView location={car.location} carName={car.name} />
                </div>
                <p className="text-sm text-gray-500">
                  * Once rented, you will be able to track the car's location in real-time from your dashboard.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right column - Booking Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-blue-800">Booking Details</CardTitle>
              <CardDescription>Reserve this car now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price per day:</span>
                <span className="font-bold">${car.price}</span>
              </div>

              <Separator />

              <div>
                <p className="mb-2 text-sm font-medium">Pickup Date</p>
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
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Return Date</p>
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
              </div>

              <div className="bg-blue-50 p-4 rounded-md space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span>{duration} days</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Price:</span>
                  <span className="text-blue-800">${totalPrice}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book Now
              </Button>
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                Ask a Question
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
