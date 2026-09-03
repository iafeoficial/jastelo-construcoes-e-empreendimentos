(function () {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("id") || "turu";
  const properties = window.JASTELO_PROPERTIES || {};
  const property = properties[key] || properties.turu;
  if (!property) return;

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  document.title = `${property.title} | Jastelo`;
  setText("property-index", `[ ${property.index} ]`);
  setText("property-code", property.code);
  setText("property-title", property.title);
  const title = document.getElementById("property-title");
  if (title && window.matchMedia("(max-width: 640px)").matches) {
    const mobileTitles = {
      turu: "Residência<br>Térrea Alto do Turu",
      "turu-sem-piscina": "Residência<br>Térrea Alto do Turu",
      aracagy: "Residência<br>Térrea Araçagy",
      "planta-sem-piscina": "Residência<br>Alto do Turu<br>na planta",
      "planta-com-piscina": "Residência<br>Alto do Turu<br>na planta",
      duplex: "Duplex Araçagy<br>Praia Azul"
    };
    title.innerHTML = mobileTitles[key] || property.title;
  }
  setText("property-status", property.status);
  setText("property-area", property.area);
  setText("property-rooms", property.rooms);
  setText("property-bathrooms", property.bathrooms);
  setText("property-garage", property.garage);
  setText("property-year", property.year);
  setText("property-price", property.price);
  setText("property-location", property.location);
  setText("property-description", property.description);

  const mainImage = document.getElementById("property-main-image");
  mainImage.src = property.images[0];
  mainImage.alt = property.title;

  const previewImage = document.getElementById("property-preview-image");
  previewImage.src = property.images[1] || property.images[0];
  previewImage.alt = `Outro ângulo de ${property.title}`;

  const gallery = document.getElementById("property-gallery");
  property.images.forEach((source, index) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = source;
    image.alt = `${property.title} — imagem ${index + 1}`;
    image.loading = index > 1 ? "lazy" : "eager";
    figure.appendChild(image);
    gallery.appendChild(figure);
  });

  const highlights = document.getElementById("property-highlights");
  property.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    highlights.appendChild(item);
  });

  const map = document.getElementById("property-map");
  map.src = `https://www.google.com/maps?q=${encodeURIComponent(property.mapQuery)}&output=embed`;
  map.title = `Mapa de ${property.location}`;

  const whatsappText = `Olá! Gostaria de receber mais informações sobre ${property.title} (${property.code}).`;
  document.querySelectorAll("[data-property-contact]").forEach((link) => {
    link.href = `https://wa.me/559870230832?text=${encodeURIComponent(whatsappText)}`;
  });

  document.querySelectorAll("[data-gallery-link]").forEach((link) => {
    link.addEventListener("click", () => document.getElementById("galeria").scrollIntoView({ behavior: "smooth" }));
  });
})();
