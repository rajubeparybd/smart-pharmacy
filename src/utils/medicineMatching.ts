import { medicines } from '@/data/medicines';
import { Medicine, CartItem } from '@/types/medicine';

interface ExtractedMedicine {
  name: string;
  dosage?: string;
  quantity?: number;
}

interface MatchResult {
  matched: CartItem[];
  unmatched: ExtractedMedicine[];
}

/**
 * Normalize medicine name for comparison
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove special characters
    .trim();
}

/**
 * Check if two medicine names match
 */
function isSimilar(name1: string, name2: string): boolean {
  const normalized1 = normalizeName(name1);
  const normalized2 = normalizeName(name2);
  
  // Exact match
  if (normalized1 === normalized2) return true;
  
  // Check if one contains the other (for variations like "Paracetamol" vs "Paracetamol 500mg")
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    return true;
  }
  
  // Extract base drug name (before any numbers)
  const base1 = normalized1.replace(/\d+.*/g, '').trim();
  const base2 = normalized2.replace(/\d+.*/g, '').trim();
  
  if (base1 && base2 && base1 === base2) return true;
  
  return false;
}

/**
 * Find matching medicine in database
 */
function findMatchingMedicine(extractedMedicine: ExtractedMedicine): Medicine | null {
  const searchName = extractedMedicine.dosage 
    ? `${extractedMedicine.name} ${extractedMedicine.dosage}`
    : extractedMedicine.name;

  // First try: exact match with dosage
  let match = medicines.find(med => 
    isSimilar(med.name, searchName)
  );

  // Second try: match just the medicine name
  if (!match) {
    match = medicines.find(med => 
      isSimilar(med.name, extractedMedicine.name)
    );
  }

  return match || null;
}

/**
 * Match extracted medicines with database and create cart items
 */
export function matchMedicinesWithDatabase(
  extractedMedicines: ExtractedMedicine[]
): MatchResult {
  const matched: CartItem[] = [];
  const unmatched: ExtractedMedicine[] = [];

  for (const extracted of extractedMedicines) {
    const medicine = findMatchingMedicine(extracted);
    
    if (medicine) {
      // Check stock availability
      const requestedQuantity = extracted.quantity || 1;
      const availableQuantity = Math.min(requestedQuantity, medicine.stock);
      
      if (availableQuantity > 0) {
        matched.push({
          medicine,
          quantity: availableQuantity
        });
      } else {
        // Medicine found but out of stock
        unmatched.push(extracted);
      }
    } else {
      // Medicine not found in database
      unmatched.push(extracted);
    }
  }

  return { matched, unmatched };
}

