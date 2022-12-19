
# MovieBase

Aplicatie web in care utilizatorul poate cauta filme pe care apoi le poate salva pentru a le viziona mai tarziu sau sa le adauge la sectiunea de filme vizionate. In functie de filemele salvate/vizionate aplicatia recomanda utilizatorului un set de filme similare cu cele salvate/vizionate de acesta.

Informatiile despre filme sunt luate de pe [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction), iar detaliile in legatura cu preferintele utilizatorului sunt stocate intr-o baza de date (MongoDB).

## Tech Stack

**Client:** React, chakra-ui

**Server:** Next.JS


## Features

- Cauta filme
- Rezultatele cautarii au poze si rating
- Vezi detalii despre filmele cautate
- Adauga filme in categoria 'filme vizionate'
- Adauga filme in 'watch list'
- Recomandare filme in functie de genurile filmelor vizionate si din watch list. [Vezi explicatie algoritm](#algoritm-recomandare-filme-in-functie-de-gen)

## In Progress

- Recomandare filme din categorii

## Run Locally

Cloneaza proiectul

```bash
  git clone https://github.com/alin1k/moviebase
```

Intra in fisierul proiectului

```bash
  cd moviebase
```

Descarca dependentele necesare

```bash
  npm install
```

Renumeste fisierul `.env.example` in `.env.local` si adauga un [TMDB API Key](https://www.themoviedb.org/settings/api)

```bash
 TMDB_API_KEY = YOUR_API_KEY
```

Porneste serverul local

```bash
  npm run dev
```

## Algoritm Recomandare filme in functie de gen

Algoritmul ia toate genurile filmelor salvate in watch list si in history (filme vizionate) si genereaza un array in care adauga 1 punct pentru fiecare gen al unui film din watch list si 2 puncte pentru fiecare gen al unui film din history. La final se sorteaza array-ul descrescator in functie de puncte si cauta prin TMDB API `/discover/movie?with_genres=<genresIds>` filme recomandate care contin ID-ul primelor 3 genuri cu cele mai multe puncte. 

Exemplu array dupa parcurgerea algoritmului:

```javascript
[
 {
     id: 1,
     name: "genreExample1",
     points: 6
 },
 {
     id: 2,
     name: "genreExample2",
     points: 5
 },
 {
     id: 3,
     name: "genreExample3",
     points 3
 },
 {
     id: 4,
     name: "genreExample4",
     points: 2
 }
]
```
