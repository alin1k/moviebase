
# MovieBase

Aplicatie web in care utilizatorul poate cauta filme pe care apoi le poate salva pentru a le viziona mai tarziu sau sa le adauge la sectiunea de filme vizionate. In functie de filemele salvate/vizionate aplicatia recomanda utilizatorului un set de filme similare cu cele salvate/vizionate de acesta.

Informatiile despre filme sunt luate de pe [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction), iar detaliile in legatura cu preferintele utilizatorului sunt stocate intr-o baza de date (MongoDB).

## Tech Stack

**Client:** React, chakra-ui

**Server:** Next.JS


## Features

- Cauta filme
- Vezi detalii despre filmele cautate
- Adauga filme in categoria 'filme vizionate'
- Rezultatele cautarii au poze si rating

## In Progress

- Adauga filme in categoria 'favorite'

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

