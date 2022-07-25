<template lang="pug">
.site-branding
    p.site-title
        a(href="https://rhymeghoul.com" rel="Rhyme Ghoul") Rhyme Ghoul
    p.site-description a rhyme tool

</template>


<style scoped>

.site-branding {
    padding-bottom: 5%;
    display: grid;
}


.site-title {
    clear: none;
    font-weight: bold;
    line-height: 1.2;
    margin: 0 0.4375em 0 0;
    color: #404040;
    font-size: 29px;
}
a {
    text-decoration: none;
}
    
p {
    text-align: left;
    padding-left: 15%;
    font-family: "Libre Baskerville", Libre, Georgia, Times, serif;
}

.site-description {
    font-style: italic;
    vertical-align: bottom;
    color: #00223f;
    margin-top: 0.2em;
}

</style>