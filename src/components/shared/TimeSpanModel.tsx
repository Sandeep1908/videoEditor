// components/Modal.tsx

import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '@/store';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?:React.ReactNode
  timestamp:string
  index:number
 
}

const TimeSpanModel: React.FC<ModalProps> = ({ isOpen, onClose, children ,timestamp,index }) => {
    
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!isOpen);
  const store=useContext(StoreContext)
  const maxTime=store.maxTime
  

  const handleSubmit = () => {
   
    const timestampParts = timestamp.split(':');
    const minutes = parseInt(timestampParts[0], 10) || 0;
    const seconds = parseInt(timestampParts[1], 10) || 0;
    const milliseconds = parseInt(timestampParts[2], 10) || 0;

    const totalMilliseconds = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
    
    if (totalMilliseconds > maxTime) {
        alert("Timestamp exceeds max time limit (30 seconds). Please enter a valid timestamp.");
      } 
    
      store.setTimeSpan(totalMilliseconds)
      store.addImage(index)
      
    
 

    closeModal();
  };

   
  const closeModal = () => {
    setIsModalOpen(prev=>!prev);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
           
            <div className="relative flex flex-col w-96 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
       
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Time</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{children}</div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal}
                
                >
                  Close
                </button>

                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      )}
    </>
  );
};

export default TimeSpanModel;
