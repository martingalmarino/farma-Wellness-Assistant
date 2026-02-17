'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products } from '@/data/products';
import { eventLogger } from '@/lib/eventLog';

export interface CartItem {
  sku: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (sku: string, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('farmaquiero_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('farmaquiero_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart:', e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (sku: string, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.sku === sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { sku, quantity }];
    });

    const product = products.find((p) => p.sku === sku);
    eventLogger.log('add_to_cart', { sku, quantity, productName: product?.name });
  };

  const removeItem = (sku: string) => {
    setItems((prev) => prev.filter((item) => item.sku !== sku));
    eventLogger.log('remove_from_cart', { sku });
  };

  const updateQuantity = (sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(sku);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    eventLogger.log('clear_cart');
  };

  const getTotal = (): number => {
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.sku === item.sku);
      return sum + (product?.priceArs || 0) * item.quantity;
    }, 0);
  };

  const getItemCount = (): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
