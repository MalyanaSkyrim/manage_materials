import { Material, Provider, Sector } from '@prisma/client'
import React from 'react'

export type AppMaterial = Material & { provider: Provider; sector: Sector }

interface Props {
  material: AppMaterial
}

const MaterialsItem = ({ material }: Props) => {
  return (
    <div className="space-x-1 space-y-2 shadow-lg border border-slate-200 rounded p-4 bg-slate-100">
      <h2 className="text-slate-700 pl-2 font-bold">{material.name}</h2>
      <div className="bg-slate-200 p-2 rounded divide-y divide-slate-300">
        <h3 className="text-slate-700 font-semibold">Provider</h3>
        <div className="py-1">
          <p>Name: {material.provider.name}</p>
          <p>Address: {material.provider.address}</p>
          <p>Phone: {material.provider.phone}</p>
          <p>Email: {material.provider.email}</p>
          <p>website: {material.provider.website}</p>
        </div>
      </div>
    </div>
  )
}

export const MaterialItemSkeleton = () => {
  return (
    <div className="animate-pulse space-x-1 space-y-3 shadow-lg border border-slate-200 rounded p-4 bg-slate-100">
      <div className="ml-2 h-2.5 w-14 space-x-2 rounded-lg bg-gray-400 mb-2" />
      <div className="bg-slate-200 p-2 py-4 rounded divide-y divide-slate-300">
        <div className="h-2.5 w-14 space-x-2 rounded-lg bg-gray-400 mb-2" />
        <div className="py-1 pt-3 space-y-3">
          <div className="h-2.5 w-36 space-x-2 rounded-lg bg-gray-400" />
          <div className="h-2.5 w-36 space-x-2 rounded-lg bg-gray-400" />
          <div className="h-2.5 w-36 space-x-2 rounded-lg bg-gray-400" />
          <div className="h-2.5 w-36 space-x-2 rounded-lg bg-gray-400" />
          <div className="h-2.5 w-36 space-x-2 rounded-lg bg-gray-400" />
        </div>
      </div>
    </div>
  )
}

export default MaterialsItem
