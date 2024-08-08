import React, { useState } from 'react';
import DefaultImage from '../images/Default.png';  // Add a default image here
import UnderweightImage from '../images/underWeight.png';
import NormalWeightImage from '../images/Normal.png';
import OverweightImage from '../images/overWeight.png';
import ObesityImage from '../images/Obese.png';


const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
  
    const handleCalculate = () => {
      if (weight && height) {
        const heightInMeters = height / 100;
        const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(calculatedBmi);
        determineBMICategory(calculatedBmi);
      }
    };
  
    const determineBMICategory = (bmi) => {
      if (bmi < 18.5) {
        setBmiCategory('Underweight');
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setBmiCategory('Normal weight');
      } else if (bmi >= 25 && bmi < 29.9) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obesity');
      }
    };
  
    const renderImage = () => {
      switch (bmiCategory) {
        case 'Underweight':
          return UnderweightImage;
        case 'Normal weight':
          return NormalWeightImage;
        case 'Overweight':
          return OverweightImage;
        case 'Obesity':
          return ObesityImage;
        default:
          return DefaultImage;
      }
    };
  
    return (
      <div className="container mx-auto py-6 md:py-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">BMI Calculator</h2>
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-600 bg-opacity-50 p-6 rounded-lg shadow-lg">
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <img src={renderImage()} alt="BMI Result" className="w-3/5 h-auto rounded-lg shadow-lg mb-4" />
            {bmi && (
              <div className="text-center text-white mt-4">
                <p className="text-2xl font-bold">Your BMI: {bmi}</p>
                <p className="text-xl">Category: {bmiCategory}</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleCalculate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Calculate BMI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BMICalculator;