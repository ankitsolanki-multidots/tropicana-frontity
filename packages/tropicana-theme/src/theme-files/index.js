import React from "react";
import { connect, Global, css, styled, Head } from "frontity"
import Switch from "@frontity/components/switch";
import Link from "./link"
import List from "./list"
import Post from "./post"
import Page from "./page"
import Loading from "./loading"
import { useEffect } from "react";



// Fonts Load
import ArboriaThin from "./fonts/Arboria-Thin.woff2";
import ArboriaThinItalic from "./fonts/Arboria-ThinItalic.woff2";
import ArboriaLight from "./fonts/Arboria-Light.woff2";
import ArboriaLightItalic from "./fonts/Arboria-LightItalic.woff2";
import ArboriaMedium from "./fonts/Arboria-Medium.woff2";
import ArboriaMediumItalic from "./fonts/Arboria-MediumItalic.woff2";
import ArboriaBold from "./fonts/Arboria-Bold.woff2";
import ArboriaBoldItalic from "./fonts/Arboria-BoldItalic.woff2";
import ArboriaBook from "./fonts/Arboria-Book.woff2";
import ArboriaBookItalic from "./fonts/Arboria-BookItalic.woff2";
import ArboriaBlack from "./fonts/Arboria-Black.woff2";
import ArboriaBlackItalic from "./fonts/Arboria-BlackItalic.woff2";
import BeyondInfinity from "./fonts/BeyondInfinity.woff2";

import externalCSS from './common.css';
import headerExternalCss from './header.css';
import footerExternalCss from './footer.css';
import animationExternalCss from './animate.css';
import aboutExternalCss from './about.css';
import brandExternalCss from './brands.css';
import brandLogoExternalCss from './brand-logo.css';
import newsExternalCss from './news.css';
import contactExternalCss from './contact.css';
import contactformExternalCss from './contact-form.css';
import styleExternalCss from './style.min.css';
import mediaExternalCss from './media.css';
import externalleafImage from './images/leaf.png'
import externalleafBorderImage from './images/leaf-border.png'
import $ from 'jquery';
import fetch from 'cross-fetch';
import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider,
   useQuery,
   gql
 } from "@apollo/client";
 import 'cross-fetch/polyfill';


// const client = new ApolloClient({
//    uri: "https://prj-frontity-tro.md-staging.com/graphql",
//  });

 const client = new ApolloClient({
   uri: 'https://prj-frontity-tro.md-staging.com/graphql',
   cache: new InMemoryCache()
 });

 const GET_Menus = gql`
  query GETMenus {
   menus {
     nodes {
       id
       databaseId
       name
       menuItems {
         edges {
           node {
             id
             databaseId
             label
             parentId
             path
           }
         }
       }
     }
   }
 }
`;

