'use client'

import { FlipWords } from "@/components/flip-words";
import FeatureSection from "./_components/feature-section";
import Link from "next/link";

export default function Home() {
  const words = ["Creating", "Managing", "Winning"];

  return (
    <div className="flex flex-col justify-center items-center px-4 space-y-2">
      <div className="h-[30rem] flex flex-col justify-center items-center">
        <div className="text-3xl md:text-4xl lg:text-6xl text-center text-slate-300 font-semibold">
          Your Ultimate Platform for 
          <FlipWords words={words} /> <br />
          Group Challenges
          <p className="text-base md:text-lg lg:text-xl text-center text-slate-400 font-light mt-6">
            Whether you're looking to get fit, learn something new, or just have fun with friends and family, Challenger is the perfect platform to keep you motivated.
          </p>
          <div className="flex justify-center pt-16">
            <Link href='/login'>
            <button className="btn btn-outline btn-primary px-12">
              <span className="flex items-center space-x-2">
                <img className="rounded-full" src="/logo/v2-challenger-logo.png" width={25} height={25}/>
                <span>Get Started</span>
              </span>
            </button>
            </Link>
            
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4 pt-8">
        <div className="flex flex-col justify-start w-full md:w-1/2">
          <h3 className="text-2xl md:text-5xl font-semibold text-center md:text-left md:pt-6">Stay Motivated with Leaderboards</h3>
          <p className="mt-4 text-center md:text-left md:text-xl">
            Leaderboards are a fun and engaging way to keep you motivated. Compete with friends and see who can achieve the highest scores!
          </p>
        </div>
        <div className="flex justify-center w-full md:w-1/2">
          <img src="/marketing/lb-screenshot.png" alt="Leaderboard Screenshot" className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="w-full pt-36">
        <FeatureSection />
      </div>
    </div>
  );
}