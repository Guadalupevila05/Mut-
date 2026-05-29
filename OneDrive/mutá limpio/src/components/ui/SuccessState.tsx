import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2Icon } from 'lucide-react';
import { Button } from './Button';

export const SuccessState = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2Icon className="w-10 h-10 text-rose-500" />
      </div>
      
      <h1 className="text-2xl font-bold text-black mb-2">¡Todo listo!</h1>
      <p className="text-gray-600 mb-8 max-w-sm text-center">
        La acción se completó correctamente.
      </p>

      <Button onClick={() => navigate('/')} className="w-full max-w-[200px]">
        Volver al inicio
      </Button>
    </div>
  );
};