const Root = ({ state, actions }) => {

  const data = state.source.get(state.router.link)
useEffect(() => {
   client
  .query({
    query: GET_Menus
  })
  .then(result => {
     state.theme.allenus = result;
     result.data.menus.nodes.map((allMenu) => {
      if(allMenu.name == "Main Menu") {
         state.theme.HeaderMenuGraph = allMenu;
      }
   })
     console.log(result)
}).catch(err => console.log(err));
   $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 1500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });


    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        var lastSection = $('.last-section').position().top;
        if( (lastSection + 5) <= scrollPos ){
            $('body').addClass('stop-scroll');
        }else{
            $('body').removeClass('stop-scroll');
        }
        $('#fp-nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#fp-nav ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }
   $(document).ready(function() {
      var maxHeight = 0;
      $(".news_wrapper .news_column").each(function() {
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).height();
        }
      }).height(maxHeight);
    });
   (function () {
      const siteNavigation = document.getElementById('site-navigation');
   
      // Return early if the navigation don't exist.
      if (!siteNavigation) {
         return;
      }
   
      const button = siteNavigation.getElementsByTagName('button')[0];
   
      // Return early if the button don't exist.
      if ('undefined' === typeof button) {
         return;
      }
   
      const menu = siteNavigation.getElementsByTagName('ul')[0];
   
      // Hide menu toggle button if menu is empty and return early.
      if ('undefined' === typeof menu) {
         button.style.display = 'none';
         return;
      }
   
      if (!menu.classList.contains('nav-menu')) {
         menu.classList.add('nav-menu');
      }
   
      // Toggle the .toggled class and the aria-expanded value each time the button is clicked.
      button.addEventListener('click', function () {
         siteNavigation.classList.toggle('toggled');
   
         if (button.getAttribute('aria-expanded') === 'true') {
            button.setAttribute('aria-expanded', 'false');
         } else {
            button.setAttribute('aria-expanded', 'true');
         }
      });
   
      // Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
      document.addEventListener('click', function (event) {
         const isClickInside = siteNavigation.contains(event.target);
   
         if (!isClickInside) {
            siteNavigation.classList.remove('toggled');
            button.setAttribute('aria-expanded', 'false');
         }
      });
   
      // Get all the link elements within the menu.
      const links = menu.getElementsByTagName('a');
   
      // Get all the link elements with children within the menu.
      const linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');
   
      // Toggle focus each time a menu link is focused or blurred.
      for (const link of links) {
         link.addEventListener('focus', toggleFocus, true);
         link.addEventListener('blur', toggleFocus, true);
      }
   
      // Toggle focus each time a menu link with children receive a touch event.
      for (const link of linksWithChildren) {
         link.addEventListener('touchstart', toggleFocus, false);
      }
   
      /**
       * Sets or removes .focus class on an element.
       */
      function toggleFocus() {
         if (event.type === 'focus' || event.type === 'blur') {
            let self = this;
            // Move up through the ancestors of the current link until we hit .nav-menu.
            while (!self.classList.contains('nav-menu')) {
               // On li elements toggle the class .focus.
               if ('li' === self.tagName.toLowerCase()) {
                  self.classList.toggle('focus');
               }
               self = self.parentNode;
            }
         }
   
         if (event.type === 'touchstart') {
            const menuItem = this.parentNode;
            event.preventDefault();
            for (const link of menuItem.parentNode.children) {
               if (menuItem !== link) {
                  link.classList.remove('focus');
               }
            }
            menuItem.classList.toggle('focus');
         }
      }
   }());
 }, []);
  return (
    <>
      <Head>
        <title>Tropicana</title>
        <meta name="description" content="An introduction to creating a theme with Frontity" />
        <script type="text/javascript" src="./js/fullpage-custom.js"></script>
      </Head>
      <Global styles={css`

        @font-face{font-family:'Arboria';src:url(${ArboriaThin}) format('woff2');font-weight:100;font-style:normal;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaThinItalic}) format('woff2');font-weight:100;font-style:italic;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaLight}) format('woff2');font-weight:300;font-style:normal;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaLightItalic}) format('woff2');font-weight:300;font-style:italic;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaMedium}) format('woff2');font-weight:500;font-style:normal;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaMediumItalic}) format('woff2');font-weight:500;font-style:italic;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaBold}) format('woff2');font-weight:700;font-style:normal;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaBoldItalic}) format('woff2');font-weight:700;font-style:italic;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaBook}) format('woff2');font-weight:800;font-style:normal;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaBookItalic}) format('woff2');font-weight:800;font-style:italic;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaBlack}) format('woff2');font-weight:900;font-style:normal;font-display:swap}
        @font-face{font-family:'Arboria';src:url(${ArboriaBlackItalic}) format('woff2');font-weight:900;font-style:italic;font-display:swap}
        @font-face{font-family:'Beyond-Infinity';src:url(${BeyondInfinity}) format('woff2');font-weight:400;font-style:normal;font-display:swap}


        #fp-nav ul li a.active span, .fp-slidesNav ul li a.active span, #fp-nav ul li:hover a.active span, .fp-slidesNav ul li:hover a.active span{background:transparent url(${externalleafImage}) center center no-repeat;background-size:21px}
        #fp-nav ul li a span:hover, .fp-slidesNav ul li a span:hover{background:transparent url(${externalleafImage}) center center no-repeat;background-size:21px}
        #fp-nav ul li a span, .fp-slidesNav ul li a span{border-radius:50%;position:absolute;z-index:1;height:24px;width:24px;background:transparent url(${externalleafBorderImage}) center center no-repeat;background-size:18px;left:8px;top:-4px;margin:0;-o-transition:all 0.25s ease 0s;transition:all 0.25s ease 0s;-webkit-transition:all 0.25s ease 0s;-moz-transition:all 0.25s ease 0s}
      `} />
      <Global styles={css(externalCSS)} />
      <Global styles={css(headerExternalCss)} />
      <Global styles={css(footerExternalCss)} />
      <Global styles={css(animationExternalCss)} />
      <Global styles={css(aboutExternalCss)} />
      <Global styles={css(brandExternalCss)} />
      <Global styles={css(brandLogoExternalCss)} />
      <Global styles={css(newsExternalCss)} />
      <Global styles={css(contactExternalCss)} />
      <Global styles={css(contactformExternalCss)} />
      <Global styles={css(styleExternalCss)} />
      <Global styles={css(mediaExternalCss)} />
      


<header id="masthead" class="site-header">
   <div class="container">
      <div class="header-raw">
         <div class="site-branding">
            <Link href="/" class="custom-logo-link" rel="home" aria-current="page">
            <img src="https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-408x116.webp" class="main_logo_header" alt="Tropicana Brands" srcset="https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-408x116.webp 408w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-300x85.webp 300w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-768x218.webp 768w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-150x43.webp 150w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-90x26.webp 90w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group.webp 1000w" sizes="(max-width: 408px) 100vw, 408px" width="408" height="116" /></Link>
         </div>
         <nav id="site-navigation" class="main-navigation">
            <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
            <span class="screen-reader-text">Mobile Menu</span>
            <span class="top"></span>
            <span class="middle"></span>
            <span class="bottom"></span>
            </button>
            <div class="menu-main-menu-container">
               <ul id="primary-menu" class="menu nav-menu">
                  {/* {state.theme.headerMenu.map((item) => {
                     return (
                        <li id={"menu-item-" + item.ID} class={"menu-item menu-item-type-post_type menu-item-object-page menu-item-" + item.ID}><Link href={item.url}>{item.title}</Link></li>
                     )
                  })} */}
                  {
                     state.theme.HeaderMenuGraph && state.theme.HeaderMenuGraph.menuItems.edges.map((item) => {
                        return (
                           <li id={"menu-item-" + item.node.databaseId} class={"menu-item menu-item-type-post_type menu-item-object-page menu-item-" + item.node.databaseId}><Link href={item.node.path}>{item.node.label}</Link></li>
                        )
                     })
                  }
                  {/* <li id="menu-item-31" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-31"><Link href="/about-us/">About Us</Link></li>
                  <li id="menu-item-32" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-32"><Link href="/brands/">Brands</Link></li>
                  <li id="menu-item-34" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-34"><Link href="/news/">News</Link></li>
                  <li id="menu-item-1352" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1352"><Link href="/careers/">Careers</Link></li>
                  <li id="menu-item-33" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-33"><Link href="/contact/">Contact</Link></li> */}
               </ul>
            </div>
         </nav>
      </div>
   </div>
</header>



      <Main>
         <Switch>
            <Loading when={data.isFetching} />
            <List when={data.isArchive} />
            <Post when={data.isPost} />
            <Page when={data.isPage} />
         </Switch>
      </Main>
      

<footer id="colophon" class="site-footer section-col">
   <div class="container">
      <div class="site-footer-raw section-col">
         <div class="footer-section-left">
            <Link href="/" rel="home" aria-current="page">
            <img src="https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-Footer-300x85.webp" class="main_footer_logo" alt="Tropicana Footer Logo" loading="lazy" srcset="https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-Footer-300x85.webp 300w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-Footer-768x218.webp 768w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-Footer-150x43.webp 150w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-Footer-408x116.webp 408w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-Footer-90x26.webp 90w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-Footer.webp 1000w" sizes="(max-width: 300px) 100vw, 300px" width="300" height="85" /></Link>
         </div>
         <div class="footer-section-center">
            <nav id="site-navigation" class="main-navigation">
               <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">Primary Menu</button>
               <div class="menu-footer-menu-container">
                  <ul id="footer-menu" class="menu">
                  {state.theme.headerMenu.map((item) => {
                     return (
                        <li id={"menu-item-" + item.ID} class={"menu-item menu-item-type-post_type menu-item-object-page menu-item-" + item.ID}><Link href={item.url}>{item.title}</Link></li>
                     )
                  })}
                     {/* <li id="menu-item-56" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-56"><Link href="/brands/">Brands</Link></li>
                     <li id="menu-item-58" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-58"><Link href="/news/">News</Link></li>
                     <li id="menu-item-1351" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1351"><Link href="/careers/">Careers</Link></li>
                     <li id="menu-item-57" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-57"><Link href="/contact/">Contact</Link></li>
                     <li id="menu-item-55" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-55"><Link href="/privacy-policy/">Privacy Policy</Link></li>
                     <li id="menu-item-59" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-59"><Link href="/terms-of-use/">Terms of Use</Link></li> */}
                  </ul>
               </div>
            </nav>
         </div>
         <div class="footer-section-right">
            <div class="social-brandlogo section">
               <div class="copyright-logo">
                  <img src="https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-symbol-footer-90x135.webp" class="copyright_logo" alt="Tropicana-symbol" loading="lazy" srcset="https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-symbol-footer-90x135.webp 90w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-symbol-footer-150x225.webp 150w, https://prj-tropicana.md-staging.com/wp-content/uploads/2022/01/Tropicana-symbol-footer.webp 180w" sizes="(max-width: 90px) 100vw, 90px" width="90" height="135" />                     
               </div>
            </div>
            <div class="copyright-content section-col">
               <div class="site-info">
                  ©Tropicana Brands Group and its licensors. All rights reserved.                           
               </div>
            </div>
         </div>
      </div>
   </div>
</footer>


    </>
  );
};

export default connect(Root)

const Header = styled.header`
    background-color: #eee;
    border-width: 0 0 8px 0;
    border-style: solid;
    border-color: ${ props => props.isPostType ? props.isPage ? 'lightsteelblue' : 'lightseagreen' : 'maroon'};
`
const HeaderContent = styled.div`

`
const Button = styled.button`
    width: 92px;
    margin: 1em 0 0;
    padding: 0.5em;
    background: white;
    border: 1px solid #aaa;
    color: #888;
`
const Menu = styled.nav`
    display: flex;
    flex-direction: row;
    margin-top: 1em;
    & > div { // targets DIRECT children
        margin-right: 1em;
    }
`
const Main = styled.main`
padding: 1em;
margin: auto;

img {
    max-width: 100%;
    height: auto;
}
h2 {
    margin: 0.5em 0;
}
p {
    line-height: 1.25em;
    margin-bottom: 0.75em;
}
`
