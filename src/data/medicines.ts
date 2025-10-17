import { Medicine } from '@/types/medicine';

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    price: 20,
    unit: 'strip',
    stock: 50
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    price: 35,
    unit: 'strip',
    stock: 30
  },
  {
    id: '3',
    name: 'Omeprazole 20mg',
    price: 45,
    unit: 'strip',
    stock: 0 // Out of stock
  },
  {
    id: '4',
    name: 'Metformin 500mg',
    price: 30,
    unit: 'strip',
    stock: 25
  },
  {
    id: '5',
    name: 'Losartan 50mg',
    price: 50,
    unit: 'strip',
    stock: 5 // Low stock
  },
  {
    id: '6',
    name: 'Atorvastatin 10mg',
    price: 55,
    unit: 'strip',
    stock: 40
  },
  {
    id: '7',
    name: 'Cetirizine 10mg',
    price: 15,
    unit: 'strip',
    stock: 0
  },
  {
    id: '8',
    name: 'Ibuprofen 400mg',
    price: 25,
    unit: 'strip',
    stock: 60
  },
  {
    id: '9',
    name: 'Ranitidine 150mg',
    price: 18,
    unit: 'strip',
    stock: 3 // Low stock
  },
  {
    id: '10',
    name: 'Ciprofloxacin 500mg',
    price: 60,
    unit: 'strip',
    stock: 20
  },
  {
    id: '11',
    name: 'Aspirin 75mg',
    price: 12,
    unit: 'strip',
    stock: 45
  },
  {
    id: '12',
    name: 'Vitamin D3 1000 IU',
    price: 40,
    unit: 'bottle',
    stock: 0 // Out of stock
  }
];

