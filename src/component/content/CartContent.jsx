import React from "react";

export const CartContent = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Services</h2>
          <div className="mt-4 inline-block h-1 w-24 bg-green-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center transition duration-500 ease-in-out bg-white hover:bg-green-600 hover:text-white shadow-lg p-4 rounded-lg">
            <WebcamIcon className="mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Custom Planters</h3>
            <p className="text-gray-600 hover:text-white">Tailor-made designs to fit your space perfectly.</p>
          </div>
          <div className="flex flex-col items-center text-center transition duration-500 ease-in-out bg-white hover:bg-green-600 hover:text-white shadow-lg p-4 rounded-lg">
            <TargetIcon className="mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Eco-Friendly Materials</h3>
            <p className="text-gray-600 hover:text-white">Sustainable and durable options for conscious gardening.</p>
          </div>
          <div className="flex flex-col items-center text-center transition duration-500 ease-in-out bg-white hover:bg-green-600 hover:text-white shadow-lg p-4 rounded-lg">
            <ImageIcon className="mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Gardening Tips</h3>
            <p className="text-gray-600 hover:text-white">Expert advice for thriving plants.</p>
          </div>
          <div className="flex flex-col items-center text-center transition duration-500 ease-in-out bg-white hover:bg-green-600 hover:text-white shadow-lg p-4 rounded-lg">
            <ActivityIcon className="mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Outdoor & Indoor Options</h3>
            <p className="text-gray-600 hover:text-white">Find the perfect pot for any environment.</p>
          </div>
          <div className="flex flex-col items-center text-center transition duration-500 ease-in-out bg-white hover:bg-green-600 hover:text-white shadow-lg p-4 rounded-lg">
            <NetworkIcon className="mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Community Workshops</h3>
            <p className="text-gray-600 hover:text-white">Join events to learn and share gardening experiences.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}


function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}


function NetworkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  )
}


function TargetIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}


function WebcamIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  )
}
