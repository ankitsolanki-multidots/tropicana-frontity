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

const tropicana = {
  name: "tropicana-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {
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
    }
  }
};

export default tropicana
