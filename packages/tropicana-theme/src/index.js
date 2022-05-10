// const Root = () => {
//   return (
//     <>
//       You can edit your package in:
//       <pre>packages/tropicana-theme/src/index.js</pre>
//     </>
//   );
// };

// export default {
//   name: "tropicana-theme",
//   roots: {
//     tropicanaTheme: Root
//   },
//   state: {
//     tropicanaTheme: {}
//   },
//   actions: {
//     tropicanaTheme: {}
//   }
// }; 

import Root from "./theme-files";
import { footerMenuHandler } from "./theme-files/menu-handler";
import link from "@frontity/html2react/processors/link";

const tropicana = {
  name: "tropicana-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {
      autoPrefetch: "in-view",
      menu: [],
      isMenuOpen: true
    }
  },
  actions: {
    theme: {
      beforeSSR: async ({ state, actions }) => {
        await actions.source.fetch(`menus/2`);
        await actions.source.fetch(`menus/3`);
      },
    }
  },
  libraries: {
    source: {
      handlers: [footerMenuHandler],
      
    },
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [link],
    },
  } 
};

export default tropicana
