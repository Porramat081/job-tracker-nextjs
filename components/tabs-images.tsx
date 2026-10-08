"use client";

import { Button } from "./ui/button";
import { ActivateTab } from "@/app/page";
import { useState } from "react";
import Image from "next/image";

export default function TabsImages() {
  const [activeTab, setActiveTab] = useState(ActivateTab.organize);
  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8">
            <Button
              onClick={() => setActiveTab(ActivateTab.organize)}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === ActivateTab.organize ? "bg-primary" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Organize Application
            </Button>
            <Button
              onClick={() => setActiveTab(ActivateTab.hired)}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === ActivateTab.hired ? "bg-primary" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab(ActivateTab.managed)}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === ActivateTab.managed ? "bg-primary" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Manage Boards
            </Button>
          </div>

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {activeTab === ActivateTab.organize && (
              <Image
                src="/hero-section/hero1.png"
                alt="Organize Application"
                width={1200}
                height={800}
              ></Image>
            )}

            {activeTab === ActivateTab.hired && (
              <Image
                src="/hero-section/hero2.png"
                alt="Get Hired"
                width={1200}
                height={800}
              ></Image>
            )}

            {activeTab === ActivateTab.managed && (
              <Image
                src="/hero-section/hero3.png"
                alt="Manage Boards"
                width={1200}
                height={800}
              ></Image>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
