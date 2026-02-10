import { getTechLogos } from "@/lib/utils";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map({ tech, url },ind)=><div className="relative group bg-dark-300 rounded-full p-2 flex-center">
        <span>
          </span></div>}
    </div>
  );
};
export default DisplayTechIcons;
