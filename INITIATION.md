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

```ts
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

### Les liens de navigation

#### Composant de navigation  

*Nous allons désormais utilisé un composant natif a Next.js `<Link />`*  
L'attribut `<Link />` va avoir besoin d'un paramètre `href=...` afin de lui notifier ou aller.  
Il aura également besoin d'un enfant `<a> adresse </a>`  

Démonstration : `pages/index.tsx`

```tsx
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/blog'> 
        {
            // au click nous nous dirigeons sur l'adresse "localhost:3000/blog"
        }
        <a>blog</a>
      </Link>
      <Link href='/product'>
        {
            //et ici nous nous dirigeons sur l'adresse "localhost:3000/product"
        }
        <a>products list</a>
      </Link>
    </div>
    
  )
}

export default Home;
```

Afin d'allez un peu plus loin sur la page produit nous avons aussi la possibilité de passer en "props" des donnés permettant de spécifier l'url souhaité.  

Démonstration : `product/index.tsx`  

```tsx
import Link from "next/link";

const ProductList = ({ productId = 100 }) => {
    return (
        <>
            <Link href='/'>
                {
                    // lien nous redirigeant sur la page d'accueil 
                }
                <a>Home</a>
            </Link>
            <h2>
                <Link href="/product/1">
                    {
                        // Ici direction "localhost:3000/product/1"
                    }
                    <a>Product 1</a>
                </Link>
            </h2>
            <h2>
                <Link href="/product/2">
                    {
                        // Ici direction "localhost:3000/product/2"
                    }
                    <a>Product 2</a>
                </Link>
            </h2>
            <h2>
                <Link href="/product/3" replace>
                    {
                        // Ici direction "localhost:3000/product/3"
                        // MAIS ! avec l'ajout de l'attribut "replace"
                        // qui de ce que j'ai comprit si l'on fait un "retour en arrière" sur notre navigateur nous redirige à la page d'accueil
                    }
                    <a>Product 3</a>
                </Link>
            </h2>
            <h2>
                <Link href={`/product/${productId}`}>
                    {
                        // Ici direction "localhost:3000/product/[de 'productId']"
                        // L'info transmise en paramètres au composant "ProductList" qui est "productId" (initialisé à 100 pour le moment)
                        // est directement utilisé dans l'url.
                        // Nous irons donc à l'adresse "localhost:3000/product/100" 
                    }
                    <a>Product {productId}</a>
                </Link>
            </h2>
        </>
    )
  }
  
  export default ProductList;
```

#### Element programmable de navigation  

Mise en situation :  
> Imaginons que nous qu'au "click" sur un "bouton" nous avons une redirection sur la page d'un produit.
Nous allons pas passer par la Balise "Link" mais l'on va utiliser le hook "useRouter" et la fonction "push".  

Démonstration : `pages/index.tsx`  

```tsx

import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

const Home = () => {

const router: NextRouter = useRouter();
// J'ai typer "router" avec NextRouter afin de ne pas avoir de soucis avec TS mais très honnêtement je ne vais pas m'avancer sur le pourquoi du comment par peur de dire des bêtises :)
  const handleClick = () => {
    console.log('place order used !');
    // L'ont ouvre une fonction et on verifie qu'au click on à bien un message dans le console.log

    router.push('/product');
    // cela nous redirigera sur l'url localhost:3000/product
  }

  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/blog'>
        <a>blog</a>
      </Link>
      <Link href='/product'>
        <a>products list</a>
      </Link>

      <button onClick={handleClick}>Place Order</button>

    </div>
    
  )
}

export default Home;

```

Dans le cas ou vous souhaiter allez plus loin dans la navigation  
Retrouver la documentation basic des routes [ici](https://nextjs.org/docs/routing/introduction) et de manière avancé [ici](https://nextjs.org/docs/api-reference/next/router)  

----------

### Page 404 custom

Afin de crée une page 404 custom. Nous aurons tout simplement a crée une page `404.tsx` à la racine de l'app. CAD dans `/page/404.tsx`...

Du faite que le composant porte le nom '404' amènera obligatoirement le client web sur cette page dans le cas ou il va sur une route inexistante.  

----------

## Pre-rendu et Récupération de Data  introduction

Il existe deux types de pré-rendu dans Next.js. La différence entre eux réside dans le moment où le code HTML d’une page est généré. La méthode que vous choisissez dépend du type de données dont il s’agit et du moment où vous souhaitez qu’elles soient disponibles pour votre utilisateur.

1. Génération statique
2. Rendu côté serveur

### Génération statique (SSG) (recommandé)

Cette méthode de pré-rendu génère le code HTML de vos pages sur le serveur uniquement au moment de la construction, c’est-à-dire lorsque vous créez votre application pour la production (construction Next.js). Une fois le code HTML de votre page généré, il peut être mis en cache et servi par un CDN et réutilisé à chaque demande, le rendant disponible à l’avance aux visiteurs de votre site.

Next.js pré-rend statiquement une page par défaut si les données sont écrites directement dans le code source de l’application et ne nécessitent pas de récupération de données externes au moment de la construction.

```tsx
const About = (): JSX.Element => {
         return (
        <div>
          <h1>About Us</h1>
          <p>{}</p>
        </div>
      );
}
export default About;
```

Notre About Us La page dans l’extrait de code ci-dessus ne nécessite pas de récupération de données externes et, par défaut, elle sera pré-rendu au moment de la construction.

### Génération statique avec des données et des routes prédéfinies

Pour les pages qui dépendent de données externes (base de données, système de fichiers, etc.), il suffit d’exporter une async fonction appelée **getStaticProps** avec votre composant de page. *Next.js* saura exécuter le **getStaticProps** fonction et récupère les données au moment de la construction. Ensuite, tout ce qui est renvoyé comme accessoire sera transmis au composant exporté à partir de la page.

#### exemple : (homePage)

Je vais utilisé une API REST (libre) sur Rick and Morty ou vous pourrez l'entièreter de la doc [ici](https://rickandmortyapi.com/documentation)

```tsx
    export async const getStaticProps: GetStaticProps = () =>  {
    
      const res = await fetch("adresse de votre api");
      const retourApi = await res.json();

return {
        props: {
          retourApi
        },
      };
    }
```

----------


### Type de pre-rendering

#### Static Generation



#### Server Side Rendering