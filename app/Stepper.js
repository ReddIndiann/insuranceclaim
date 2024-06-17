const Stepper = ({ steps, currentStep }) => {
    return (
      <div className="flex items-center justify-center space-x-4 mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && <div className="w-12 h-1 bg-gray-300 mx-2"></div>}
          </div>
        ))}
      </div>
    );
  };
  
  export default Stepper;
  