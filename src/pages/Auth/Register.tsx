import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { RegistrationData, Address } from '../../types';
import { MessageSquare, User, Phone, MapPin, Building2, Mail } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    currentAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);

  const handleBasicInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send OTP to phone number
    setOtpSent(true);
    setStep(2);
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify OTP
    setStep(3);
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit to backend
    navigate('/journey');
  };

  const handleAddressChange = (type: 'current' | 'permanent', field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type === 'current' ? 'currentAddress' : 'permanentAddress']: {
        ...(type === 'current' ? prev.currentAddress : prev.permanentAddress),
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <MessageSquare className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                    ${step >= s ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'}`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                >
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                  <option value="teacher">Teacher</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOTPVerification} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP sent to your phone
                </label>
                <input
                  type="text"
                  id="otp"
                  required
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Address</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      required
                      value={formData.currentAddress.street}
                      onChange={(e) => handleAddressChange('current', 'street', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={formData.currentAddress.city}
                      onChange={(e) => handleAddressChange('current', 'city', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      required
                      value={formData.currentAddress.state}
                      onChange={(e) => handleAddressChange('current', 'state', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      required
                      value={formData.currentAddress.postalCode}
                      onChange={(e) => handleAddressChange('current', 'postalCode', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="sameAddress"
                  type="checkbox"
                  checked={sameAsCurrentAddress}
                  onChange={(e) => {
                    setSameAsCurrentAddress(e.target.checked);
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        permanentAddress: prev.currentAddress
                      }));
                    }
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="sameAddress" className="ml-2 block text-sm text-gray-900">
                  Permanent address same as current
                </label>
              </div>

              {!sameAsCurrentAddress && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Permanent Address</h3>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="pStreet" className="block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="pStreet"
                        required
                        value={formData.permanentAddress.street}
                        onChange={(e) => handleAddressChange('permanent', 'street', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pCity" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="pCity"
                        required
                        value={formData.permanentAddress.city}
                        onChange={(e) => handleAddressChange('permanent', 'city', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pState" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        id="pState"
                        required
                        value={formData.permanentAddress.state}
                        onChange={(e) => handleAddressChange('permanent', 'state', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pPostalCode" className="block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="pPostalCode"
                        required
                        value={formData.permanentAddress.postalCode}
                        onChange={(e) => handleAddressChange('permanent', 'postalCode', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Complete Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}