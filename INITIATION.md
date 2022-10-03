# Next.JS

***Support [vidéo](https://www.youtube.com/watch?v=8jhLvnm7fmE&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH&index=11)***

## Route & Navigation

----------

### Route, architecture

*description des fichiers contenu dans `/pages`*  
L'architecture des dossiers est importante !  

**Pages** : représente la structure du site web (application).  

**Index.tsx** : représente la page ` home ` à l'adresse localhost `localhost:3000`  
    *( Dans le cas d'utilisation de `yarn dev` dans le terminal )*.  

**_app.tsx** : représente l'appel de mon application. La page index et autres avec ses props.  

----------

### Les Routes  (structure)

*Concernant les routes, elle représenterons les chemins URL de nos différentes **Pages***  

|/pages|||
|--------|--------|--------|
|    **index.tsx**    |    url: `localhost:3000`   | Page d'accueil |
|    **about.tsx**    |    url: `localhost:3000/about`    | Page à propos |
|    **profil.tsx**    |    url: `localhost:3000/profil`    |  Page profil |
|    **blog.tsx**    |    url: `localhost:3000/blog`    |  Page main blog |

*etc...*  

Cependant `blog` peut contenir plus article lisible  :
*l'on crée un donc un dossier `blog` dans `pages` avec nos articles à l'intérieur*  

Ce qui nous donne :

|/blog|||
|--------|--------|--------|
|    **first.tsx**    |    url: `localhost:3000/blog/first`   | Premier article |
|    **second.tsx**    |    url: `localhost:3000//blog/second`    | Second article |

Dans le cas ou `first.tsx` est bien dans un dossier `blog`.  
Nous retrouverons l'article en question à ce chemin `localhost:3000/blog/fist`  

L'on peut dès lors organiser sa **structure** de fichier afin d'insérer dans le dossier `/blog` un `index.tsx` qui serivra de référent à la route `localhost:3000/blog`  

Merci Next.js...  

----------

### Les Routes  (dynamique)

Désormais nous allons crée une nouvelle "*route*", à l'url `/product`.  
Dans chacun de ses pages on va imaginer que l'on peut (comme pour le cas du `/blog` ),  
faire afficher une quantité infinie de produits (dans l'exemple nous irons jusqu'à 3).

Nous allons pas crée une quantité infinie fichier.. Next.js nous permet de crée en un seul fichier le rendu dynamique de chaque produits via une clé d'identification.  

Dans le dossier `/product` nous aurons initialement 2 fichiers :  

- index.tsx
- [productId].tsx  

Dans `index.tsx` :  

```tsx

const ProductList = () => {
    return (
        <>
            <h2>Product 1</h2>
            <h2>Product 2</h2>
            <h2>Product 3</h2>
        </>
    )
  }
  
  export default ProductList;
```

Dans `[productId].tsx` :  

```tsx

const ProductDetail = () => {
    return <h1>Details about product </h1>
}

export default ProductDetail;
```

Le fait "d'encadrer" un composant avec [ ], va nous permettre à utilisé `localhost/product/[productId]`  
Le `[productId]` fera référence au numéro voulu de l'id du produit voulut.  

On va alors utilisé un Hook `useRouter` depuis `next/router`  
Ce hook va permettre de récupérer l'ID de l'url courant.

Dans `[productId].tsx` avec `useRouter`:  

```tsx

import { useRouter } from "next/router";

const ProductDetail = () => {
    const router = useRouter();
    const routerId = router.query.productId;
    return <h1>Details about product {routerId} </h1>
}

export default ProductDetail;
```

Nous venons de crée un composant dit *'Dynamique'*  

Petit aparté:

- Dans le cas ou nous rajoutions dans le dossier `/product` un fichier avec un autre nom. Admettons `Sweater.js`, il sera prioritaire quand au rendu dynamique de `localhost:3000/product/sweater`.  

### Les Routes  (dynamique) approfondie

Maintenant admettons que chacun de produits rendu dynamique on un chemin suplémentaire comme une review et que chacune de ses review est également sur un rendu dynamique.

Nous allons alors crée un nouveau dossier dans `/[productId]/reviewId` qui contiendra `[reviewId].tsx`  

Dans `[reviewId].tsx` :

```tsx
import { useRouter } from "next/router"

const Review = () => {
    const router = useRouter();
    const { productId, reviewId }  = router.query

    return <h1>Review {reviewId} for product {productId}</h1>
}

export default Review;
```

Désormais les routes `localhost:3000/product/[productId]/review/[reviewId]` est opérationnel.

----------

### Toutes les Routes

Une alternative à la situation de `/Product` est possible tout en gardant la possibilité d'avoir plusieurs rendu.

Nous allons crée le dossier `/docs` et à l'intérieur nous allons lui glisser non pas un `index.tsx` mais un `[[...params]].tsx`.

Dans `[[...params]].tsx` :

```tsx
import { useRouter } from "next/router";

const Doc = () => {
    const router = useRouter();
    /* 
    l'ont met { params = [] } 
    afin d'initialisé params en tant qu'array et au rendu du DOM 
    le contenu se rajoutera.
    */
    const { params = [] } = router.query;
    console.log(params);
    // console.log => return [0:docs/"value1", 1:docs/value1/"value2"] 

    // dans le cas ou l'url : 
    // est égale à localhost:3000/docs/truck/bidule
    if (params.length === 2) {
        return (
            <h1>
                Viewing docs for feature {params[0]} and concept {params[1]}
            </h1>
            // result => Viewing docs for feature "truck" and concept "bidule"
        )
    } else if (params.length === 1) {
    // est égale à localhost:3000/docs/feature1
        return <h1>Viewing docs for feature {params[0]}</h1>
    }
    // est égale à localhost:3000/docs
    return <h1> Docs Home</h1>
} 

export default Doc;
```