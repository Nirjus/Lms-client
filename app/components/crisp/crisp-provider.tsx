"use client"
import React, { useEffect } from 'react'

import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
      Crisp.configure("86d5bb0d-fd5c-4298-ace7-b39ed8c9ca71");
    }, []);
  
    return null;
  };

type Props = {}

const CrispProvider = (props: Props) => {
  return (
    <CrispChat />
  )
}

export default CrispProvider