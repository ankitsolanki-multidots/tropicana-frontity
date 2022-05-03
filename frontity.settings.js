const settings = {
  "name": "tropicana-frontity",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Test Frontity Blog",
      "description": "WordPress installation for Frontity development"
    }
  },
  "packages": [
    {
      "name": "tropicana-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "Nature",
              "/category/nature/"
            ],
            [
              "Travel",
              "/category/travel/"
            ],
            [
              "Japan",
              "/tag/japan/"
            ],
            [
              "About Us",
              "/about-us/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          },
          // beforeSSR: async ({ state }) => {
          //   console.log("========================================")
          //   // const {API_TMDB} = process.env
          //   const URL = `https://prj-tropicana.md-staging.com/wp-json/api/menu/2`
          //   const detailsMovie = await fetch(URL)
          //     .then( response => response.json() )
          //   console.log(detailsMovie)
          //   state.headerMenu = { detailsMovie }
          // }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://prj-tropicana.md-staging.com",
          "homepage": "home",
        },
        // beforeSSR: async ({actions}) => {
        //   await actions.source.fetch('https://prj-tropicana.md-staging.com/wp-json/api/menu/2') // this invokes our footerMenuHandler
        // }
        // beforeSSR: async ({ state }) => {
        //   console.log("========================================")
        //   // const {API_TMDB} = process.env
        //   const URL = `https://prj-tropicana.md-staging.com/wp-json/api/menu/2`
        //   const detailsMovie = await fetch(URL)
        //     .then( response => response.json() )
        //   console.log(detailsMovie)
        //   state.theme.headerMenu = { detailsMovie }
        // }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
