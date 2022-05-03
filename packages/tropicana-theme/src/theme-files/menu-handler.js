export const footerMenuHandler = {
    name: "footerMenu",
    priority: 10,
    pattern: "menus/:slug",
    func: async ({ route, params, state, libraries, force }) => {
  
      console.log(params.slug);
      console.log("Route: " + route);
  
      const { slug } = params;
      console.log("Slug: " + slug);
      // 1. fetch the data you want from the endpoint page
      const response = await libraries.source.api.get({ 
        endpoint: `/api/menu/${slug}`
      });
  
      // this is where we get the actual data
      // 2. get our menu object in json format
      const menu = await response.json();
  
      console.log(menu);
      if(params.slug == 2) {
        state.theme.headerMenu = menu;
      }
      if(params.slug == 3) {
        state.theme.footerMenu = menu;
      }
      
      // this is a reference to the state object for this link currently, get this and it wil be the target object which
      // we assign our data from items to in object.assign
      // 3. add data to source
    //   const currentPageData = state.source.data[route];
  
    //   Object.assign(currentPageData, {
    //     slug,
    //     items: menu.title, // @ni.bonev figured this one out because the "items" property contains an array of items
    //     isMenu: true
    //   });
  
    }
  };