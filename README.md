start dev server - npm start

build static assets - npm run build 

___

## What can be improved ?
1. Make smart card which take an id of album and get correct album info from redux.
It will reduce rerendering if query contains the same results.
2. Use css-modules instead of BEM. It is more scaleable.
3. Add pagination for search results. I didnt imlement it due to itunes limitations (api does not have offset);
4. Implement more sophisticated way for error handing.
5. Search query should cache results. 


## Limitations 
1. Will be laggy on large datasets. 
It can be fixed using virtualization or infinite scroller.