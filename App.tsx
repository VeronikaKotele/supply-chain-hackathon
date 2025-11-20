import React from "react";
import { Navbar } from "./components/Navbar";
import { HeroPanel } from "./components/HeroPanel";
import { SummaryCards } from "./components/SummaryCards";
import { EntriesTable } from "./components/EntriesTable";
import { EarthMap } from "./components/EarthMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="px-6 py-8 max-w-[1400px] mx-auto">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <HeroPanel />
            <SummaryCards />
            <EntriesTable />
          </TabsContent>

          <TabsContent value="map" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Earth Map</h2>
              <EarthMap />
              <p className="text-gray-600 mt-4">
                Use your mouse to rotate and zoom the 3D Earth model. Scroll to zoom in/out.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}