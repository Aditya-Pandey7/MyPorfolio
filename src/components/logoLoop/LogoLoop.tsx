import { stack as stackData } from "@/data/stack";
import "./index.css";

function LogoLoop() {
  return (
    <div className="logo-wrapper container mx-auto overflow-hidden my-20">
      <div className="logo-track">
        {[...stackData, ...stackData].map((data, index) => (
          <img
            key={index}
            src={data.icon}
            alt={data.title}
            loading="lazy"
            className={`logo ${data.icon === "shadcn-ui.svg" ? "logo-bg" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default LogoLoop;
