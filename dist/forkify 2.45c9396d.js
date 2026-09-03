function e(e){return e&&e.__esModule?e.default:e}let t="https://forkify-api.jonas.io/api/v2/recipes",i="pizza",r=async function(e){let t=fetch(e,{method:"GET",headers:{Accept:"application/json"}}),i=await Promise.race([t,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 8 seconds"))},8e3)})]),r=await i.json();if(!i.ok)throw Error(`${r.message||"Request failed"} (${i.status})`);return r},s=function(e){return encodeURIComponent(e),`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f9b16e"/>
          <stop offset="1" stop-color="#f48982"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g)"/>
      <circle cx="300" cy="175" r="90" fill="#fff" opacity="0.9"/>
      <text x="300" y="190" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#615551">${e}</text>
      <text x="300" y="300" text-anchor="middle" font-family="Arial" font-size="22" fill="#fff">Forkify example</text>
    </svg>
  `)}`},a=[{id:"local-pizza-1",title:"Homemade Pizza",publisher:"Forkify Local Example",sourceUrl:"https://forkify-api.jonas.io/",image:s("Pizza"),servings:4,cookTime:35,ingredients:[{quantity:2,unit:"cups",description:"all-purpose flour"},{quantity:1,unit:"tsp",description:"yeast"},{quantity:.75,unit:"cup",description:"warm water"},{quantity:.5,unit:"cup",description:"tomato sauce"},{quantity:1.5,unit:"cups",description:"mozzarella cheese"}]},{id:"local-pasta-1",title:"Pasta with Tomato Cream Sauce",publisher:"Forkify Local Example",sourceUrl:"https://forkify-api.jonas.io/",image:s("Pasta"),servings:4,cookTime:45,ingredients:[{quantity:1,unit:"lb",description:"pasta"},{quantity:2,unit:"cups",description:"tomato sauce"},{quantity:.5,unit:"cup",description:"cream"},{quantity:.25,unit:"cup",description:"parmesan cheese"}]},{id:"local-chicken-1",title:"Chicken and Herb Bowl",publisher:"Forkify Local Example",sourceUrl:"https://forkify-api.jonas.io/",image:s("Chicken"),servings:2,cookTime:30,ingredients:[{quantity:2,unit:"",description:"chicken breasts"},{quantity:1,unit:"tbsp",description:"olive oil"},{quantity:.5,unit:"tsp",description:"mixed herbs"},{quantity:2,unit:"cups",description:"fresh vegetables"}]},{id:"local-salad-1",title:"Avocado Tomato Salad",publisher:"Forkify Local Example",sourceUrl:"https://forkify-api.jonas.io/",image:s("Salad"),servings:2,cookTime:15,ingredients:[{quantity:1,unit:"",description:"avocado"},{quantity:2,unit:"",description:"tomatoes"},{quantity:.25,unit:"cup",description:"red onion"},{quantity:1,unit:"tbsp",description:"lime juice"}]}],n={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10,usingFallback:!1}},c=function(e){return e?e.replace(/^http:\/\//i,"https://"):s("Recipe")},o=e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image}),l=function(e=""){let t=e.trim().toLowerCase(),i=t?a.filter(e=>[e.title,e.publisher,...e.ingredients.map(e=>e.description)].join(" ").toLowerCase().includes(t)):a;return n.search.query=e,n.search.results=i.map(o),n.search.page=1,n.search.usingFallback=!0,n.search.results},u=async function(e){let i=a.find(t=>t.id===e);if(i){n.recipe={...i};return}try{let{recipe:i}=(await r(`${t}/${e}`)).data;n.recipe={id:i.id,title:i.title,publisher:i.publisher,sourceUrl:i.source_url,image:c(i.image_url),servings:i.servings,cookTime:i.cooking_time,ingredients:i.ingredients}}catch(e){throw e}},p=async function(e){n.search.query=e;try{let i=await r(`${t}?search=${encodeURIComponent(e)}`);return n.search.results=i.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:c(e.image_url)})),n.search.page=1,n.search.usingFallback=!1,n.search.results}catch(t){return console.warn("Forkify API unavailable. Showing local fallback recipes.",t),l(e)}},d=function(e=n.search.page){n.search.page=e;let t=(e-1)*n.search.resultsPerPage,i=e*n.search.resultsPerPage;return n.search.results.slice(t,i)};var h={};h=import.meta.resolve("eyyUD");class g{_data;render(e){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let t=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let t=`
      <div class="spinner">
        <svg>
          <use href="${e(h)}#icon-loader"></use>
        </svg>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderError(t=this._errorMessage){let i=`
      <div class="error">
        <div>
          <svg>
            <use href="${e(h)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${t}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",i)}renderMessage(t=this._message){let i=`
      <div class="message">
        <div>
          <svg>
            <use href="${e(h)}#icon-smile"></use>
          </svg>
        </div>
        <p>${t}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",i)}}class _ extends g{_parentElement=document.querySelector(".recipe");_errorMessage="We could not find that recipe. Please try another one!";_message="";addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}_formatQuantity(e){if(null==e||""===e)return"";if(!Number.isFinite(Number(e)))return e;let t=Number(e),i=Math.floor(t),r=Number((t-i).toFixed(3)),s=new Map([[.125,"⅛"],[.25,"¼"],[.333,"⅓"],[.375,"⅜"],[.5,"½"],[.625,"⅝"],[.667,"⅔"],[.75,"¾"],[.875,"⅞"]]),a="";for(let[e,t]of s)if(.01>Math.abs(r-e)){a=t;break}return a?`${i>0?`${i} `:""}${a}`:Number.isInteger(t)?String(t):String(Number(t.toFixed(2)))}_generateMarkup(){return`
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title"><span>${this._data.title}</span></h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon"><use href="${e(h)}#icon-clock"></use></svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon"><use href="${e(h)}#icon-users"></use></svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>
        </div>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(t=>`
                <li class="recipe__ingredient">
                  <svg class="recipe__icon"><use href="${e(h)}#icon-check"></use></svg>
                  <div class="recipe__quantity">${this._formatQuantity(t.quantity)}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${t.unit||""}</span>
                    ${t.description}
                  </div>
                </li>`).join("")}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was provided by
          <span class="recipe__publisher">${this._data.publisher}</span>.
          Please check the source for the complete directions.
        </p>
        <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank" rel="noopener noreferrer">
          <span>Directions</span>
          <svg class="search__icon"><use href="${e(h)}#icon-arrow-right"></use></svg>
        </a>
      </div>
    `}}var f=new _;class m{_parentEl=document.querySelector(".search");getQuery(){let e=this._parentEl.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){this._parentEl.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentEl.addEventListener("submit",function(t){t.preventDefault(),e()})}}var v=new m;class y extends g{_parentElement=document.querySelector(".results");_errorMessage="No recipes found for your query.";_message="";_generateMarkup(){return this._data.map(this._generateMarkupPreview).join("")}_generateMarkupPreview(e){return`
      <li class="preview">
        <a class="preview__link" href="#${e.id}">
          <figure class="preview__fig">
            <img src="${e.image}" alt="${e.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${e.title}</h4>
            <p class="preview__publisher">${e.publisher}</p>
            <div class="preview__user-generated"></div>
          </div>
        </a>
      </li>
    `}}var b=new y;class w extends g{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let i=t.target.closest(".btn--inline");i&&e(+i.dataset.goto)})}_generateMarkup(){let t=this._data.page,i=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===t&&i>1?`
        <button data-goto="${t+1}" class="btn--inline pagination__btn--next">
          <span>Page ${t+1}</span>
          <svg class="search__icon">
            <use href="${e(h)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:t===i&&i>1?`
        <button data-goto="${t-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${e(h)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${t-1}</span>
        </button>
      `:t<i?`
        <button data-goto="${t-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${e(h)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${t-1}</span>
        </button>
        <button data-goto="${t+1}" class="btn--inline pagination__btn--next">
          <span>Page ${t+1}</span>
          <svg class="search__icon">
            <use href="${e(h)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:""}}var $=new w;let k=function(){b.render(d()),$.render(n.search)},q=async function(){try{let e=window.location.hash.slice(1);if(!e)return;f.renderSpinner(),await u(e),f.render(n.recipe)}catch(e){console.error(e),f.renderError("We could not load that recipe. Please try another one.")}},x=async function(e,t=!0){try{let i="string"==typeof e?e:v.getQuery();if(!i||!i.trim())return;t&&b.renderSpinner(),await p(i.trim()),k(),n.search.results.length>0&&(window.location.hash=n.search.results[0].id)}catch(e){console.error(e),b.renderError("Recipes could not be loaded. Please try again.")}};f.addHandlerRender(q),v.addHandlerSearch(x),$.addHandlerClick(function(e){b.render(d(e)),$.render(n.search)}),l(i),k(),n.search.results.length>0&&!window.location.hash&&(window.location.hash=n.search.results[0].id),x(i,!1);
//# sourceMappingURL=forkify 2.45c9396d.js.map
