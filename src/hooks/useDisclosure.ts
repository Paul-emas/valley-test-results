"use client";
import { useState, useCallback } from "react";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type DisclosureFn = {
  isOpen: boolean;
  isBusy: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setIsBusy: (busy: boolean) => void;
};

type CustomDisclosureFn<T extends string> = {
  [K in `${Uncapitalize<T>}IsOpen`]: boolean;
} & {
  [K in `${Uncapitalize<T>}IsBusy`]: boolean;
} & {
  [K in `onClose${Capitalize<T>}`]: () => void;
} & {
  [K in `onOpen${Capitalize<T>}`]: () => void;
} & {
  [K in `onToggle${Capitalize<T>}`]: () => void;
} & {
  [K in `set${Capitalize<T>}IsBusy`]: (busy: boolean) => void;
};

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function uncapitalizeFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// THESE ARE OVERLOADS
export function useDisclosure(): Prettify<DisclosureFn>;
export function useDisclosure<T extends string>(
  name: T
): Prettify<CustomDisclosureFn<T>>;

// THIS IS THE FUNCTION BODY
export function useDisclosure(name?: string) {
  if (name && typeof name !== "string") {
    throw new Error("Disclosure name must be a string, or undefined");
  }
  if (typeof name === "string" && name.trim() === "") {
    throw new Error("Empty string is not allowed as a disclosure name.");
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusyState] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const setIsBusy = useCallback((busy: boolean) => {
    setIsBusyState(busy);
  }, []);

  if (!name) {
    return {
      isOpen,
      isBusy,
      onOpen,
      onClose,
      onToggle,
      setIsBusy,
    };
  } else {
    const capitalized = capitalizeFirstLetter(name);
    const uncapitalized = uncapitalizeFirstLetter(name);
    return {
      [`${uncapitalized}IsOpen`]: isOpen,
      [`${uncapitalized}IsBusy`]: isBusy,
      [`onOpen${capitalized}`]: onOpen,
      [`onClose${capitalized}`]: onClose,
      [`onToggle${capitalized}`]: onToggle,
      [`set${capitalized}IsBusy`]: setIsBusy,
    };
  }
}
