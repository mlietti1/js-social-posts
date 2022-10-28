const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Variabili

const container = document.getElementById('container');

const userLikes = [1, 3, 4];

// container.innerHTML = '';


printPosts();

handleClick();

// funzione per btn cliccato 


function handleClick (){
    document.querySelectorAll('.js-like-button').forEach(button =>{
        button.addEventListener('click', function(e){
            e.preventDefault();
            const postId = this.getAttribute('data-postid');
            
            const counterDisplay = document.getElementById('like-counter-' + postId);
            let likes = parseInt(counterDisplay.innerText);

            if (this.classList.contains('like-button--liked')){
                this.classList.remove('like-button--liked')
                counterDisplay.innerText = --likes;
            }else{
                this.classList.add('like-button--liked');
                counterDisplay.innerText = ++likes;
            }

            const likedPost = posts.filter(post => post.id == postId)
            likedPost[0].likes = likes;
        })
    })
    
}

// funzione per stampare il contenuto

function printPosts(){
    let output = '';
    posts.forEach(post =>{
        const {id, author, content, media, likes, created } = post
        output += `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${author.image ? getPropic(author) : getDefaultPropic(author)}              
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${convertDate(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button js-like-button ${isPostLiked(id) ? 'like-button--liked' : ''}" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
        `
    })

    container.innerHTML = output;
}

function isPostLiked(id){
    return userLikes.includes(id);
}

function getPropic(author){
    const {image} = author;
    return `<img class="profile-pic" src="${image}" alt="">`;
}

function getDefaultPropic (author){
    const {name} = author;

    let initials = '';

    const nameSplit = name.split(' ');

    nameSplit.forEach(letter => {
        initials += letter[0];
    })

    return `
    <div class="profile-pic-default">
        <span>${initials}</span>
    </div>
    `
}

// creo funzione per convertire la data

function convertDate (date){

    return date.split("-").reverse().join("/")

}
