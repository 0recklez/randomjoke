const btnNext = document.querySelector('.btn-next');
const btnBack = document.querySelector('.btn-back')


const jokeQuestion = document.querySelector('.joke-question');
const jokeAnswer = document.querySelector('.joke-answer');
const counter = document.querySelector('.counter')


const jokes = []

async function fetchRandomJoke() {
    const response = await fetch(`https://official-joke-api.appspot.com/jokes/random`);
    const joke = await response.json();
    return joke
}

function renderJoke() {
    counter.textContent = `Шутка ${currentJokeIndex} из ${jokes.length}`

    jokeQuestion.textContent = jokes[currentJokeIndex - 1].setup;
    jokeAnswer.textContent = jokes[currentJokeIndex - 1].punchline;
}


let currentJokeIndex = 0;

btnNext.addEventListener('click', () => {

    if (currentJokeIndex === jokes.length) {
        fetchRandomJoke()
            .then((joke) => {
                jokes.push({
                    setup: joke.setup,
                    punchline: joke.punchline
                })

                currentJokeIndex++;
                renderJoke();

            });
    } else {
        currentJokeIndex++;
        renderJoke()
    }
});

btnBack.addEventListener('click', () => {
    if (currentJokeIndex > 0) {
        currentJokeIndex--;
        renderJoke();
    } else {
        jokeQuestion.textContent = 'ошибка'
    }
})
