const displayHome = async () => {
    const work = await getWorks();
  
    createGallery(allWorks);
  }
  
  displayHome ();

  // Call the functions sequentially
async function fetchDataAndCreateGallery() {

    
    await getWorks();
    await getCategories();
    createGallery(allWorks);
  }
  
  // Call the main function to fetch data and create the gallery
  fetchDataAndCreateGallery();