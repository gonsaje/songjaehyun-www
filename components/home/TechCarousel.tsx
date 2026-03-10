export default function TechCarousel() {
  const tech = [
    "react",
    "typescript",
    "java",
    "springboot",
    "nodejs",
    "docker",
    "aws",
    "postgresql",
  ];

  const loopedTech = [...tech, ...tech];

  return (
    <section className="mt-24 overflow-hidden">
      <div className="tech-fade-mask">
        <div className="tech-marquee flex w-max items-center gap-24">
          {loopedTech.map((t, index) => (
            <img
              key={`${t}-${index}`}
              src={`/logos/${t}.svg`}
              alt={t}
              className="h-20 w-auto shrink-0 opacity-60 grayscale transition duration-300 hover:-rotate-6 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}