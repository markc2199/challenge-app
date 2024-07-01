// components/FeatureSection.js

export default function FeatureSection() {
    const features = [
      {
        icon: "headphones",
        title: "Create and Manage Groups",
        description: `
        Easily create groups for your friends, family, or colleagues.
        Invite members and assign multiple owners for seamless group management.
        Track group activity and engagement in one place.
        `
      },
      {
        icon: "Dynamic Challenges",
        title: "Dynamic Challenges",
        description: `Create time-based challenges with multiple challenge items.
        Customize challenges to suit your group’s needs, whether it’s fitness goals, learning objectives, or fun activities.
        Set start and end dates to keep everyone on track.`
      },
      {
        icon: "Real-Time Leaderboards",
        title: "Real-Time Leaderboards",
        description: `Keep track of progress with real-time leaderboards.
        Submit daily scores for each challenge item and see your cumulative score grow.
        Recognize top performers with a clear and motivating ranking system.`
      }
    ];
  
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-12">Getting started has never been <span className="text-primary">easier.</span></h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-sm">
              <div className="mb-4">
                <div className="bg-primary text-white p-4 rounded-full">
                  <i className={`fas fa-${feature.icon} fa-2x`}></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }