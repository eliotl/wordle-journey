# **Wordle Journey**

## See how your game went
[Wordle Journey](https://www.rhymeghoul.com/wordle-journey/) is a single page web app that lets you see how many possible words you had left after each round of Wordle. You can input your words see whether your big guess was truly inspired, or just the only word left.

<img width="362" alt="Journey 1 | SPACE ALGAE ATONE" src="https://user-images.githubusercontent.com/23159423/180710849-e604802f-b361-4f8a-b49d-18d6f58713d0.png">
<img width="370" alt="Journey 2 | BESET ETHIC ATONE" src="https://user-images.githubusercontent.com/23159423/180711533-18970e3b-63aa-40b2-87f6-8ed5cb0fb610.png">
<img width="371" alt="Journey 3 | MUSTY TRAWL BATCH ATONE" src="https://user-images.githubusercontent.com/23159423/180711541-94c476f4-57df-42fa-b235-8240b6af558a.png">



## App design
This app is pretty minimal. It uses a single pinia store to handle state, including the user's inputs. The three main components are `Journey`, which holds the inputs, buttons, and the subcomponents, `WordRow` which displays the results of each guessed word, and `LetterSquare` which displays the letter from each guessed word with the appropriate color square.
There's a `WordleMap` data class that holds most of the site's logic, e.g. tracks the words left after each round. I initially wrote this functionality using regexes, but rewrote it to map words by their letter positions. The regexes were convoluted to try to understand and debug. The app has no backend; all valid Wordle words are stored in a .ts file. 

## Words on my Wordle Journey journey
I made this site because I kept getting curious about how close I was getting with my guesses, and I started using a regex dictionary online to figure it out. Eventually I made a web app to make it easier and share the idea with other people! I originally made this in January 2022, months before the New York times put out Wordle Bot, which does something similar but with a big emphasis on optimal strategy. I recently went back and rewrote it into a nice Vue app.

<img width="294" alt="Share modal" src="https://user-images.githubusercontent.com/23159423/180711163-c0e7b9e4-f00d-431b-86c1-4ee05b1ee9b0.png">


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
