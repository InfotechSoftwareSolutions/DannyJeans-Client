import React from "react";

const CustomStudio = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold">Custom Studio</h1>
      <p className="text-center text-muted">
        Design & create bespoke Pepe Jeans pieces with our in-store Custom
        Artists.
      </p>

      {/* Custom Tools Section */}
      <div className="row my-4">
        <div className="col-md-6 justify-content">
          <img src="/CS1.png" alt="Custom Studio" />
          <img src="/custom-logo.png" alt="Custom Studio" />
        </div>
      </div>

      <div className="row text-center">
        {[
          {
            name: "Laser",
            desc: "Laser cut designs to make your piece pop!",
            img: "/patches.jpg",
          },
          {
            name: "Rips",
            desc: "Distress your denim how you like it.",
            img: "/Rips.jpg",
          },
          {
            name: "Studs",
            desc: "Punk inspiration for a rebellious look.",
            img: "/studs.jpg",
          },
          {
            name: "Cuts",
            desc: "Give your look a raw edge.",
            img: "/cuts.jpg",
          },
          {
            name: "Patches",
            desc: "Create it, Stick it, Wear it.",
            img: "/patches.jpg",
          },
          {
            name: "Colour",
            desc: "Don't let your look fade.",
            img: "/colour.jpg",
          },
        ].map((tool, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm p-3">
              <img src={tool.img} alt={tool.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{tool.name}</h5>
                <p className="card-text">{tool.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customization Levels */}
      <h3 className="text-center my-5">Choose Your Level of Customization</h3>
      <div className="row">
        {[
          {
            title: "The Experience",
            desc: "Choose one tool: Stud, Rip, Laser, or Colour.",
          },
          {
            title: "The Club",
            desc: "Up to 3 tools: Choose from Stud, Rip, Laser, or Colour.",
          },
          {
            title: "The Total HandCraft",
            desc: "Your Pepe. Your Rules. Complete customization with no limits.",
          },
        ].map((level, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title">{level.title}</h5>
                <p className="card-text">{level.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomStudio;

