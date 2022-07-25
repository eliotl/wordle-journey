# **Wordle Journey**

## See how your game went
[Wordle Journey](https://https://www.rhymeghoul.com/wordle-journey/) is a single page web app that lets you see how many possible words you had left after each round of Wordle. You can input your words see whether your big guess was truly inspired, or just the only word left.

## App design
This app is pretty minimal. It uses a single pinia store to handle state, including the user's inputs. The three main components are `Journey`, which holds the inputs, buttons, and the subcomponents, `WordRow` which displays the results of each guessed word, and `LetterSquare` which displays the letter from each guessed word with the appropriate color square.
There's a `WordleMap` data class that holds most of the site's logic, e.g. tracks the words left after each round. I initially wrote this functionality using regexes, but rewrote it to map words by their letter positions. The regexes were convoluted to try to understand and debug. The app has no backend; all valid Wordle words are stored in a .ts file. 

## Words on my Wordle Journey journey
I made this site because I kept getting curious about how close I was getting with my guesses, and I started using a regex dictionary online to figure it out. Eventually I made a web app to make it easier and share the idea with other people! I originally made this in January 2022, months before the New York times put out Wordle Bot, which does something similar but with a big emphasis on optimal strategy. I recently went back and rewrote it into a nice Vue app.

## Vue project boilerplate
(In case you clone this and want to run the Vue app)

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
