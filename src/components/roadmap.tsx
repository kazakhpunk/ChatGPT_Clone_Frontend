interface RoadmapProps {
  title: string;
  details: string[];
}

const Roadmap = ({ title, details }: RoadmapProps) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-full">
      {details.map((detail, index) => (
        <p key={index} className="text-lg">
          {detail}
        </p>
      ))}
    </div>
  );
};

export default Roadmap;
