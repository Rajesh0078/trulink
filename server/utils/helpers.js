const getAddressFromCoordinates = async (long, lat) => {
  const MAP_TILER_KEY = process.env.MAP_TILER_KEY;
  const res = await fetch(
    `https://api.maptiler.com/geocoding/${long},${lat}.json?key=${MAP_TILER_KEY}&language=en`,
  );
  if (res.ok) {
    const data = await res.json();
    const TYPES = ["subregion", "region", "country", "postal_code", "address"];
    const features = data.features || [];
    const map = new Map();

    for (const f of features) {
      const type = f?.place_type?.[0];
      if (TYPES.includes(type) && !map.has(type)) {
        map.set(type, f);
      }
    }

    return {
      city: map.get("subregion")?.text || null,
      state: map.get("region")?.text || null,
      country: map.get("country")?.text || null,
      postal_code: map.get("postal_code")?.text || null,
      area: map.get("address")?.text || null,
      formatted_address: map.get("address")?.place_name || null,
    };
  }
};

module.exports = { getAddressFromCoordinates };
