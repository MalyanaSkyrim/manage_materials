import { Material, Provider, Sector } from '@prisma/client'
import React from 'react'

export type AppMaterial = Material & { provider: Provider; sector: Sector }

interface Props {
  material: AppMaterial
}

const MaterialsItem = ({ material }: Props) => {
  return (
    <div className="space-x-1 shadow-lg border border-slate-200 rounded p-4">
      <h3 className="text-slate-700 font-semibold">{material.name}</h3>
      <div className="bg-slate-50 p-2 rounded">
        <h4>Provider</h4>
        <p>Name: {material.provider.name}</p>
        <p>Address: {material.provider.address}</p>
        <p>Phone: {material.provider.phone}</p>
        <p>Email: {material.provider.email}</p>
        <p>website: {material.provider.website}</p>
      </div>
    </div>
  )
}

export const MaterialItemSkeleton = () => {
  return (
    <div className="animate-pulse flex">
      <div className="h-2.5 w-3 space-x-2 rounded-lg bg-gray-300" />
      <div className="bg-slate-50 p-2 rounded">
        <div className="h-2.5 w-4 space-x-2 rounded-lg bg-gray-300" />
        <div className="h-2.5 w-7 space-x-2 rounded-lg bg-gray-300" />
        <div className="h-2.5 w-7 space-x-2 rounded-lg bg-gray-300" />
        <div className="h-2.5 w-7 space-x-2 rounded-lg bg-gray-300" />
        <div className="h-2.5 w-7 space-x-2 rounded-lg bg-gray-300" />
        <div className="h-2.5 w-7 space-x-2 rounded-lg bg-gray-300" />
      </div>
    </div>
  )
}

export default MaterialsItem
