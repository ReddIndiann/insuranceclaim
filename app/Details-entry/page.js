'use client';// VehicleDamage.jsimport { useRouter } from 'next/navigation';
import { useState } from 'react';
import Stepper from '../Stepper';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const VehicleDamage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Vehicle', 'Incident', 'Date', 'Location', 'Confirmation'];
  const [view, setView] = useState('vehicle');
  const [startDate, setStartDate] = useState(new Date());
  const [location, setLocation] = useState(center);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
  });

  const handleNext = () => {
    if (view === 'vehicle') {
      setView('incident');
      setCurrentStep(1);
    } else if (view === 'incident') {
      setView('date');
      setCurrentStep(2);
    } else if (view === 'date') {
      setView('location');
      setCurrentStep(3);
    } else if (view === 'location') {
      setView('confirmation');
      setCurrentStep(4);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/next-page');
    }
  };

  const handlePrevious = () => {
    if (view === 'incident') {
      setView('vehicle');
      setCurrentStep(0);
    } else if (view === 'date') {
      setView('incident');
      setCurrentStep(1);
    } else if (view === 'location') {
      setView('date');
      setCurrentStep(2);
    } else if (view === 'confirmation') {
      setView('location');
      setCurrentStep(3);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="bg-white p-8 rounded shadow-md w-80">
        {view === 'vehicle' ? (
          <>
            <h2 className="text-xl mb-4">Which vehicle has been damaged?</h2>
            <div className="mb-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                    🚗
                  </div>
                  <div>
                    <div>Nissan Altima</div>
                    <div>Contract 6144247</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : view === 'incident' ? (
          <>
            <h2 className="text-xl mb-4">What happened?</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                'Collision with another vehicle',
                'Collision with 2+ vehicles',
                'Theft',
                'Partial theft',
                'Parking damage',
                'Fire',
                'Loss of Control',
                'Object/animal collision',
                'Broken glass',
                'Weather damage',
                'Wild animal collision',
                'Hail damage',
                'Damage from cargo',
                'Collision with pedestrian',
                'Vandalism',
              ].map((incident, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                    {/* Placeholder for icons */}
                    <span className="text-gray-700">{index + 1}</span>
                  </div>
                  <span className="text-center text-sm">{incident}</span>
                </div>
              ))}
            </div>
          </>
        ) : view === 'date' ? (
          <>
            <h2 className="text-xl mb-4">When did it happen?</h2>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
          </>
        ) : view === 'location' ? (
          <>
            <h2 className="text-xl mb-4">Where did it happen?</h2>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
                onClick={(e) => setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
              >
                <Marker position={location} />
              </GoogleMap>
            ) : <div>Loading...</div>}
          </>
        ) : view === 'confirmation' ? (
          <div>
            <h2 className="text-xl mb-4">Confirmation</h2>
            <p>Confirm your details and proceed.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">Summary</h2>
            <p>Review all the details.</p>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded" onClick={handlePrevious}>Previous</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDamage;
