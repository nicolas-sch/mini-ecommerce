export async function getCategories() {
  try {
    const res = await fetch(
      "https://67dbfb6d1fd9e43fe476b875.mockapi.io/api/v1/categories"
    );

    if (!res.ok) {
      throw new Error("No se pudo buscar categorías");
    }

    return await res.json();
  } catch (error) {
    console.error("Error al buscar categorías:", error);
    throw new Error("No se pudieron cargar las categorías. Por favor inténtalo de nuevo.");
  }
}

export async function getCategoryProducts(slug) {
    try {
      const res = await fetch(
        `https://67dbfb6d1fd9e43fe476b875.mockapi.io/api/v1/${slug}`
      );
  
      if (!res.ok) {
        if (res.status === 404) {
          return [];
        }
        throw new Error(
          `Error al buscar productos: ${res.status} ${res.statusText}`
        );
      }
  
      return await res.json();
    } catch (error) {
      console.error("Error al buscar productos:", error);
      throw new Error("No se pudieron cargar los productos. Inténtelo de nuevo más tarde.");
    }
  }

export async function getProductDetails(slugCategory, slugProduct) {
  try {
    const res = await fetch(
      `https://67dbfb6d1fd9e43fe476b875.mockapi.io/api/v1/${slugCategory}/${slugProduct}`
    );

    if (!res.ok) {
      throw new Error("No se pudieron recuperar los detalles del producto");
    }

    return await res.json();
  } catch (error) {
    console.error("Error al buscar detalles del produto:", error);
    throw new Error(
      "No se pudieronm cargar los detalles del producto. Inténtelo de nuevo más tarde."
    );
  }
}
