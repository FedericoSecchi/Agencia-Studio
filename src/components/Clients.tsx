import { brandsData } from "@/data/brands";

const Clients = () => {
  // Duplicate brands for seamless marquee
  const marqueeBrands = [...brandsData, ...brandsData, ...brandsData];

  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-20" data-animate="fade-up">
          <h2 className="headline-medium mb-4">
            Brands We Work With
          </h2>
          <p className="body-large text-muted-foreground max-w-xl mx-auto">
            A selection of clients, collaborators and real projects we've been involved in.
          </p>
        </div>

        {/* Brands Marquee */}
        <div className="overflow-hidden">
          <div className="flex gap-16 marquee-track whitespace-nowrap">
            {marqueeBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-20 px-8 group"
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 md:h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <div className="text-center">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
