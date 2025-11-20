// Fix: Added React to the import statement to resolve the missing namespace error.
import React, { SVGProps } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
}

export interface FormData {
  fullName: string;
  email: string;
  service: string;
  description: string;
  file?: File;
}