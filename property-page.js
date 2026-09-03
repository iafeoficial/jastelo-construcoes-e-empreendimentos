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

  const images = property.images.map((image) => typeof image === "string" ? { src: image, area: "Ambientes", label: property.title } : image);
  const mainImage = document.getElementById("property-main-image");
  mainImage.src = images[0].src;
  mainImage.alt = property.title;

  const previewImage = document.getElementById("property-preview-image");
  previewImage.src = (images[1] || images[0]).src;
  previewImage.alt = `Outro ângulo de ${property.title}`;

  const gallery = document.getElementById("property-gallery");
  images.slice(0, 3).forEach((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-tile";
    button.setAttribute("aria-label", `Abrir foto: ${photo.label}`);
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.label;
    image.loading = index > 0 ? "lazy" : "eager";
    const label = document.createElement("span");
    label.innerHTML = `<small>${photo.area}</small>${photo.label}<b>↗</b>`;
    button.append(image, label);
    button.addEventListener("click", () => openGallery(index));
    gallery.appendChild(button);
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

  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = document.getElementById("gallery-main-image");
  const categoryList = document.getElementById("gallery-categories");
  const thumbnailList = document.getElementById("gallery-thumbnails");
  const previousButton = document.getElementById("gallery-previous");
  const nextButton = document.getElementById("gallery-next");
  let activeIndex = 0;
  let activeCategory = "Todos";

  const visibleIndexes = () => images.map((_, index) => index).filter((index) => activeCategory === "Todos" || images[index].area === activeCategory);

  const renderCategories = () => {
    categoryList.replaceChildren();
    ["Todos", ...new Set(images.map((image) => image.area))].forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.classList.toggle("active", category === activeCategory);
      button.addEventListener("click", () => {
        activeCategory = category;
        activeIndex = visibleIndexes()[0];
        renderCategories();
        renderGallery();
      });
      categoryList.appendChild(button);
    });
  };

  const renderGallery = () => {
    const photo = images[activeIndex];
    const indexes = visibleIndexes();
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.label;
    setText("gallery-area", photo.area);
    setText("gallery-caption", photo.label);
    setText("gallery-counter", `${indexes.indexOf(activeIndex) + 1} / ${indexes.length}`);
    previousButton.disabled = indexes.length < 2;
    nextButton.disabled = indexes.length < 2;
    thumbnailList.replaceChildren();
    indexes.forEach((index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.classList.toggle("active", index === activeIndex);
      button.setAttribute("aria-label", `Ver ${images[index].label}`);
      const image = document.createElement("img");
      image.src = images[index].src;
      image.alt = "";
      button.appendChild(image);
      button.addEventListener("click", () => {
        activeIndex = index;
        renderGallery();
      });
      thumbnailList.appendChild(button);
    });
  };

  const moveGallery = (direction) => {
    const indexes = visibleIndexes();
    const position = indexes.indexOf(activeIndex);
    activeIndex = indexes[(position + direction + indexes.length) % indexes.length];
    renderGallery();
  };

  function openGallery(index = 0) {
    activeCategory = "Todos";
    activeIndex = index;
    renderCategories();
    renderGallery();
    lightbox.showModal();
  }

  document.querySelectorAll("[data-gallery-link]").forEach((button) => button.addEventListener("click", () => openGallery(0)));
  document.getElementById("gallery-close").addEventListener("click", () => lightbox.close());
  previousButton.addEventListener("click", () => moveGallery(-1));
  nextButton.addEventListener("click", () => moveGallery(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "ArrowLeft") moveGallery(-1);
    if (event.key === "ArrowRight") moveGallery(1);
  });
  if (window.location.hash === "#galeria") {
    window.setTimeout(() => document.getElementById("galeria").scrollIntoView(), 80);
  }
  if (params.get("galeria") === "1") openGallery(0);
})();
